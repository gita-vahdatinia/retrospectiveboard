from flask import Flask, request, jsonify, abort, Response
import config
import boto3
from botocore.exceptions import ClientError
from flask_cors import CORS
from bisect import bisect_left, bisect_right
from datetime import datetime

app = Flask(__name__)
CORS(app)

s3 = boto3.client('s3')
SYS_TEST_BUCKET = config.S3_BUCKET
TEST_RESULT_PREFIX = config.TEST_PREFIX
ACTIVE_STATE = 'alive!'


@app.route('/tests/<test_env>/<test_type>/builds')
def get_list_of_builds(test_env, test_type,):
    build_limit = request.args.get('limit', type=int)
    from_date = request.args.get('from_date', type=str)
    to_date = request.args.get('to_date', type=str)
    if build_limit and build_limit < 0:
        abort(400, 'Parameter limit must be an integer')
    if from_date:
        try:
            datetime.strptime(from_date, '%Y-%m-%d')
        except ValueError:
            abort(400, 'Paramter from_date must follow format YYYY-MM-DD')
    if to_date:
        try:
            datetime.strptime(to_date, '%Y-%m-%d')
        except ValueError:
            abort(400, 'Paramter to_date must follow format YYYY-MM-DD')
    try:
        response = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter='/',
                                      Prefix=TEST_RESULT_PREFIX + test_env + '/' + test_type + '/')
        builds = []
        for path in response['CommonPrefixes']:
            builds.append(path['Prefix'].split('/')[3])
        if from_date and to_date:
            new_list = []
            start_date = datetime.strptime(from_date, '%Y-%m-%d')
            end_date = datetime.strptime(to_date, '%Y-%m-%d')
            for build in builds:
                date = datetime.strptime(build.split('_')[0], '%Y-%m-%d')
                if date >= start_date and date <= end_date:
                    new_list.append(build)
            builds = new_list
        builds = builds[::-1]
        if build_limit and build_limit <= len(builds):
            builds = builds[:build_limit]
        return jsonify(builds)
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchBucket':
            abort(404, 'Requested S3 bucket %s does not exist' % SYS_TEST_BUCKET)
        else:
            abort(500, e.response['Error']['Message'])


@app.route('/tests/<test_env>/<test_type>/latest_build')
def get_latest_build(test_env, test_type):
    try:
        response = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter='/',
                                      Prefix=TEST_RESULT_PREFIX + test_env + '/'+test_type+'/')
        build = None
        if len(response['CommonPrefixes']) > 0:
            build = response['CommonPrefixes'][-1]['Prefix'].split('/')[3]
        return build
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchBucket':
            abort(404, 'Requested S3 bucket %s does not exist' % SYS_TEST_BUCKET)
        else:
            abort(500, e.response['Error']['Message'])


@app.route('/tests/<test_env>/types')
def get_test_types(test_env):
    test_types = []
    try:
        response = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter='/',
                                      Prefix=TEST_RESULT_PREFIX + test_env + '/')
        for path in response['CommonPrefixes']:
            check_folder = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter='/',
                                              Prefix=path['Prefix'])
            try:
                check_folder['CommonPrefixes']
                testtype = path['Prefix'].split('/')[2]
                test_types.append(testtype)
            except KeyError as e:
                print(e)
        return jsonify(test_types)
    except ClientError as e:
        abort(500, e.response['Error']['Message'])


@app.route('/tests/environments')
def get_environments():
    test_envs = []
    try:
        response = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter='/',
                                      Prefix=TEST_RESULT_PREFIX)
        for path in response['CommonPrefixes']:
            env = path['Prefix'].split('/')[1]
            if (env != "temp"):
                test_envs.append(env)
        return jsonify(test_envs)
    except ClientError as e:
        abort(500, e.response['Error']['Message'])


@app.route('/tests/<test_env>/<test_type>/<build_name>/<result_file_name>')
def get_build_results(test_env, test_type, build_name, result_file_name):
    key = TEST_RESULT_PREFIX + '/'.join([test_env, test_type, build_name, result_file_name])
    try:
        response = s3.get_object(Bucket=SYS_TEST_BUCKET,
                                 Key=key)
        if result_file_name.endswith('*.xml'):
            return Response(response['Body'].read(), mimetype='application/xml')
        elif result_file_name.endswith('*.json'):
            return Response(response['Body'].read(), mimetype='application/json')
        else:
            return Response(response['Body'].read(), mimetype='text/plain')
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            abort(404, 'Requested S3 key %s does not exist' % key)
        else:
            abort(500, e.response['Error']['Message'])


@app.route('/tests/<test_env>/<test_type>/<build_name>/files')
def get_file_list(test_env, test_type, build_name):
    file_list = []
    try:
        response = s3.list_objects_v2(Bucket=SYS_TEST_BUCKET, Delimiter=TEST_RESULT_PREFIX + build_name,
                                      Prefix=TEST_RESULT_PREFIX + test_env + '/' + test_type + '/' + build_name)
        print(response)
        for file in response['Contents']:
            file_name = file['Key'].split('/')[-1]
            if not file_name == '':
                file_list.append(file_name)
        return jsonify(file_list)
    except ClientError as e:
        abort(500, e.response['Error']['Message'])


@app.route('/')
def get_pulse():
    return ACTIVE_STATE


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=config.PORT_NUMBER, debug=True)
