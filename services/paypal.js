// Import the axios library for making HTTP requests
const axios = require('axios');

// Asynchronous function to generate an access token from PayPal
async function generateAcessToken() {
    
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token', 
        method: 'post', 
        data: 'grant_type=client_credentials',
        auth: {
           
            username: process.env.PAYAPL_CLIENT_ID, 
            password: process.env.PAYPAL_SECRET
        }
    });

    // Return the access token from the response data
    return response.data.acess_token;
}


