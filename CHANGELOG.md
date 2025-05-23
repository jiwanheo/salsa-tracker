# Change Log
All notable changes to this project will be documented in this file.
 
## 2025-02-16 - [Unreleased]

First draft of the project. Experimented with AWS hosting and NoSQL DB, but decided to host everything from home network. We have DB schema, and a plan of attack.
 
### Added
 
### Changed
 
### Fixed

## 2025-02-17 - [Unreleased]

Got the basic UI funcionality done. Very rough, but a good starting point. Developing mobile-portrait first. Using bootstrap 5. Need to decide on colours/fonts, unify the spacing, ..., very soon.
 
### Added

- Login page
- Main page
    - Category type
    - Horizontal scrolling categories
    - Moves cards
- Settings page
- Routes

### Changed
 
### Fixed

## 2025-02-18 - [Unreleased]

Got the new laptop and the mini server BOIIIII

I got a used T14 Gen 1 AMD for everyday use, and the ThinkCentre M720q that I'm going to set up as my home server, and use it for this project. Super excited about this. I'm running dual boot Ubuntu/Windows on my laptop, but will probably run the server as entirely Linux.~ 
 
### Added

### Changed
 
### Fixed

## 2025-02-23 - [Unreleased]

Did a few more rounds of figma, starting to make components with the theme
 
### Added

- jast textinput, button

### Changed
 
- Log in page with a little more theme
    - Form/Button various states are not done yet (border on focus, button active, ...)

### Fixed

## 2025-03-02 - [Unreleased]

Implemented most pages
 
### Added

Pages:
- Choose category type
- Choose category
- Choose move

Components:
- BackButton
- Card
- MoveCard
- ProgressBar
- RatingBade

### Changed
 

### Fixed

## 2025-03-23 - [Unreleased]

Implemented add category API/DB
 
### Added

Pages:
- Add category setting page

### Changed

Choose category page pulls from DB 

### Fixed

## 2025-03-24 - [Unreleased]
 
### Added

- moves table
- Add move setting page
- MultiSelect component
    - Fetches DB to get options

### Changed

### Fixed

## 2025-03-25 - [Unreleased]
 
### Added

- Hooked up Add moves page to DB and API
- Added radiobutton

### Changed

### Fixed

## Todo

### Moves page
CORS in the API


### Radiobutton
- Find all pages that use radiobutton, and replace with component
### MultiSelect component
- Textwrapping on badges (container needs to get taller)

### Collapsible Card
- Click isolation (Clicking change rating/video shouldn't collapse the card)
- Text truncation on card's collapsed state 
- Video

### Admin page / DB
- Hook it up to a DB


### User login and other API methods
- user_exists should probably use request model? 
- For GET responses, should probably use data model?

## 2025-05-04 - [Unreleased]
 
### Added

- Decent checkpoint to the app
- Building dev pipeline now
    - Dev uses docker-compose.yaml
        - which doesn't actually use Dockerfile in UI (it's just vite)
    - Separate .env file in UI

### Changed

### Fixed

## 2025-05-07 - [Unreleased]
 
### Added

- Dev pipeline somewhat at a good place
    - Pushed most environment variable to github actions secrets with "DEV" suffix

### Changed

### Fixed

## 2025-05-08 - [Unreleased]
 
### Added

- Dev pipeline 
    - Add DB seeding
- Prod pipeilne
    - Pretty much the same stuff with Dev, but we're not using a node container for UI now.
    
### Changed

### Fixed