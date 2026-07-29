# SQLAlchemy Cheat Sheet

| Task | Command |
|---|---|
| Connect | create_engine() |
| Session | Session(engine) |
| Create Tables | Base.metadata.create_all() |
| Add | session.add() |
| Query | session.query() |
| Get by ID | session.get() |
| Save | session.commit() |
| Undo | session.rollback() |
| Delete | session.delete() |
| Close | session.close() |
