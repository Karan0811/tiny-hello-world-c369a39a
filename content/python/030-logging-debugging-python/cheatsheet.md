# Logging & Debugging Cheat Sheet

| Task | Code |
|------|------|
| Import logging | `import logging` |
| Basic config | `logging.basicConfig(level=logging.INFO)` |
| Create logger | `logger = logging.getLogger(__name__)` |
| INFO log | `logger.info("Message")` |
| ERROR log | `logger.error("Error")` |
| Exception log | `logging.exception("Failed")` |
| File handler | `logging.FileHandler("app.log")` |
| Rotating logs | `RotatingFileHandler()` |
