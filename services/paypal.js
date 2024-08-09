// Import the axios library for making HTTP requests
const axios = require('axios');

// Asynchronous function to generate an access token from PayPal
async function generateAccessToken() {
    try {
        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
            method: 'post',
            data: 'grant_type=client_credentials',
            auth: {
                username: process.env.PAYPAL_CLIENT_ID, // Corrected the typo here
                password: process.env.PAYPAL_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Return the access token from the response data
        return response.data.access_token; // Corrected the typo here
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
        throw new Error('Could not generate access token');
    }
}

exports.createOrder = async () => {
    try {
        const accessToken = await generateAccessToken();

        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: [
                            {
                                name: "Brighton Seagulls",
                                description: "football poster",
                                quantity: 1,
                                unit_amount: {
                                    currency_code: 'GBP',
                                    value: '10'
                                }
                            }
                        ],
                        amount: {
                            currency_code: 'GBP',
                            value: '10',
                            breakdown: {
                                item_total: {
                                    currency_code: 'GBP',
                                    value: '10'
                                }
                            }
                        }
                    }
                ],
                application_context: {
                    return_url: process.env.BASE_URL + '/complete-order',
                    cancel_url: process.env.BASE_URL + '/cancel-order',
                    user_action: 'PAY_NOW',
                    brand_name: "Ieuan Garrish Store"
                }
            })
        });

        console.log(response.data); // Corrected the console log to actually output the response data
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
};

// Invoke the createOrder function to test
exports.createOrder();
