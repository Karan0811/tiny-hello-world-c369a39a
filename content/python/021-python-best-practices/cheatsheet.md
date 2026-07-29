# Python Best Practices Cheat Sheet

```python
def average_score(scores: list[float]) -> float:
    if not scores:
        raise ValueError("scores must not be empty")
    return sum(scores) / len(scores)
```

```python
import os
endpoint = os.environ["SERVICE_ENDPOINT"]
```

| Practice | Reminder |
|---|---|
| Naming | `snake_case` functions, `PascalCase` classes |
| Types | Document interfaces; validate external input |
| Config | Keep settings and secrets out of source |
| Tests | Automate behavior and error checks |
| Logs | Record safe context and useful counts |

## Best practices

- Small functions, clear contracts, explicit dependencies.
- Format, lint, test, and review changes in CI.
- Pin dependencies and keep environments reproducible.

## Common mistakes

- Vague names and hidden globals.
- Hard-coded secrets or endpoints.
- Broad swallowed exceptions.
- Logging private data.
