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


@app.route('/teams')
def get_teams():
    try:
        response = table.scan()
        lst = []
        for i in response['Items']:
            lst.append(i['team_name'])
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return jsonify(lst)


@app.route('/')
def get_pulse():
    return ACTIVE_STATE


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=config.PORT_NUMBER, debug=True)
