steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY NOT NULL,
            drink_id SMALLINT REFERENCES drinks(id) ON DELETE CASCADE,
            ingredient_id SMALLINT REFERENCES ingredients(id) ON DELETE CASCADE,
            quantity VARCHAR(150) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE recipes;
        """,
    ]
]
