import fetch from "isomorphic-unfetch";  //used for SSR
import { createUser } from "../../src/utils/storeFirebase";

export const handleKyc = async (formdata) => {
  const { selectIDtype, selectCountryRegion, inputName, selectDate, inputIDnumber } = formdata

  // const data = JSON.stringify({
  //   "id_type": "ID_CARD",
  //   "locale": "zh-HK",
  //   "workflow_id": 200,
  //   "success_url": null,
  //   "error_url": null,
  //   "country": "TWN",
  //   "expected_name": "王又曾",
  //   "expected_birthday": "1990-06-21",
  //   "expected_id_number": "A123456789",
  //   "callback_url": "https://myserver.com/send/callback/here",
  //   "customer_reference": "000000123",
  //   "auto_create_dd_task": true,
  //   "dd_task_callback_url": "https://myserver.com/send/callback/here",
  //   "dd_task_search_setting_id": 120
  // });

  const data = JSON.stringify({
    "id_type": selectIDtype,
    "locale": "en",
    "workflow_id": 200,
    "success_url": process.env.NEXT_PUBLIC_URL,
    "error_url": process.env.NEXT_PUBLIC_URL,
    "country": selectCountryRegion,
    "expected_name": inputName,
    "expected_birthday": selectDate,
    "expected_id_number": inputIDnumber,
    "callback_url": process.env.NEXT_PUBLIC_URL + "/api/callback",
    "customer_reference": "000000123",
    "auto_create_dd_task": false,
    "dd_task_callback_url": process.env.NEXT_PUBLIC_URL + "/api/callback",
  });

  try {
    const resData = await fetch("/api/cors?url=https://external-api.kryptogo.com/idv/init"
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'GOFACT-API-TOKEN': process.env.NEXT_PUBLIC_GOFACT_API_TOKEN,
        },
        body: data
      }
    );

    const resText = await resData.text();
    // await createUser()
    console.log("req body:", data)
    console.log("res:", resText)
    console.log("res:", JSON.parse(resText))
  } catch (error) {
    console.log(error);
  }
};
