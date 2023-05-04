const TG_API_KEY = Cypress.env('TG_API_KEY');

function sendMessageToTelegram(text) {
  cy.request({
    method: 'GET',
    url: `https://api.telegram.org/bot5824526462:${TG_API_KEY}/sendMessage`,
    qs: {
      chat_id: '@termins_in_burgetamt',
      text
    }
  });
}

function findSlots() {
  cy.get('.calendar-table > :nth-child(3) table')
    .should('have.length', 2)
    .find('td')
    //.invoke('css', 'background', 'red')
    .each(day => {
      const dayNumber = parseInt(day.text());
      // only for debug
      /*if (dayNumber == 1) {
        day.append('<a></a>')
      }*/
      const slots = day.find('a').length;
      if (slots > 0) {
        cy.log('found slot ', dayNumber);
        cy.get('@linkToBooking')
          .invoke('attr', 'href')
          .then(href => {
            sendMessageToTelegram(`Found slot ${dayNumber}!\nPress link ${href}`);
          });
      }
    });

    cy.wait(2000);
}

const OFFICES = ['Prenzlauer', 'Pankow', 'Wedding', 'Rathaus Mitte'];

describe('Book termin', () => {

  for (const office of OFFICES) {
    it(`should find slots in ${office}`, () => {

      cy.visit('/dienstleistung/327537/');

      cy.contains('a', office)
        .invoke('css', 'color', 'green')
        .closest('.row')
        .find('.span2 a')
        .invoke('css', 'color', 'red')
        .wait(2000)
        .as('linkToBooking')
        .click();

      findSlots();
    });
  }

});

