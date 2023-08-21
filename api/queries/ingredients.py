from models import IngredientsIn, IngredientsOut
from queries.pool import pool
import requests
import json


class DuplicateIngredientError(ValueError):
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

                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                return record

    def api_populate(self):
        data = []
        url = "http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
        response = requests.get(url)
        fetched_items = json.loads(response.content)
        for item in fetched_items["drinks"]:
            item_dict = {}
            item_dict["name"] = item["strIngredient1"]
            constructed_image_url = f"www.thecocktaildb.com/images/ingredients/{item['strIngredient1']}-Medium.png"
            item_dict["image_url"] = constructed_image_url
            data.append(item_dict)
        for value in data:
            if self.get_one(value["name"]):
                continue
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO ingredients
                            (name, image_url)
                        VALUES
                            (%s, %s);
                        """,
                        [value["name"], value["image_url"]],
                    )
