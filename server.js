const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('payment', {paypalClientId:
        "AUxAhiDScxPrpR3vmPDGRBag0DHhZYL8-QebQT-xszupAZhqUKGYEgIP8t5U51d_wu6AquZrlrgJedXy"
    })
})

app.listen(3000)