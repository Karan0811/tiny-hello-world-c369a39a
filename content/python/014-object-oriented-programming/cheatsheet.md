# Object-Oriented Programming Cheat Sheet

## Class pattern

```python
class Prediction:
    def __init__(self, label: str, score: float):
        if not 0 <= score <= 1:
            raise ValueError("score must be between 0 and 1")
        self.label = label
        self.score = score

    def is_confident(self, threshold: float = 0.8) -> bool:
        return self.score >= threshold
```

## Dataclass pattern

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Chunk:
    document_id: str
    text: str
```

| Term | Meaning |
|---|---|
| Class | Blueprint for objects |
| Instance | Concrete object from a class |
| Attribute | Object state |
| Method | Object behavior |
| `self` | Current instance |
| Invariant | Rule for valid state |

## Design rules

- Keep each class focused on one cohesive responsibility.
- Validate state in constructors or controlled methods.
- Use `_name` for implementation details.
- Prefer a function when no persistent state is needed.
- Prefer composition for combining collaborators.
