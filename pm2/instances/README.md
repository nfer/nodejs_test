# pm2 instances field test

## instances test 1

Instances field isn't required, but if it's contained in app.json, pm2 use **cluster** exec_mode silently:
```
{
    "script" : "httpserver.js",
    "instances": 4,
}
```

result:
```
[PM2] Process launched
┌────────────┬────┬─────────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode    │ pid   │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼─────────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ cluster │ 26420 │ online │ 0       │ 0s     │ 24.363 MB   │ disabled │
│ httpserver │ 1  │ cluster │ 26425 │ online │ 0       │ 0s     │ 24.375 MB   │ disabled │
│ httpserver │ 2  │ cluster │ 26450 │ online │ 0       │ 0s     │ 26.234 MB   │ disabled │
│ httpserver │ 3  │ cluster │ 26475 │ online │ 0       │ 0s     │ 20.773 MB   │ disabled │
└────────────┴────┴─────────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

## instances test 2
If you set instances, but with **folk** exec_mode, pm2 would show a warning message, and a morment later, only one instance works fine, others are in errored status:
```
{
    "script" : "httpserver.js",
    "instances": 4,
    "exec_mode": "fork",
}
```

result:
```
[PM2][WARN] You are starting 4 processes in fork_mode without load balancing. To enable it remove -x option.
[PM2] Process launched
┌────────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ fork │ 29237 │ online │ 0       │ 0s     │ 22.070 MB   │ disabled │
│ httpserver │ 1  │ fork │ 29242 │ online │ 0       │ 0s     │ 24.367 MB   │ disabled │
│ httpserver │ 2  │ fork │ 29249 │ online │ 0       │ 0s     │ 21.859 MB   │ disabled │
│ httpserver │ 3  │ fork │ 29257 │ online │ 0       │ 0s     │ 20.766 MB   │ disabled │
└────────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

Some seconds later, we use `pm2 list` to show all instances status:
```
┌────────────┬────┬──────┬───────┬─────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode │ pid   │ status  │ restart │ uptime │ memory      │ watching │
├────────────┼────┼──────┼───────┼─────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ fork │ 0     │ errored │ 14      │ 0      │ 0 B         │ disabled │
│ httpserver │ 1  │ fork │ 29242 │ online  │ 0       │ 68s    │ 26.406 MB   │ disabled │
│ httpserver │ 2  │ fork │ 0     │ errored │ 14      │ 0      │ 0 B         │ disabled │
│ httpserver │ 3  │ fork │ 0     │ errored │ 14      │ 0      │ 0 B         │ disabled │
└────────────┴────┴──────┴───────┴─────────┴─────────┴────────┴─────────────┴──────────┘
```

## instances test 3
If you set instances 0, pm2 would use CPU cores to repalce it, but you need set cluster exec_mode manually:
```
{
    "script" : "httpserver.js",
    "instances": 0,
    "exec_mode": "cluster",
}
```

result:
```
[PM2] Process launched
┌────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ cluster │ 1786 │ online │ 0       │ 0s     │ 26.355 MB   │ disabled │
│ httpserver │ 1  │ cluster │ 1791 │ online │ 0       │ 0s     │ 26.262 MB   │ disabled │
│ httpserver │ 2  │ cluster │ 1816 │ online │ 0       │ 0s     │ 26.613 MB   │ disabled │
│ httpserver │ 3  │ cluster │ 1841 │ online │ 0       │ 0s     │ 20.781 MB   │ disabled │
└────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

You can get the CPU cores with below command, in my server, the CPU cores is 4:
```
cat /proc/cpuinfo | grep "cpu cores" | head -n1
```

## instances test 4
If you set instances a negative value, means CPU cores - value (e.g -1 on a 4 cores machine will spawn 3 instances), and as the instances isn't zero, then you needn't set set cluster exec_mode manually:
```
{
    "script" : "httpserver.js",
    "instances": -1,
}
```

result:
```
[PM2] Process launched
┌────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ cluster │ 6306 │ online │ 0       │ 0s     │ 26.340 MB   │ disabled │
│ httpserver │ 1  │ cluster │ 6311 │ online │ 0       │ 0s     │ 26.215 MB   │ disabled │
│ httpserver │ 2  │ cluster │ 6336 │ online │ 0       │ 0s     │ 20.441 MB   │ disabled │
└────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
```

## instances test 5
What it would be if you set instances a negative value which absolute value is bigger than CPU cores?
```
{
    "script" : "httpserver.js",
    "instances": -6,
}
```

result:
```
[PM2] Process launched
┌────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name   │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ httpserver │ 0  │ cluster │ 6652 │ online │ 0       │ 0s     │ 20.125 MB   │ disabled │
└────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
```
I don't know how pm2 calc the final instances value, but it's not RECOMMANDED to set a negative value which absolute value is bigger than CPU cores.
