steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE drink_tags (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT REFERENCES accounts(id) NOT NULL,
            drink_id SMALLINT REFERENCES drinks(id) NOT NULL,
            tag_id SMALLINT REFERENCES tags(id) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE drink_tags;
        """,
    ]
]
