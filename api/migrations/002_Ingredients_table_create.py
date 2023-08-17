steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE ingredients (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            image_url varchar(200)
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE ingredients;
        """,
    ]
]
