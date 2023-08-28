steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE drinks (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id SMALLINT REFERENCES accounts(id) ON DELETE CASCADE,
            name VARCHAR(200) UNIQUE NOT NULL,
            image_url varchar(200),
            description TEXT,
            instructions TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE drinks;
        """,
    ]
]
