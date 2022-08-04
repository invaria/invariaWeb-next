const sgMail = require('@sendgrid/mail')
console.log("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")
sgMail.setApiKey("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") //kyc2
const msg = {
  to: 'bill411493@gmail.com',
  from: 'wesliutw@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '{{{<strong>and easy to do anywhere, even with Node.js yoyytotoototo</strong>}}}',
}


sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
