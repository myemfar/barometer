steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE inventory (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT REFERENCES accounts(id) ON DELETE CASCADE,
            ingredient_id SMALLINT REFERENCES ingredients(id)
            ON DELETE CASCADE,
            quantity VARCHAR(150) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE inventory;
        """,
    ]
]
