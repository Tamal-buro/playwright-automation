const { test, expect, selectors } = require('@playwright/test');

const chargebeeBaseUrl = () => {
    return 'https://condenast-staging-test.chargebee.com';
};
const pass = '';
const chargebeeToken = process.env.CHARGEBEE_SECRET_KEY_STAG;

const authHeader = `Basic ${Buffer.from(`${chargebeeToken}:${pass}`).toString(
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