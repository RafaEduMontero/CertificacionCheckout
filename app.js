const express = require('express');
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars');
const port = process.env.PORT || 3000;

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//SDK MP
const mercadopago = require ('mercadopago');
const checkout = require('./controllers/checkout');
const webHook = require('./controllers/webHook');

//Credenciales
const PROD_ACCESS_TOKEN = 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN,
    integratot_id: 'dev_24c65fb163bf11ea96500242ac130004'
  });
  
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.post('/checkout', checkout);

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    console.log(req.query)
    res.render('detail', req.query);
});

app.get('/pagosuccess',(req,res) =>{
  const url = req.url;
  const params = new URLSearchParams(url);
  const paymentId = params.get('payment_id')
  const externalRef = params.get('external_reference');
  const paymetType = params.get('payment_type')
  res.send(`<h1>Metodo de pago: ${paymetType} ID de Pago: ${paymentId} Referencia Externa: ${externalRef}</h1>`)
});

app.get('/pagofailure',(req,res) =>{
  res.send('<h1>Fallo el Pago</h1>')
});

app.get('/pagopending',(req,res) =>{
  res.send('<h1>Pendiente de Pago</h1>')
});

app.post('/notifications',(req,res)=>{
  if (req.method === "POST") { 
    let body = ""; 
    req.on("data", chunk => {  
      body += chunk.toString();
    });
    req.on("end", () => {  
      console.log(body, "webhook response"); 
      res.end("ok");
    });
  }
  res.status(200).end();
})

app.listen(port);