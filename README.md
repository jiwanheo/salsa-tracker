# Jiwan's awesome salsa tracker

## DynamoDB Table Schema

### Users Table
| Field Name | Type | Description |
|------------|------|-------------|
| userId | Number (PK) | Auto-incremented unique ID for the user |
| username | String | Name of the user |

### Moves Table
| Field Name | Type | Description |
|------------|------|-------------|
| moveId | Number (PK) | Auto-incremented unique ID for the move |
| category | String | Move category (e.g., "right-right", "left-left") |
| name | String | Name of the move |
| videoUrl | String | URL of the video demonstration |

### UserRatings Table
| Field Name | Type | Description |
|------------|------|-------------|
| userId | Number (PK) | User who rated the move |
| moveId | Number | Move being rated |
| rating | String | Rating value ("good", "ok", "bad") |

### Counters Table (For Auto-Incrementing IDs)
| Field Name | Type | Description |
|------------|------|-------------|
| counterName | String (PK) | Name of the counter (e.g., "moveId", "userId") |
| counterValue | Number | Current highest value for the counter |