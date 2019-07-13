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
ACTIVE_STATE = 'alive!'


@app.route('/teams')
def get_teams():
    try:
        response = table.scan()
        list_of_teams = []
        for item in response['Items']:
            if item['team_name'].encode('utf-8') not in list_of_teams:
                list_of_teams.append(item['team_name'].encode('utf-8'))
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return jsonify(list_of_teams)


@app.route('/<team>/sprint')
def get_team_sprints(team):
    try:
        response = table.scan()
        list_of_sprints = [item['sprint_no'].encode('utf-8') for item in response['Items'] if item['team_name'].encode('utf-8') == team]
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return jsonify(list_of_sprints)


@app.route('/<team>/<sprint_no>/<retro_type>')
def get_all_values(team, sprint_no, retro_type):
    try:
        response = table.get_item(
            Key={
                'team_name': team,
                'sprint_no': sprint_no
            }
        )
        all_values = response['Item'][retro_type]
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return jsonify(all_values)


@app.route('/post/<team>/<sprint_no>/<retro_type>/<description>')
def post_retro_items(team, sprint_no, retro_type, description):
    try:
        update_expression = "SET " + retro_type + " = list_append(" + retro_type + ", :insert)"
        expression_attr_val = {':insert': [{description: "0"}]}
        table.update_item(
            Key={
                'team_name': team,
                'sprint_no': sprint_no
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attr_val
        )
    except ClientError as e:
        return (e.response['Error']['Message'])
    else:
        return "Inserted Description"


@app.route('/<team>/<sprint_no>/<retro_type>/<description>')
def upvote(team, sprint_no, retro_type, description):
    try:
        response = table.get_item(
            Key={
                'team_name': team,
                'sprint_no': sprint_no
            }
        )
        value = response['Item'][retro_type][0][description]
        upvote = str(int(value) + 1)
        table.update_item(
            Key={
                'team_name': team,
                'sprint_no': sprint_no
            },
            UpdateExpression="SET " + retro_type+"=:i",
            ExpressionAttributeValues={":i": [{description: upvote}]}
        )
    except ClientError as e:
        # print(e)
        print("SET " + retro_type+"."+description+"=:i")
        return (e.response['Error']['Message'])
    else:
        return "return statement"


@app.route('/')
def get_pulse():
    return 'hey'


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=config.PORT_NUMBER, debug=True)
