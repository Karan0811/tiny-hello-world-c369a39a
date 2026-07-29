# Iterators, Generators & Decorators Cheat Sheet

## Iterator protocol

```python
iterator = iter(["a", "b"])
print(next(iterator))
```

## Generator

```python
def valid_items(items):
    for item in items:
        if item:
            yield item

scores = (score for score in [0.7, 0.9] if score >= 0.8)
```

## Decorator

```python
from functools import wraps

def log_call(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(function.__name__)
        return function(*args, **kwargs)
    return wrapper
```

| Concept | Reminder |
|---|---|
| Iterable | Can provide an iterator |
| Iterator | Produces next values |
| `yield` | Produces and pauses |
| Generator | Lazy, one-pass iterator |
| Decorator | Wraps a callable |
| `wraps` | Preserves function metadata |

## Rules

- Use generators for large or one-pass streams.
- Document whether callers can iterate more than once.
- Keep generator stages small and testable.
- Keep decorators focused and return original results.
- Measure memory and throughput before optimizing.
