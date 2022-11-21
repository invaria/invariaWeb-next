import { get } from "https";
import { createUser } from "../../src/utils/storeFirebase";
import { getUserByid } from "../../src/utils/storeFirebase";
const sgMail = require('@sendgrid/mail')

export default async function handler(req, res) {
  if (req.method === 'POST' && req.body.idv_task_id !== undefined) {
    try {
      await createUser(req.body.idv_task_id, req.body)

      if (req.body.audit_status !== undefined) {
        const email = await getUserByid(req.body.idv_task_id)
        console.log(email)
        sgMail.setApiKey("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") //invaria2222_kyc_email
        let msg
        if (req.body.audit_status == "Pending") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-c4a4395b54894d87ab1e70fc77a9a407'
          }
        } else if (req.body.audit_status == "Rejected") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-8eb49847b6fc464cab625773f40ec47c'
          }
        } else if (req.body.audit_status == "Accepted") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-0e8a12f004584e8f84b4e719a803f0eb'
          }
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
            res.status(201).json("created")
          })
          .catch((error) => {
            console.error(error)
            res.status(201).json("err")
          })
      }
      // res.status(201).json("created")
    } catch (error) {
      res.status(417).json(error)
    }
  } else if (req.method === 'GET') {
    const email = await getUserByid("11776")
    console.log("email",email)
    sgMail.setApiKey("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") //kyc2
    let msg
    // if (state == "Unverified") {
      msg = {
        to: email,
        from: 'testInvar <info@invar.finance>',
        template_id: 'd-7bada9fb5a804af993d7c2f7150932f0'
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    // }
    res.status(200).json("This is a response for GET. Try to POST.")
  }
}