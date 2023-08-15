from models import AccountIn
from queries.pool import pool


class AccountQueries:
    pass


class AccountRepo:
    def create(self, info: AccountIn, hashed_pass):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO accounts
                        (username, hashed_password)
                    VALUES
                        (%s, %s)
                    RETURNING id, username, hashed_password;
                    """,
                    [info.username, hashed_pass],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def get(self, username):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, username, hashed_password FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                record = None
                row = db.fetchone()

                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def delete(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s
                    """,
                    [user_id],
                )


class AccountOut:
    pass


class AccountIn:
    pass
