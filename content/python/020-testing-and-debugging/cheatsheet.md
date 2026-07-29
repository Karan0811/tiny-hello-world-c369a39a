# Testing and Debugging Cheat Sheet

```python
import unittest

class MetricTests(unittest.TestCase):
    def test_value(self):
        self.assertEqual(metric(8, 2), 0.8)

    def test_invalid_raises(self):
        with self.assertRaises(ValueError):
            metric(0, 0)
```

```bash
python -m unittest
python -m unittest test_metrics.py
```

```python
import logging
logger = logging.getLogger(__name__)
logger.info("processed=%s", count)
```

## Best practices

- Test happy, boundary, and error paths.
- Use fixed inputs and temporary resources.
- Reproduce minimally, inspect traceback, add regression test.

## Common mistakes

- Live services in unit tests.
- Sensitive data in logs.
- Leaving `breakpoint()` in production.
- Making a test pass without understanding the failure.
