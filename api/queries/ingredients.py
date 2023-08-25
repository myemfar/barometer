from models import IngredientsIn, IngredientsOut
from queries.pool import pool


class IngredientNotFound(ValueError):
    pass


class IngredientsRepo:
    def get(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM ingredients
                    ORDER BY id;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def get_one(self, ingredient_name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, name, image_url FROM ingredients
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
                return record
