from models import DrinkTagsIn
from queries.pool import pool


class DrinkTagNotFound(ValueError):
    pass


class DrinkTagAlreadyExists(ValueError):
    pass


class DrinkTagsRepo:
    def add_drink_tag(self, info: DrinkTagsIn, user_id):
        test = self._get_one(user_id, info.tag_id, info.drink_id)
        if test is not None:
            raise DrinkTagAlreadyExists

        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO drink_tags
                        (user_id, drink_id, tag_id)
                    VALUES
                        (%s, %s, %s)
                    RETURNING user_id, drink_id, tag_id;
                    """,
                    [user_id, info.drink_id, info.tag_id],
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
                    FROM drink_tags;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def get_by_drink(self, user_id, drink_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drink_tags
                    WHERE user_id = %s AND
                    drink_id = %s;
                    """,
                    [user_id, drink_id],
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
                    SELECT *
                    FROM drink_tags
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
                if result == []:
                    raise DrinkTagNotFound
                return result

    def _get_one(self, user_id, tag_id, drink_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM drink_tags
                    WHERE user_id = %s AND
                    tag_id = %s AND
                    drink_id = %s;
                    """,
                    [user_id, tag_id, drink_id],
                )
                record = None
                row = db.fetchone()

                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def delete_drink_tag(self, info: DrinkTagsIn, user_id):
        test = self._get_one(user_id, info.tag_id, info.drink_id)
        if test is None:
            raise DrinkTagNotFound
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM drink_tags
                    WHERE user_id = %s AND
                    drink_id = %s AND
                    tag_id = %s;
                    """,
                    [user_id, info.drink_id, info.tag_id],
                )
