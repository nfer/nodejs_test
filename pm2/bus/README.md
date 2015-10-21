# pm2 bus system test

In [pm2 doc PROGRAMMATIC.md](https://github.com/Unitech/PM2/blob/master/doc/PROGRAMMATIC.md) version 2820e59, there has below description about subscribable events:
> ### Subscribable events
>
> - process:exception
> - log:err
> - log:out
> - pm2:kill
>
> - process:event
>     - restart
>     - delete
>     - stop
>     - restart overlimit
>     - exit
>     - start
>     - online

There are five major categories about the event, and only for process:event has sub-categories.

## bus system test 1

In this test, we want to know:
- when the `pm2.launchBus()` callback?
- when the 'pm2:kill' event callback?

the pm2 bus system code are as below:
```
var pm2 = require('pm2');

pm2.launchBus(function(err, bus) {
  console.log('connected');

  bus.on('pm2:kill', function() {
    console.log('pm2:kill');
  });
});

```

while the pm2 commands are as below:
```
$ node node_modules/pm2/bin/pm2 list
$ node node_modules/pm2/bin/pm2 kill
$ node node_modules/pm2/bin/pm2 list
$ node node_modules/pm2/bin/pm2 kill
```
the pm2 bus system outputs are:
```
$ node bus/bus1.js
connected
pm2:kill
pm2:kill
```

From the result, we can get some conclusions:
1. if the pm2 doesn't started when `pm2.launchBus()`, nothing would callback, just wait
2. after pm2 is started by `list` command, `pm2.launchBus()` callback comes
3. only the first time pm2 started cause `pm2.launchBus()`, then `pm2.launchBus()` works constantly
4. but for every time pm2 is killed, 'pm2:kill' event comes

