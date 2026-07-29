# Database Testing Cheat Sheet

| Task | Tool / Method |
|---|---|
| Test Framework | pytest |
| Fixture | @pytest.fixture |
| Shared Fixtures | conftest.py |
| Parameterized Tests | @pytest.mark.parametrize |
| Rollback | session.rollback() |
| Coverage | pytest --cov=app |
| Mocking | unittest.mock.MagicMock |
| Session | Session(engine) |
