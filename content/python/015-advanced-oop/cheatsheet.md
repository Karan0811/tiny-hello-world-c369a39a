# Advanced OOP Cheat Sheet

## Abstract interface and composition

```python
from abc import ABC, abstractmethod

class Loader(ABC):
    @abstractmethod
    def load(self) -> list[str]:
        pass

class Service:
    def __init__(self, loader: Loader):
        self.loader = loader
```

## Property

```python
@property
def timeout(self) -> int:
    return self._timeout

@timeout.setter
def timeout(self, value: int) -> None:
    if value < 1:
        raise ValueError("timeout must be positive")
    self._timeout = value
```

| Concept | Reminder |
|---|---|
| Inheritance | Use for compatible is-a specialization |
| Polymorphism | Different implementations, shared operation |
| ABC | Explicit required behavior |
| Composition | Object uses collaborators |
| `super()` | Calls compatible parent behavior |
| `__repr__` | Developer-facing representation |

## Design rules

- Prefer composition before inheritance.
- Keep interfaces narrow and document their contract.
- Inject collaborators through constructors for testing.
- Test every implementation against the same behavior.
- Do not hide cost, limits, or failure differences behind an interface.
