steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE inventory (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT REFERENCES accounts(id) NOT NULL,
            ingredient_id SMALLINT REFERENCES ingredients(id) NOT NULL,
            quantity VARCHAR(150) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE inventory;
        """,
    ]
]
