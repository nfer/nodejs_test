'use strict';

var redis = require('redis')
var client = redis.createClient();

client.on('connect', function () {
  client.set('expire_test_1', 'Hello World', function (err, result) {
    console.log(new Date().toLocaleTimeString(), 'redis set key result:', result);
  })

  client.expire('expire_test_1', 2, function (err, result) {
    console.log(new Date().toLocaleTimeString(), 'redis expire key result:', result);
  });

  setTimeout(function() {
    client.get('expire_test_1', function (err, result) {
      console.log(new Date().toLocaleTimeString(), 'redis get key result:', result);
    })
  }, 1000);

  setTimeout(function() {
    client.get('expire_test_1', function (err, result) {
      console.log(new Date().toLocaleTimeString(), 'redis get key result:', result);
    })
  }, 3000);
});
