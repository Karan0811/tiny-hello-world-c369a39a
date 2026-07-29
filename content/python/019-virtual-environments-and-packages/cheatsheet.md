# Virtual Environments and Packages Cheat Sheet

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip show requests
python -m pip freeze
deactivate
```

PowerShell activation: `.venv\Scripts\Activate.ps1`

```text
# requirements.txt
requests==2.32.3
```

## Best practices

- Use `.venv`; do not commit it.
- Use `python -m pip`.
- Pin and review production dependencies.
- Build and test from a clean environment.

## Common mistakes

- Global installation by accident.
- Mismatched `pip` and `python`.
- Credentials in dependency files.
- Unreviewed latest-version upgrades.
