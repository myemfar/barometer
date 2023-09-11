## API Overview

### Create an Account

To create a user account, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/accounts`
- **Response**: AccountToken

### Get Access Token

To get an access token for an authenticated user, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/token`
- **Response**: AccountToken or None

### Get Your Drink Tags

To retrieve your drink tags, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/drink_tags/mine`
- **Response**: DrinkTagsList

### Get Your Drink Tags with Names

To retrieve your drink tags along with their names, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/drink_tags/mine/names`
- **Response**: DrinkTagsWithNameList

### Create a Drink Tag

To create a drink tag, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/drink_tags`
- **Response**: DrinkTagsList

### Get Drink Tags by Drink

To retrieve drink tags associated with a specific drink, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/drink_tags/mine/{drink_id}`
- **Response**: DrinkTagsList

### Delete a Drink Tag

To delete a drink tag, use the following API endpoint:

- **Method**: DELETE
- **Endpoint**: `/api/drink_tags/mine`
- **Response**: bool

### Get Drinks

To retrieve a list of drinks, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/drinks`
- **Response**: DrinksList

### Get a Drink

To retrieve details of a specific drink, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/drinks/{drink_id}`
- **Response**: DrinksOut

### Add a Drink

To add a new drink, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/drinks`
- **Response**: DrinksOut

### Update a Drink

To update a drink, use the following API endpoint:

- **Method**: PUT
- **Endpoint**: `/api/drinks`
- **Response**: DrinksOut

### Delete a Drink

To delete a drink, use the following API endpoint:

- **Method**: DELETE
- **Endpoint**: `/api/drinks/{drink_id}`
- **Response**: bool

### Get Ingredients

To retrieve a list of ingredients, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/ingredients`
- **Response**: IngredientsList

### Get User Inventory

To retrieve your ingredient inventory, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/inventory/mine`
- **Response**: UserInventoryList

### Create User Inventory

To add an ingredient to your inventory, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/inventory`
- **Response**: UserInventoryList

### Delete User Ingredient

To delete an ingredient from your inventory, use the following API endpoint:

- **Method**: DELETE
- **Endpoint**: `/api/inventory/mine`
- **Response**: bool

### Update User Ingredient

To update an ingredient in your inventory, use the following API endpoint:

- **Method**: PUT
- **Endpoint**: `/api/inventory`
- **Response**: InventoryList

### Get Recipes

To retrieve a list of recipes, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/recipes`
- **Response**: RecipesList

### Get a Recipe

To retrieve details of a specific recipe, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/recipes/{recipe_id}`
- **Response**: RecipesOut

### Get Recipe Steps by Drink

To retrieve the steps of a recipe for a specific drink, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/recipes/{drink_id}/steps`
- **Response**: RecipeDetailsList

### Add a Recipe

To add a new recipe, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/recipes`
- **Response**: RecipesOut

### Update a Recipe

To update a recipe, use the following API endpoint:

- **Method**: PUT
- **Endpoint**: `/api/recipes/`
- **Response**: RecipesOut

### Delete a Recipe

To delete a recipe, use the following API endpoint:

- **Method**: DELETE
- **Endpoint**: `/api/recipes/{drink_id}/{recipe_id}`
- **Response**: bool

### Get Tags

To retrieve a list of tags, use the following API endpoint:

- **Method**: GET
- **Endpoint**: `/api/tags`
- **Response**: TagsList

### Create User Tags

To add a new tag, use the following API endpoint:

- **Method**: POST
- **Endpoint**: `/api/tags`
- **Response**: TagsList

### Delete Tag

To delete a tag, use the following API endpoint:

- **Method**: DELETE
- **Endpoint**: `/api/tags`
- **Response**: bool

### Update Tag

To update a tag, use the following API endpoint:

- **Method**: PUT
- **Endpoint**: `/api/tags`
- **Response**: TagsList
