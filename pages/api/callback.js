import { get } from "https";
import { createUser } from "../../src/utils/storeFirebase";
import { getUserByid } from "../../src/utils/storeFirebase";
const sgMail = require('@sendgrid/mail')

export default async function handler(req, res) {
  if (req.method === 'POST' || req.body.idv_task_id !== undefined) {
    try {
      await createUser(req.body.idv_task_id, req.body)

      if (req.body.audit_status !== undefined) {
        const email = await getUserByid(req.body.idv_task_id)
        console.log(email)
        sgMail.setApiKey("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") //kyc2
        let msg
        if (req.body.audit_status == "Pending") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-7bada9fb5a804af993d7c2f7150932f0'
          }
        } else if (req.body.audit_status == "Rejected") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-cb3a43b619a1492b90545c65f484d073'
          }
        } else if (req.body.audit_status == "Accepted") {
          msg = {
            to: email,
            from: 'InVaria <info@invar.finance>',
            template_id: 'd-5208eb31194a4002ae8d3a578eaacc7d'
          }
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
      }
      res.status(201).json("created")
    } catch (error) {
      res.status(417).json(error)
    }
  } else if (req.method === 'GET') {
    const email = await getUserByid('11776')
    console.log(email)
    sgMail.setApiKey("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") //kyc2
    let msg
    // if (state == "Unverified") {
      msg = {
        to: email,
        from: 'Invaria <info@invar.finance>',
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