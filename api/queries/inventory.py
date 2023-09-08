from models import InventoryIn
from queries.pool import pool


class InventoryNotFound(ValueError):
    pass


class InventoryIngredientAlreadyExists(ValueError):
    pass


class InventoryIngredientNotFound(ValueError):
    pass


class InventoryRepo:
    def add_ingredient(self, info: InventoryIn, user_id):
        ingredient = self._get_specific(user_id, info.ingredient_id)
        if ingredient != []:
            raise InventoryIngredientAlreadyExists
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO inventory
                        (user_id, ingredient_id, quantity)
                    VALUES
                        (%s, %s, %s)
                    RETURNING user_id, ingredient_id, quantity;
                    """,
                    [user_id, info.ingredient_id, info.quantity],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def _get_specific(self, user_id, ingredient_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM inventory
                    WHERE user_id = %s AND
                    ingredient_id = %s;
                    """,
                    [user_id, ingredient_id],
                )
                result = []
                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)
                return result

    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM inventory;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def get(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT ingredients.id, ingredients.name,
                    ingredients.image_url, inventory.quantity
                    FROM inventory
                    INNER JOIN ingredients
                        ON (ingredients.id = inventory.ingredient_id)
                    WHERE inventory.user_id = %s;
                    """,
                    [user_id],
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def delete_ingredient(self, info, user_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM inventory
                    WHERE user_id = %s AND
                    ingredient_id = %s;
                    """,
                    [user_id, info.ingredient_id],
                )

    def update_ingredient(self, info, user_id):
        ingredient = self._get_specific(user_id, info.ingredient_id)
        if ingredient == []:
            raise InventoryIngredientNotFound
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE inventory
                    SET quantity = %s
                    WHERE user_id = %s AND
                    ingredient_id = %s;
                    """,
                    [info.quantity, user_id, info.ingredient_id],
                )
