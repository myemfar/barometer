from models import DrinkTagsIn, DrinksOut
from queries.pool import pool


class DrinkTagNotFound(ValueError):
    pass


class DrinkTagAlreadyExists(ValueError):
    pass


class DrinkTagsRepo:
    def add_drink_tag(self, info: DrinkTagsIn):
        exists = False
        test_tags = self.get_all()
        for tag in test_tags:
            if (
                tag["user_id"] == int(info.user_id)
                and tag["drink_id"] == int(info.drink_id)
                and tag["tag_id"] == int(info.tag_id)
            ):
                exists = True
        if exists == True:
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
                    [info.user_id, info.drink_id, info.tag_id],
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

    def get(self, user_id):
        test_drink_tag = self.get_all()
        exists = False
        for item in test_drink_tag:
            if int(user_id) == int(item["user_id"]):
                exists = True
                break
        if exists == False:
            raise DrinkTagNotFound

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

                return result

    def delete_drink_tag(self, info: DrinkTagsIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM drink_tags
                    WHERE user_id = %s AND
                    drink_id = %s AND
                    tag_id = %s;
                    """,
                    [info.user_id, info.drink_id, info.tag_id],
                )
