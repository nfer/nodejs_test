# Buffer construct function test

## test 1

The Buffer class's constructed function only support number, buffer, array or string, others throw an error:
```
'use strict';

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
'use strict';

var data = '';
var buf = new Buffer(data);
console.log(buf);
```

result:
```
<Buffer >
```

The tranform works, but we get an empty Buffer too. Although it works fine without error, but it's still useless. Thus, before transform a string to Buffer, we need check whether it's empty too.

## test 3

From the office doc, we konw Buffer is a `class`, but how it works if we use it as a `function`?
```
'use strict';

var data = '123';
var buf1 = Buffer(data);
var buf2 = new Buffer(data);
console.log(buf1);
console.log(buf2);
console.log(buf1.compare(buf2));
```

result:
```
<Buffer 31 32 33>
<Buffer 31 32 33>
0
```

According the test result, we konw the Buffer can be a `function`, and works well like as a `class`, but to be safe, we SHOULD use it as a `class`.
