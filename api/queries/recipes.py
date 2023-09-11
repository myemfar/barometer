from models import RecipesIn
from queries.pool import pool
from queries.ingredients import IngredientNotFound


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

    def _get_user_id_from_drink_id(self, drink_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drinks
                    WHERE id = %s;
                    """,
                    [drink_id],
                )
                record = None
                row = db.fetchone()
                if row is None:
                    raise RecipeNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record["user_id"]

    def _get_user_id_from_drink(self, drink_name):
        drink_id = self._get_drink_id_from_name(drink_name)
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drinks
                    WHERE id = %s;
                    """,
                    [drink_id],
                )
                record = None
                row = db.fetchone()
                if row is None:
                    raise RecipeNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record["user_id"]

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

    def get_by_drink(self, drink_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT r.id, i.name, i.image_url, r.quantity
                    FROM recipes r
                    INNER JOIN ingredients i
                        ON (r.ingredient_id = i.id)
                    WHERE r.drink_id = %s;
                    """,
                    [drink_id],
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def _get_specific(self, drink_id, ingredient_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM recipes
                    WHERE drink_id = %s AND
                    ingredient_id = %s;
                    """,
                    [drink_id, ingredient_id],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def add_recipe(self, info: RecipesIn):
        drink_id = self._get_drink_id_from_name(info.drink_name)
        ingredient_id = self._get_ingredient_id_from_name(info.ingredient_name)
        test = self._get_specific(drink_id, ingredient_id)
        if test is not None:
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
                        drink_id,
                        ingredient_id,
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

    def _get_ingredient_id_from_name(self, ingredient_name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id FROM ingredients
                    WHERE name = %s
                    """,
                    [ingredient_name],
                )
                record = None
                row = db.fetchone()
                if row is None:
                    raise IngredientNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record["id"]

    def _get_drink_id_from_name(self, drink_name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id FROM drinks
                    WHERE name = %s
                    """,
                    [drink_name],
                )
                record = None
                row = db.fetchone()
                if row is None:
                    raise IngredientNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record["id"]

    def update_recipe(self, info: RecipesIn):
        drink_id = self._get_drink_id_from_name(info.drink_name)
        ingredient_id = self._get_ingredient_id_from_name(info.ingredient_name)
        test = self._get_specific(drink_id, ingredient_id)
        if test is None:
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
                        drink_id,
                        ingredient_id,
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
