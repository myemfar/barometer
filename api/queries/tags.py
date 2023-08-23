from models import TagsIn, TagsOut
from queries.pool import pool


class TagNotFound(ValueError):
    pass


class TagsRepo:
    def get_tags(self):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM tags
                    ORDER BY id;
                    """,
                )
                result = []

                for row in db.fetchall():
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                    result.append(record)

                return result

    def add_tag(self, tag_name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO tags
                        (tag_name)
                    VALUES
                        (%s)
                    RETURNING (tag_name)
                    """,
                    [tag_name],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]

                return record

    def delete_tag(self, id):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM tags
                    WHERE id = %s
                    """,
                    [id],
                )

    def update_tags(self, id, tag_name):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE tags
                    SET tag_name = %s
                    WHERE id = %s
                    """,
                    [tag_name, id],
                )
