import boto3

dynamodb = boto3.resource("dynamodb", region_name='us-east-1')
table = dynamodb.Table('SprintRetro')

'''
table.put_item(
    Item={
        'team_name': 'Tools',
        'sprint_no': '3',
        'action': None,
        'bad': 'No grooming',
        'well': 'Sprint points were accurate'
    },
    {
        'team_name': Cyclone,
        'sprint_no': '6',
        'action': ['Less meetings', 'more meetings'],
        'bad': 'bad at ping-pong',
        'well': 'null'
    }
)
'''

with table.batch_writer() as batch:
    batch.put_item(
        Item={
            'team_name': 'System Test',
            'sprint_no': '22',
            'action': 'Two scrums daily',
            'bad': 'Stay late',
            'well': 'null'
        }
    )
    batch.put_item(
        Item={
            'team_name': 'Cyclone',
            'sprint_no': '6',
            'action': ['Less meetings', 'more meetings'],
            'bad': 'bad at ping-pong',
            'well': 'null'
        }
    )
