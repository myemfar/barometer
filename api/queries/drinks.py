from models import DrinksIn
from queries.pool import pool


class DrinkNotFound(ValueError):
    pass


class DrinksRepo:
    def get_all(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drinks;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)
                return result

    def get(self, drink_id):
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
                    raise DrinkNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def get_by_name(self, name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drinks
                    WHERE name = %s;
                    """,
                    [name],
                )
                record = None
                row = db.fetchone()
                if row is None:
                    raise DrinkNotFound
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def add_drink(self, info: DrinksIn, user_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO drinks
                        (name, user_id, image_url, description, instructions)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id, user_id, name, image_url,
                    description, instructions;
                    """,
                    [
                        info.name,
                        user_id,
                        info.image_url,
                        info.description,
                        info.instructions,
                    ],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def update_drink(self, info: DrinksIn):
        self.get_by_name(info.name)
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE drinks
                    SET image_url = %s,
                    description = %s,
                        instructions = %s
                    WHERE name = %s
                    RETURNING id, user_id, name, image_url, description,
                    instructions;
                    """,
                    [
                        info.image_url,
                        info.description,
                        info.instructions,
                        info.name,
                    ],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def delete_drink(self, drink_id):
        self.get(drink_id)
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM drinks CASCADE
                    WHERE id = %s;
                    """,
                    [drink_id],
                )
