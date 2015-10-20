# pm2 name field test

## name test 1

Name field isn't required, without this field, pm2 use script's name as App name:
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
If there has name field in app.json, pm2 use it as App name:
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
If name field contains spaces, pm2 shows it still with spaces:
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

But in this situation, if you want to delete it by name, you need type the name with single quote surrounded:
```
pm2 delete 'my http server'
```
