from models import RecipesIn, RecipesOut
from queries.pool import pool


class RecipeNotFound(ValueError):
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
                        print("col", column)
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def get(self, recipe_id):
        test_recipe = self.get_all()

        for item in test_recipe:
            if int(recipe_id) == int(item["id"]):
                break
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
