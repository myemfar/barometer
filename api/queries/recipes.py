from models import RecipesIn, RecipesOut
from queries.pool import pool
from queries.ingredients import IngredientsRepo


class RecipeNotFound(ValueError):
    pass


class RecipeAlreadyExists(ValueError):
    pass


class RecipesRepo:
    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM recipes;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def get(self, recipe_id):
        test_recipe = self.get_all()
        exists = False
        for item in test_recipe:
            if int(recipe_id) == int(item["id"]):
                exists = True
                break
        if exists == False:
            raise RecipeNotFound

        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM recipes
                    WHERE id = %s;
                    """,
                    [recipe_id],
                )
                result = []
                row = db.fetchone()

                record = {
                    "id": row[0],
                    "drink_id": row[1],
                    "ingredient_id": row[2],
                    "quantity": row[3],
                }

                result.append(record)

                return result

    def add_recipe(self, info: RecipesIn):
        test_recipe = self.get_all()
        exists = False
        for item in test_recipe:
            if (
                int(info.drink_id) == item["drink_id"]
                and int(info.ingredient_id) == item["ingredient_id"]
            ):
                exists = True
        if exists == True:
            raise RecipeAlreadyExists
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO recipes
                        (drink_id, ingredient_id, quantity)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id, drink_id, ingredient_id, quantity;
                    """,
                    [
                        info.drink_id,
                        info.ingredient_id,
                        info.quantity,
                    ],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def update_recipe(self, info: RecipesIn):
        test_recipe = self.get_all()
        exists = False
        for item in test_recipe:
            if (
                int(info.ingredient_id) == item["ingredient_id"]
                and int(info.drink_id) == item["drink_id"]
            ):
                exists = True
                break
        if exists == False:
            raise RecipeNotFound
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE recipes
                    SET quantity = %s
                    WHERE drink_id = %s
                    AND ingredient_id = %s
                    RETURNING id, drink_id, ingredient_id, quantity;
                    """,
                    [
                        info.quantity,
                        info.drink_id,
                        info.ingredient_id,
                    ],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def delete_recipe(self, recipe_id):
        test_recipe = self.get_all()
        exists = False
        for item in test_recipe:
            if int(recipe_id) == int(item["id"]):
                exists = True
        if exists == False:
            raise RecipeNotFound
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM recipes
                    WHERE id = %s;
                    """,
                    [recipe_id],
                )
