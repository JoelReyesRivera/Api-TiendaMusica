const express = require('express')
const router = express.Router()

module.exports = app => {
    app.use('/api', router)

    //INDEX / DASHBOARD  
    router.get('/', (req, res) => {
      res.send('INDEX API MÚSICA')
    })
}