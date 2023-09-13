## Barometer

- Kirk Sullivan
- Daniel Dick
- Bryan Fischer

## Getting started

Barometer - We help you Drank!

# Barometer

Barometer is a platform that allows you to view and create drink recipes. You can explore drinks created by all users, create your own drink recipes with details, and manage your ingredient inventory.

## Technologies Used

- React
- Redux
- PostgreSQL

## API endpoint summary

[Link to API Documentation](api.md)

## Installation

1. Clone the repository
2. Open docker
3. Open terminal and navigate to root directory where you cloned repo
4. create a docker volume for 'postgres-data' and 'pg-admin'
5. run docker compose build
6. run docker compose up

## Initialization

open browser to the following addresses to test functionalities:

1. localhost:3000 to view and test front end
2. localhost:8000/docs to view the fastAPI automatic documentation of the API and all endpoints

## Usage

Create an account.
Explore drinks created by other users.
Create your own drink and add ingredients to recipes.
Manage your ingredient inventory.
Enjoy using Barometer!

## Future Plans

- display ingredients missing from inventory on drink details page if a user is logged in

## Notes

currently api/seed.py loads ingredients from a static file, ingredientSeed.py. With a paid upgrade to the cocktail API, this could be made to keep up to date with the cocktaildb, code example commented out in seed.py
