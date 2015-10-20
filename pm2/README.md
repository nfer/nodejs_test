# nodejs pm2 test

## name test 1

Name field isn't required, without this field, pm2 use file's name as app name:
```
{
    "script" : "httpserver.js",
}
```

result:
```
[PM2] Process launched
┌────────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 10 │ fork │ 24488 │ online │ 0       │ 0s     │ 12.820 MB   │ disabled │
└────────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

## name test 2
If has name field in app.json, pm2 use it as app name:
```
{
    "name": "myhttpserver",
    "script" : "httpserver.js",
}
```

result:
```
[PM2] Process launched
┌──────────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name     │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ myhttpserver │ 11 │ fork │ 24579 │ online │ 0       │ 0s     │ 12.953 MB   │ disabled │
└──────────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

## name test 3
If name field contains space, pm2 shows it still with space:
```
{
    "name": "my http server",
    "script" : "httpserver.js",
}
```

result:
```
[PM2] Process launched
┌────────────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name       │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├────────────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my http server │ 12 │ fork │ 25382 │ online │ 0       │ 0s     │ 13.055 MB   │ disabled │
└────────────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

But in this situation, you need delete this app with below command:
```
pm2 delete 'my http server'
```
