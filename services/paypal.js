const axios = require('axios')

async function generateAcessToken() {
    const respponse = await axois ({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYAPL_CLIENT_ID,
            password:  process.env.PAYPAL_SECRET
        }
    })
    
}