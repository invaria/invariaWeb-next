const sgMail = require('@sendgrid/mail')

console.log("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")
sgMail.setApiKey("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") //kyc2
const msg = {
  // personalizations: [{
    to: 'wesliutw@gmail.com',
    from: 'wesliutw@gmail.com',
    subject: 'Sending with SendGrid is Fun',
  // }],
  template_id:'d-7bada9fb5a804af993d7c2f7150932f0'
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


//   const sgMail = require('@sendgrid/mail')

// console.log("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")
// sgMail.setApiKey("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") //kyc2
// const msg = {
//   to: 'bill411493@gmail.com',
//   from: 'wesliutw@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: `<div style=" width: 100%; background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); --tw-gradient-from: #44334C; --tw-gradient-to: rgb(68 51 76 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); --tw-gradient-to: #1E1722; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding-bottom: 4rem; padding-left: 1rem; padding-right: 1rem"> <img style="margin: 68px; width: 168px; height: 60px;" src="https://i.imgur.com/3wl4wkZ.png" alt="" /> <img style="width: 288px; height: 188px; position: absolute; top: -30px; right: -10px;" src="https://i.imgur.com/6gBfpRA.png" alt="" /> <img style="width: 366px; height: 192px; position: absolute; bottom: -110px; left: -60px;" src="https://i.imgur.com/LFyW2bL.png" alt="" /> <div style="font-weight: 400; --tw-text-opacity: 1; color: rgb(255 255 255 / var(--tw-text-opacity));"> <p style=" font-size: 1rem; line-height: 1.5rem; margin-bottom: 1.5rem">Dear User,</p> <p style=" font-size: 0.875rem; line-height: 1.25rem; margin-bottom: 1.5rem">We have received your identity verification application. The process may take up to 10 workdays. We will notify you when the KYC process is completed. <br /><br /> If you have any questions, please contact us by <a style=" font-weight: 600; --tw-text-opacity: 1;color: rgb(117 46 229 / var(--tw-text-opacity)); " href="mailto:info@invar.finance" target="_blank" rel="noopener noreferrer"> info@invar.finance </a>. <br /><br /> Regards, <br /><br /> InVaria 2222 Team</p> <p style="margin-top: 1.5rem; --tw-text-opacity: 1; color: rgb(180 183 192 / var(--tw-text-opacity)); font-weight: 400;font-size: 0.75rem; line-height: 1rem; padding-bottom: 52px; border-bottom-width: 1px; --tw-border-opacity: 1;border-color: rgb(68 51 76 / var(--tw-border-opacity));">THIS IS AN AUTOMATICALLY GENERATED EMAIL, PLEASE DON &prime;T REPLY.</p> </div> <p style="margin-top: 1.5rem; margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.5rem; font-weight: 600; --tw-text-opacity: 1;color: rgb(227 213 250 / var(--tw-text-opacity)); ">Explore Crypto Desert on Next-Gen</p> <div style="display: flex; margin-bottom: 0.25rem;"> <a href="https://twitter.com/InVarFinance" target="_blank" rel="noopener noreferrer"> <img style="width: 40px; height: 40px; " src="https://i.imgur.com/bQgKnSA.png" alt="" /> </a> <a href="https://discord.gg/BrzPWYut4p" target="_blank" rel="noopener noreferrer"> <img style="background-color: transparent; margin-right: 0.25rem;" src="https://i.imgur.com/PHGLpIT.png" alt="" /> </a> </div></div>`,
// }

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })