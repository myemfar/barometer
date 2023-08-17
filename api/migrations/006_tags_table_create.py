steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL,
            tag_name VARCHAR(50) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE tags;
        """,
    ]
]
