from models import InventoryIn, InventoryOut
from queries.pool import pool


class InventoryNotFound(ValueError):
    pass


class InventoryRepo:
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
            if int(user_id) == int(item["id"]):
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
