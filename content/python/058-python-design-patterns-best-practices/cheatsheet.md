# Python Design Patterns and Best Practices Cheat Sheet

## Quick Reference

- Define explicit inputs, outputs, and failure behavior.
- Validate values from users, files, requests, and configuration.
- Keep operations focused and verify observable results.

## Syntax

```python
def normalize(value: str) -> str:
    cleaned = value.strip()
    if not cleaned:
        raise ValueError("value is required")
    return cleaned
```

## Examples

```python
items = [" Ada ", "", "Lin"]
valid_items = [item.strip() for item in items if item.strip()]
print(valid_items)
```

## Best Practices

- Use meaningful names, explicit dependencies, and testable functions.
- Test normal, boundary, and failure cases.
- Record safe operational context; do not log secrets or private content.

## Common Mistakes

- Trusting unvalidated external input.
- Combining unrelated responsibilities in one large function.
- Silencing failures that should stop an unsafe operation.

## Interview Tips

Explain the contract, validation boundary, trade-off, and test strategy.
