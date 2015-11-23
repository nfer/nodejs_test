# Buffer construct function test

## test 1

The Buffer class's constructed function only support number, buffer, array or string, others throw an error:
```
var data;
var buf = new Buffer(data);
console.log(buf);
```

result:
```
buffer.js:120
    throw new TypeError('must start with number, buffer, array or string');
```

This test tells us, if you want to transform a string variable to Buffer, you must check whether the string is undefined or not.

## test 2

From last test, we know transform undefined to Buffer would throw a TypeError, but how it works with an empty string:
```
var data = '';
var buf = new Buffer(data);
console.log(buf);
```

result:
```
<Buffer >
```

The tranform works, but we get an empty Buffer too. Although it works fine without error, but it's still useless. Thus, before transform a string to Buffer, we need check whether it's empty too.
