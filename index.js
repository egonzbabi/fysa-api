// server/index.js

const path = require('path')
const express = require("express");

const PORT = process.env.PORT || 3001;

const axios = require('axios');

const { response } = require("express");

var bodyParser = require('body-parser')
const app = express();

//app.use(express.static(path.resolve(__dirname, './client/build')));
//app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static('public'))
app.use(bodyParser.urlencoded({extendeded: true}))
app.use(bodyParser.json())

app.get('/api', (req, res, next) => {
  const oficina = req.query.oficina
  const user = req.query.user
  const password = req.query.password
  const id = req.query.id
  const config = {
    auth:{
      username: user,
      password: password
    },
    headers: { 
      'User-Agent': oficina,
    }
    }
       axios.get(`https://service.formitize.com/api/rest/v2/crm/accounts/invoice/${id}`,config)
      .then((resp) => res.send(resp.data))
      .catch(err => next(err))


})

app.get('/customer', (req, res) => {
  console.log('api cliente')
  const oficina = req.query.oficina
  const user = req.query.user
  const password = req.query.password
  const id= req.query.id
  const config = {
    auth:{
      username: user,
      password: password
    },
    headers: { 
      'User-Agent': oficina,
    }
    }
    try {
       axios.get(`https://service.formitize.com/api/rest/v2/crm/client/${id}`,config)
       .then((resp) => {
        res.send(resp.data)
        
       })
   } catch(err) {
      res.send(data)
      
  }
})

app.post('/invoice', (req, res) => {
        const xml = req.body.body
        const usuarioFirma = req.body.params.usuarioFirma
        const tokenSat = req.body.params.tokenSat
        const llaveInfile = req.body.params.llaveInfile
        const id = req.body.params.id
        const config = {
          headers: { 
            UsuarioFirma: usuarioFirma,
            LlaveFirma: tokenSat,
            UsuarioApi: usuarioFirma,
            LlaveApi: llaveInfile,
            id:id,
            "Content-Type" : "application/xml"
          }
        }
    try {
       axios.post('https://certificador.feel.com.gt/fel/procesounificado/transaccion/v2/xml',xml,config)
       .then((resp) => {
        res.send(resp.data)
       })
       //console.log(res) 
       //res.json(data)
    } catch(err) {
      res.send(data)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;