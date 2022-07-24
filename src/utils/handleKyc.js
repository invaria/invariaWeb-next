import axios from 'axios'

export const handleKyc = async (formdata) => {
  const { selectIDtype, selectCountryRegion, inputName, selectDate, inputIDnumber } = formdata

  // var data = JSON.stringify(formdata)

  var data = JSON.stringify({
    "id_type": selectIDtype,
    "locale": "zh-HK",
    "workflow_id": 200,
    "success_url": null,
    "error_url": null,
    "country": "TWN",
    "expected_name": "王又曾",
    "expected_birthday": "1990-06-21",
    "expected_id_number": "A123456789",
    "callback_url": "https://myserver.com/send/callback/here",
    "customer_reference": "000000123",
    "auto_create_dd_task": true,
    "dd_task_callback_url": "https://myserver.com/send/callback/here",
    "dd_task_search_setting_id": 120
  });


  var config = {
    method: 'post',
    url: 'https://external-api.kryptogo.com/idv/init',
    headers: {
      'GOFACT-API-TOKEN': '7a691e9e-372d-440e-b4be-50beeb0cf5b3',
      'Content-Type': 'application/json'
    },
    data: data
  };

  // axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}