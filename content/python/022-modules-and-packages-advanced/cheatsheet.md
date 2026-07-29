# Modules and Packages Advanced Cheat Sheet

```python
from app.domain import Prompt
from app.service import validate_prompt

if __name__ == "__main__":
    main()
```

```text
app/
  __init__.py
  domain.py
  service.py
  adapters/
    client.py
```

## Best practices

- Prefer clear absolute imports.
- Keep `__init__.py` and import-time code lightweight.
- Expose a small public API with `__all__` when useful.
- Fix circular imports by extracting shared contracts or reversing dependencies.

## Common mistakes

- Side effects during import.
- Files named after standard-library modules.
- Delayed imports masking a circular design.
- Business logic in entry points.
