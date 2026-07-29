# asyncio and Concurrency Cheat Sheet

```python
import asyncio

async def fetch(item: str) -> str:
    await asyncio.sleep(0.01)
    return item.upper()

async def main() -> None:
    results = await asyncio.gather(*(fetch(x) for x in ["a", "b"]))
    print(results)

asyncio.run(main())
```

```python
semaphore = asyncio.Semaphore(5)
async with semaphore:
    result = await asyncio.wait_for(fetch("a"), timeout=1)
```

## Best practices

- Use async for awaitable I/O, not CPU-heavy computation.
- Bound concurrency and set timeouts.
- Define retry, cancellation, and partial-failure policy.

## Common mistakes

- `time.sleep()` inside async code.
- Unlimited concurrent provider calls.
- Ignoring task exceptions.
- Assuming async creates CPU parallelism.
