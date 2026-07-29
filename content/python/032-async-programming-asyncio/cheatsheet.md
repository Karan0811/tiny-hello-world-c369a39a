# AsyncIO Cheat Sheet

| Task | Code |
|------|------|
| Create coroutine | `async def func():` |
| Await coroutine | `await func()` |
| Run program | `asyncio.run(main())` |
| Create task | `asyncio.create_task(func())` |
| Run together | `await asyncio.gather(...)` |
| Async sleep | `await asyncio.sleep(1)` |
| Async queue | `asyncio.Queue()` |
| Async HTTP | `aiohttp.ClientSession()` |
