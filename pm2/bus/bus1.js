var pm2 = require('pm2');

pm2.launchBus(function(err, bus) {
  console.log('connected');

  bus.on('pm2:kill', function() {
    console.log('pm2:kill');
  });
});
