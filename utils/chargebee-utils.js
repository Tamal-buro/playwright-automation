import { debug } from 'console';

const { test, expect, selectors } = require('@playwright/test');

const chargebeeBaseUrl = () => {
    return 'https://condenast-staging-test.chargebee.com';
};
const pass = '';

const authHeader = `Basic ${Buffer.from(`${'test_H8qd4n9r60iiNB5kjDItE2LymaHjYH7Q'}:${pass}`).toString(
    'base64'
)}`;

export default class ChargebeeUtlis {
    deleteChargebeeCustomerData = async (page, customerEmail, request) => {
        debugger
        const getUrl = `${chargebeeBaseUrl()}/api/v2/customers?email[is]=${customerEmail}&limit=1`;
        const getResponse = await request.get(getUrl, {
            headers: {
                Authorization: authHeader,
            },
        });
        expect(getResponse.status).toBe(200);
        const data = await getResponse.json();
        console.log(getResponse)

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
            console.log(`No customer found with email: ${email}`);
        }

        // cy.request({
        //     method: 'GET',
        //     url: `${chargebeeBaseUrl()}/api/v2/customers?email[is]=${customerEmail}&limit=1`,
        //     headers: {
        //         Authorization: authHeader,
        //     },
        //     json: true,
        // }).then((response) => {
        //     expect(response).property('status').to.equal(200);
        //     if (response.body.list.length !== 0) {
        //         const customerId = response.body.list[0].customer.id;
        //         cy.log(`Customer ID: ${customerId}`);
        //         cy.request({
        //             method: 'POST',
        //             url: `${chargebeeBaseUrl()}/api/v2/customers/${customerId}/delete`,
        //             headers: {
        //                 Authorization: authHeader,
        //             },
        //         }).then((response) => {
        //             expect(response).property('status').to.equal(200);
        //         });
        //     }
        // });
    };

    cleanChargebeeTestDtata = (page, email, request) => {
        this.deleteChargebeeCustomerData(email, request);
    };
}

const chargebeeUtlis = new ChargebeeUtlis();