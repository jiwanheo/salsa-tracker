# Philosophy

We're going to track all moves' progress, by looking at them by hands (i.e. lead left hand - follow right hand, ...) or position (i.e. CBL, hammerlock, ...). A move must have at least one category. 

A category will be selected first, then all moves that users know under that category will be displayed as cards, with following information

- Move name
- Move description
- Video
- Rating
- Comments

# Backend Setup

Two home servers, both raspberry pis. Would need to consider opening up the network (security + dynamic DNS, like duckDNS)

## Server 1
- Nextcloud server that hosts videos
- Backup to AWS regularly (but don't serve from there)

## Server 2
- Moves DB 
- Static UI
- API
- Reverse proxy
- Monitoring

# DB Schema

## **Categories Table**

| Column           | Data Type  | Description                             |
|------------------|------------|-----------------------------------------|
| category_id      | SERIAL     | Primary key, unique ID for the category |
| category_name    | VARCHAR    | Name of the category, e.g., "Left Hand-Right Hand" |
| category_type    | VARCHAR    | Type of category, e.g., "Hand", "Position" |
| description      | TEXT       | Optional description of the category    |

## **Moves Table**
| Column          | Data Type  | Description                             |
|-----------------|------------|-----------------------------------------|
| move_id         | SERIAL     | Primary key, unique ID for the move     |
| move_name       | VARCHAR    | Name of the move, e.g., "Inside Turn"   |
| video_url       | TEXT       | Link to the video for the move          |
| category_ids    | INTEGER[]  | Array of category_ids referencing Categories table (move can belong to 1 or more categories, but not 0) |
| description     | TEXT       | Optional description of the move        |

## **UsersProgress Table**
| Column          | Data Type  | Description                             |
|-----------------|------------|-----------------------------------------|
| user_id         | VARCHAR    | Unique ID for the user                  |
| move_id         | INTEGER    | Foreign key referencing Moves table     |
| progress        | VARCHAR    | Progress (e.g., "Learning", "Mastered") |
| comment         | VARCHAR    | Any comments                            |
