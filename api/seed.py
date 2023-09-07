from queries.pool import pool
import requests
import json


def api_populate():
    data = []
    url = "http://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    response = requests.get(url)
    fetched_items = json.loads(response.content)
    for item in fetched_items["drinks"]:
        item_dict = {}
        item_dict["name"] = item["strIngredient1"]
        constructed_image_url = (
            "http://www.thecocktaildb.com/images/ingred"
            + f"ients/{item['strIngredient1']}-Medium.png"
        )
        item_dict["image_url"] = constructed_image_url
        data.append(item_dict)
    for value in data:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            INSERT INTO ingredients
                                (name, image_url)
                            VALUES
                                (%s, %s)
                            ON CONFLICT (name) DO NOTHING;
                            """,
                        [value["name"], value["image_url"]],
                    )
        except Exception as e:
            print(f"Error inserting ingredient {value['name']}: {e}")

    initial_tags = [
        {"tag_name": "Favorite"},
        {"tag_name": "On Menu"},
        {"tag_name": "Popular"},
        {"tag_name": "Drink of the Day"},
    ]
    for value in initial_tags:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO tags
                            (tag_name)
                        VALUES
                            (%s)
                        ON CONFLICT (tag_name) DO NOTHING;
                        """,
                        [value["tag_name"]],
                    )
        except Exception as e:
            print(f"Error inserting tags {value['tag_name']}: {e}")


api_populate()
