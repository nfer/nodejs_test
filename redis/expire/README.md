# redis expire test

## expire test 1

Nodjs Redis support redis expire command, then we can use below code to change key expire time with second time unit:
```
  client.expire('expire_test_1', 2, function (err, reply) {
    console.log(new Date().toLocaleTimeString(), 'redis expire key', reply);
  });
```

we run expire1.js, get below result:
```
$ node redis/expire/expire1.js 
15:35:54 redis set key result: OK
15:35:54 redis expire key result: 1
15:35:55 redis get key result: Hello World
15:35:57 redis get key result: null
```

From the test output, we ensure the expire command works.
