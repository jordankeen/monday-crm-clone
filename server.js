// Port for backend to run on
const PORT = 8000

// Instantiate express
const express = require('express')
const app = express()

// prevent blocked requests with cors
const cors = require('cors')
app.use(cors())
app.use(express.json())

// for api key to dotenv file
require('dotenv').config()

// axios to make requests
const axios = require('axios')

// new collection url
// const url = 'https://a1981152-5818-4aac-8ab9-80200a334186-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections'
const url = 'https://a1981152-5818-4aac-8ab9-80200a334186-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks'

const token = 'AstraCS:HhlUoAZPmHYOhavbZBEBFuBg:758ff25e994b024c3fb6f89a99a08fc85bc8d88bbfdb2892f2a2b3cda5f44310'

// get all tickets
app.get('/tickets', async (req, res) => {
   const options = {
      method: 'GET',
      headers: {
         'accept': 'application/json',
         'X-Cassandra-Token': token
      }
   }
   try {
      const response = await axios(`${url}?page-size=20`, options)
      res.status(200).json(response.data)
   } catch (err) {
      console.log(err)
      res.status(500).json({message: err})
   }
})

// post a new ticket
app.post('/tickets', async (req, res) => {
   const formData = req.body.formData

   const options = {
      method: 'POST',
      headers: {
         Accepts: 'application/json',
         'X-Cassandra-Token': token,
         'Content-Type': 'application/json'
      },
      data: formData
   }

   // Axios call to database
   try {
      const response = await axios(url, options)
      res.status(200).json(response.data)
   } catch (err) {
      console.log(err)
      res.status(500).json({message: err})
   }
})

app.listen(PORT, () => console.log('server running on PORT: ' + PORT))


// {
//    "clientId": "HhlUoAZPmHYOhavbZBEBFuBg"
//    "secret": "tilbTFfrA653lQCYw1EI-.RGT2.wr8_sBC82NnsU4M,vzLX+mn,JqqukoNAE-4ZNX5oj81XwIBo+Pav2RSimZDhfsrowrSesKGIXtCk2yf5nLwL_ZJnadTrY2ftKDjj7"
//    "token": "AstraCS:HhlUoAZPmHYOhavbZBEBFuBg:758ff25e994b024c3fb6f89a99a08fc85bc8d88bbfdb2892f2a2b3cda5f44310"
//  }