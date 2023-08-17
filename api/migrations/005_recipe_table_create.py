steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY NOT NULL,
            drink_id SMALLINT REFERENCES drinks(id) NOT NULL,
            ingredient_id SMALLINT REFERENCES ingredients(id) NOT NULL,
            quantity VARCHAR(150) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE recipes;
        """,
    ]
]
