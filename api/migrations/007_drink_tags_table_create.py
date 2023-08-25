steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE drink_tags (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT REFERENCES accounts(id) ON DELETE CASCADE,
            drink_id SMALLINT REFERENCES drinks(id) ON DELETE CASCADE,
            tag_id SMALLINT REFERENCES tags(id) ON DELETE CASCADE
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE drink_tags;
        """,
    ]
]
