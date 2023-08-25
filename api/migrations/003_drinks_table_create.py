steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE drinks (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) UNIQUE NOT NULL,
            image_url varchar(200),
            description TEXT,
            instructions TEXT
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE drinks;
        """,
    ]
]
