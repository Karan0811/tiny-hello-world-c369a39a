# Dependency Management Cheat Sheet

| Task | Command |
|------|---------|
| Create virtual environment | `python -m venv .venv` |
| Activate (Windows) | `.venv\Scripts\activate` |
| Activate (Linux/macOS) | `source .venv/bin/activate` |
| Deactivate | `deactivate` |
| Install package | `pip install package_name` |
| Freeze dependencies | `pip freeze > requirements.txt` |
| Install requirements | `pip install -r requirements.txt` |
| List packages | `pip list` |
| Upgrade package | `pip install --upgrade package_name` |
