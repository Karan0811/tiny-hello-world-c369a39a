# Python Project Structure Cheat Sheet

```text
project/
  pyproject.toml
  README.md
  .gitignore
  src/package_name/
    main.py
    domain.py
    service.py
    adapters/
  tests/
```

```python
def main() -> None:
    service = build_service()
    service.run()

if __name__ == "__main__":
    main()
```

## Best practices

- Separate source, tests, docs, configuration, and generated output.
- Keep entry points thin; test domain logic independently.
- Document setup, run, and test commands.
- Exclude `.venv`, caches, secrets, and artifacts from version control.

## Common mistakes

- All logic in one script.
- Tests relying on repository-root imports.
- Source control containing local environments or credentials.
- Unnecessary empty architecture layers.
