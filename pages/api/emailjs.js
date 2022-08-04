var email = require('@emailjs/browser');

// var server = email.server.connect({
//   user: 'info@invar.finance',
//   password: 'Aa123456',
//   host: 'mail.invar.finance',
//   ssl: true
// });

// server.send({
//   text: 'Hey howdy',
//   from: 'info@invar.finance',
//   to: 'bill411493@gmail.com',
//   cc: '',
//   subject: 'Greetings'
// }, function (err, message) {
//   console.log(err || message);
// });

var templateParams = {
  name: 'James',
  notes: 'Check this out!'
};

email.send('invaria2222','invaria2222',templateParams,'JMiKVrUe66BqpG2pI')
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });