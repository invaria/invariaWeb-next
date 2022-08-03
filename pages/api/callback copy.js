const sgMail = require('@sendgrid/mail')
console.log("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")
sgMail.setApiKey("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")
const msg = {
  to: 'bill411493@gmail.com', // Change to your recipient
  from: 'wesliutw@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })