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
                username: process.env.PAYPAL_CLIENT_ID, 
                password: process.env.PAYPAL_SECRET 
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Required content type for PayPal's token endpoint
            }
        });

        // Return the access token from the response data
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating access token:', error.response ? error.response.data : error.message);
        throw new Error('Could not generate access token');
    }
}

exports.createOrder = async () => {
    try {
        const accessToken = await generateAccessToken(); // Generate the access token

        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON for the order creation
                'Authorization': `Bearer ${accessToken}` 
            },
            data: JSON.stringify({
                intent: 'CAPTURE', // Order intent set to capture payment immediately
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
                    return_url: process.env.BASE_URL + '/complete-order', // URL to redirect after order approval
                    cancel_url: process.env.BASE_URL + '/cancel-order', // URL to redirect if the order is canceled
                    user_action: 'PAY_NOW',
                    brand_name: "Ieuan Garrish Store"
                }
            })
        });

        // Return the approval link from the response data
        return response.data.links.find(link => link.rel === 'approve').href;
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        throw new Error('Could not create order');
    }
}

exports.capturePayment = async (orderId) =>{
    const accessToken = await generateAccessToken()

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON for the order creation
            'Authorization': `Bearer ${accessToken}` 
        },
    })
    return response.data
}