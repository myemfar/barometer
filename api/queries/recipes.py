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
                record = None
                row = db.fetchone()
                if row is None:
                    raise RecipeNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def _get_specific(self, info: RecipesIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM recipes
                    WHERE drink_id = %s AND
                    ingredient_id = %s;
                    """,
                    [info.drink_id, info.ingredient_id],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def add_recipe(self, info: RecipesIn):
        test = self._get_specific(info)
        if test != None:
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
        test = self._get_specific(info)
        if test == None:
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
        self.get(recipe_id)
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM recipes
                    WHERE id = %s;
                    """,
                    [recipe_id],
                )
