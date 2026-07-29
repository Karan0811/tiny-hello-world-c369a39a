# Exception Handling Cheat Sheet

## Specific handling

```python
try:
    value = int(raw_value)
except (TypeError, ValueError) as error:
    raise ValueError("value must be an integer") from error
else:
    print(value)
finally:
    print("attempt finished")
```

| Construct | Use |
|---|---|
| `try` | Narrow risky operation |
| `except Error` | Expected, recoverable condition |
| `else` | Success-only work |
| `finally` | Cleanup or final reporting |
| `raise` | Signal an invalid state |

## Common errors

| Error | Typical cause |
|---|---|
| `FileNotFoundError` | Missing path |
| `ValueError` | Invalid value or conversion |
| `KeyError` | Missing dictionary key |
| `TypeError` | Wrong operation or argument type |
| `JSONDecodeError` | Invalid JSON input |

## Rules

- Catch only errors you expect and can handle.
- Never use `except: pass` in application logic.
- Validate known rules before doing work.
- Preserve causes with `raise NewError(...) from error`.
- Log safe context; do not expose secrets or tracebacks to users.
