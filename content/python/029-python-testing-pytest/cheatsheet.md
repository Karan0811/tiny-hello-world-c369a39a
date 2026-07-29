# Pytest Cheat Sheet

| Task | Syntax |
|------|--------|
| Install | `pip install pytest` |
| Run all tests | `pytest` |
| Run one file | `pytest tests/test_file.py` |
| Run one test | `pytest tests/test_file.py::test_name` |
| Assertion | `assert actual == expected` |
| Fixture | `@pytest.fixture` |
| Parametrize | `@pytest.mark.parametrize(...)` |
| Test exception | `with pytest.raises(Exception):` |
