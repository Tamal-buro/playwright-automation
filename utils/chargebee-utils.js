const { test, expect, selectors } = require('@playwright/test');

const chargebeeBaseUrl = () => {
    // Currently runs for stag, need to make it dynamic for prod and stag
    return 'https://condenast-staging-test.chargebee.com';
};
const pass = '';
const chargebeeToken = process.env.CHARGEBEE_SECRET_KEY_STAG;

const authHeader = `Basic ${Buffer.from(`test_H8qd4n9r60iiNB5kjDItE2LymaHjYH7Q:${pass}`).toString(
    'base64'
)}`;

export default class ChargebeeUtlis {
    deleteChargebeeCustomerData = async (customerEmail) => {
        const getUrl = `${chargebeeBaseUrl()}/api/v2/customers?email[is]=${customerEmail}&limit=1`;
        const getResponse = await fetch(getUrl, {
            method: 'GET',
            headers: {
                Authorization: authHeader,
            },
        });
        expect(getResponse.status).toBe(200);
        const data = await getResponse.json();
        console.log('Response: ', getResponse);

        if (data.list.length > 0) {
            const customerId = data.list[0].customer.id;
            console.log(`Customer ID: ${customerId}`);

            const deleteUrl = `${chargebeeBaseUrl()}/api/v2/customers/${customerId}/delete`;
            const deleteResponse = await fetch(deleteUrl, {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                },
            });
            expect(deleteResponse.status).toBe(200);
        } else {
            console.log(`No customer found with email: ${customerEmail}`);
        }
    };
}

const chargebeeUtlis = new ChargebeeUtlis();