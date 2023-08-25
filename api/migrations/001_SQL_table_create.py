steps = [
    [
        ## "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) UNIQUE NOT NULL,
            hashed_password varchar(200) NOT NULL
        );
        """,
        ## "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
