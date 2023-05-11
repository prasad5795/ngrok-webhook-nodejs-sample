var express = require('express');
const api_helper = require('./API_helper');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

// app.post('/tradingViewAlert', function (req, res) {
//   console.log('req.params', req.params);
//   console.log('req.body', req.body);
//   console.log('req.method', req.method);
//   // https://api.telegram.org/bot5722926850:AAFX2xfA2wJx7M6LqhT7ecZTsV2Nxk36UW4/sendMessage?chat_id=-1001160051994&text=hello
//   // res.json({ message: "Thank you for the message" });
// });

app.all('/*', function (req, res) {
  console.log('-------------- New Request --------------');
  console.log('Headers:' + JSON.stringify(req.url, null, 3));
  console.log(req.params);
  console.log(req.method);
  // console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
  console.log('Body:' + JSON.stringify(req.body, null, 3));
  const body = req.body;
  if(body.Symbol && body.Action){
    api_helper
      .make_API_call(
        `https://api.telegram.org/bot5722926850:AAFX2xfA2wJx7M6LqhT7ecZTsV2Nxk36UW4/sendMessage?chat_id=-1001160051994&text=${body.Symbol}-${body.Action}`
      )
      .then((response) => {
        // res.json(response);
        console.log(
           '============successfully sent the alert to tg============',
          JSON.stringify(req.body, null, 3)
        );
      })
      .catch((error) => {
        console.error(
          '============Failed sent the alert to tg============',
          JSON.stringify(req.body, null, 3)
        );
        // res.send(error);
      });
  }
  // https://api.telegram.org/bot5722926850:AAFX2xfA2wJx7M6LqhT7ecZTsV2Nxk36UW4/sendMessage?chat_id=-1001160051994&text=hello
  res.json({ message: 'Thank you for the message' });
});

app.listen(port, function () {
  console.log(`Example app listening at ${port}`);
});
