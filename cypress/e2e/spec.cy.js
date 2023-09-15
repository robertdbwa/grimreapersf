import dayjs from 'dayjs';

describe('template spec', () => {
    const date = dayjs().format('YYYY-MM-DD');
    let output = [];

    it('Collects text from elements and writes to JSON', () => {
        let name;
        let data = [];
        const json = require('./../../people.json');
        const links = json.filter(item => item.link).map(item => item.link);

        for (let link of links) {
            cy.clearAllCookies();
            cy.clearAllLocalStorage();
            cy.clearAllSessionStorage();
            cy.visit(`https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=${link}`, {timeout: 25000});
            cy.get('#onetrust-group-container', {timeout: 15000}).then(($container) => {
                if ($container.is(':visible')) {
                    cy.get('#onetrust-accept-btn-handler', {timeout: 19000}).click({force: true});
                }
            });
            cy.get('#cert-site').should('exist').and('be.visible');
            cy.get('.slds-size--1-of-2').then(($el) => {
                cy.log($el.text());
                name = $el.text();
            });
            cy.get('.slds-col').each(($el) => {
                cy.log($el.text());
                data.push($el.text());
            }).then(() => {
                output.push({ name: name, certs: data });
                name = '';
                data = [];
            });
        }
    });

    after(() => {
        cy.writeFile(`${date}_salesforce_certs_Craftware.json`, output);
        let certCount = {};
        cy.readFile(`${date}_salesforce_certs_Craftware.json`).then((json) => {
            for (let person of json) {
                for (let cert of person.certs) {
                    certCount[cert] = certCount[cert] ? certCount[cert] + 1 : 1;
                }
            }
        }).then(() => {
            cy.writeFile(`${date}_salesforce_certsCount_Craftware.json`, certCount);
        });
    });
});
