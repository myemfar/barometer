steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL,
            tag_name VARCHAR(50) UNIQUE NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE tags;
        """,
    ]
]
