# Comprehensions Cheat Sheet

```python
values = [x * 2 for x in items if x > 0]
unique = {tag.lower() for tag in tags}
mapping = {row["id"]: row["score"] for row in rows}
stream = (row for row in rows if row["valid"])
```

| Form | Result |
|---|---|
| `[]` | list |
| `{}` | set or dictionary |
| `()` | generator |

## Best practices

- Keep one transformation per comprehension.
- Use a loop or helper function for complex rules.
- Choose list, set, dict, or generator by data semantics.

## Common mistakes

- Unreadable nested comprehensions.
- Assuming a generator is reusable.
- Losing duplicate data by using a set.
- Silent dictionary-key overwrites.
