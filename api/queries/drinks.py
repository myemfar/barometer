from models import DrinksIn, DrinksOut
from queries.pool import pool


class DrinkNotFound(ValueError):
    pass


class DrinkAlreadyExists(ValueError):
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
        test_drink = self.get_all()
        exists = False
        for item in test_drink:
            if int(drink_id) == int(item["id"]):
                exists = True
        if exists == False:
            raise DrinkNotFound

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
                result = []
                row = db.fetchone()

                record = {
                    "id": row[0],
                    "name": row[1],
                    "image_url": row[2],
                    "description": row[3],
                    "instructions": row[4],
                }

                result.append(record)

                return result

    # def _get_by_name(self, drink_name):
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             db.execute(
    #                 """
    #                 SELECT *
    #                 FROM drinks
    #                 WHERE name = %s;
    #                 """,
    #                 [drink_name],
    #             )
    #             result = []
    #             row = db.fetchone()

    #             record = {
    #                 "id": row[0],
    #                 "name": row[1],
    #                 "image_url": row[2],
    #                 "description": row[3],
    #                 "instructions": row[4],
    #             }

    #             result.append(record)

    #             return result

    def add_drink(self, info: DrinksIn):
        # if self._get_by_name(info.name):
        #     raise DrinkAlreadyExists
        test_drink = self.get_all()
        exists = False
        for item in test_drink:
            if info.name == item["name"]:
                exists = True
        if exists == True:
            raise DrinkAlreadyExists
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO drinks
                        (name, image_url, description, instructions)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id, name, image_url, description, instructions;
                    """,
                    [
                        info.name,
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
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE drinks
                    SET image_url = %s,
                    description = %s,
                        instructions = %s
                    WHERE name = %s
                    RETURNING id, name, image_url, description, instructions;
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
