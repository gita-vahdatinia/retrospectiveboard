from flask import Flask, request, jsonify, abort, Response
import config
import boto3
import json
from botocore.exceptions import ClientError
from flask_cors import CORS
from bisect import bisect_left, bisect_right
from datetime import datetime
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app)
dynamodb = boto3.resource("dynamodb", region_name='us-east-1')
table = dynamodb.Table('SprintRetro')
print(table.creation_date_time)
team_name = "System Test"
sprint_num = "21"
print("HERE")
try:
    response = table.get_item(
        Key={
            'team_name': team_name,
            'sprint_no': sprint_num
        }
    )
except ClientError as e:
    print(e.response['Error']['Message'])
else:
    item = response['Item']
    print("GetItem succeeded:")
    print(json.dumps(item, indent=4))


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


@app.route('/')
def get_pulse():
    return ACTIVE_STATE


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=config.PORT_NUMBER, debug=True)
