# File System and pathlib Cheat Sheet

```python
from pathlib import Path

root = Path.cwd() / "data"
root.mkdir(parents=True, exist_ok=True)
for path in root.glob("*.json"):
    if path.is_file():
        print(path.name, path.stat().st_size)
```

| API | Use |
|---|---|
| `Path.cwd()` | current directory |
| `path / "name"` | join paths |
| `exists()` | check presence |
| `is_file()` / `is_dir()` | check type |
| `glob()` / `rglob()` | find matches |
| `resolve()` | normalized absolute target |

## Best practices

- Use `Path`, not manual separators.
- Validate location, type, then content.
- Separate inputs from generated artifacts.

## Common mistakes

- Unbounded recursive globbing.
- Trusting extensions as file validation.
- Unsafe overwrite or deletion targets.
