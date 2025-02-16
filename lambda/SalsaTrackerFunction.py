from CategoriesHandler import add_category, get_all_categories

def lambda_handler(event, context):
    # Determine the action based on the event (API Gateway path)
    path = event.get('resource')

    # Add a new category
    if path == '/categories':
        if event['httpMethod'] == 'POST':
            body = event['body']
            category_id = body.get('category_id')
            category_name = body.get('category_name')
            return add_category(category_id, category_name)
        # Get all categories
        elif event['httpMethod'] == 'GET':
            return get_all_categories()
    
    # Default response if no valid action was matched
    return {
        'statusCode': 400,
        'body': 'Bad Request'
    }