# File Handling Cheat Sheet

## Paths and text

```python
from pathlib import Path

path = Path("data") / "records.txt"
path.parent.mkdir(parents=True, exist_ok=True)
path.write_text("hello\n", encoding="utf-8")
text = path.read_text(encoding="utf-8")
```

| Mode | Meaning | Existing file |
|---|---|---|
| `r` | Read | Required |
| `w` | Write | Replaced |
| `a` | Append | Preserved |
| `x` | Create | Causes error |

## Safe open pattern

```python
with path.open("r", encoding="utf-8") as file:
    for line in file:
        print(line.rstrip())
```

## JSON

```python
import json

with Path("config.json").open(encoding="utf-8") as file:
    config = json.load(file)

with Path("output.json").open("w", encoding="utf-8") as file:
    json.dump(config, file, indent=2)
```

## CSV

```python
import csv

with Path("data.csv").open(newline="", encoding="utf-8") as file:
    for row in csv.DictReader(file):
        print(row["name"])
```

## Checklist

- Use `Path`, UTF-8, and `with`.
- Validate headers, fields, and conversions.
- Stream large files line by line.
- Keep input and generated output separate.
- Do not overwrite important data without an explicit plan.
