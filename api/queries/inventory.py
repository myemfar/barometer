from models import InventoryIn, InventoryOut
from queries.pool import pool


class InventoryNotFound(ValueError):
    pass


class InventoryRepo:
    def add_ingredient(self, user_id, ingredient_id, quantity):
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
                    [user_id, ingredient_id, quantity],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

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
        test_user = self.get_all()
        for item in test_user:
            if int(user_id) == int(item["user_id"]):
                break
            raise InventoryNotFound

        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM inventory
                    WHERE user_id = %s;
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

    def delete_ingredient(self, user_id, ingredient_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM inventory
                    WHERE user_id = %s AND
                    ingredient_id = %s;
                    """,
                    [user_id, ingredient_id],
                )

    def update_ingredient(self, user_id, ingredient_id, quantity):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE inventory
                    SET quantity = %s
                    WHERE user_id = %s AND
                    ingredient_id = %s;
                    """,
                    [quantity, user_id, ingredient_id],
                )
