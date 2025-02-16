import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SalsaTracker-Categories')

def add_category(event, context):
    try:
        # Extract the body data (categoryId, categoryName)
        body = json.loads(event['body'])
        category_id = body['categoryId']
        category_name = body['categoryName']
        
        if not category_id or not category_name:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing categoryId or categoryName'})
            }

        # Insert into DynamoDB
        table.put_item(
            Item={
                'PK': f'category#{category_id}',
                'SK': f'category#{category_id}',
                'Name': category_name,
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Category added successfully'})
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error adding category'})
        }

def get_all_categories(event=None, context=None):
    try:
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('PK').begins_with('category#')
        )

        # If no categories found
        if not response.get('Items'):
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'No categories found'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }

    except ClientError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error fetching category'})
        }
