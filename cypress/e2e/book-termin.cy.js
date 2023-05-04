const TG_API_KEY = Cypress.env('TG_API_KEY');
// AAF4z-kXzwI038OU1MwLElCC4FjgrIhdGtk

function sendMessage(text) {
  cy.request({
    method: 'GET',
    url: `https://api.telegram.org/bot5824526462:${TG_API_KEY}/sendMessage`,
    qs: {
      chat_id: '@termins_in_burgetamt',
      text
    }
  });
}

it('should find termin', () => {
  cy.visit('https://service.berlin.de/dienstleistung/327537/');

  cy.contains('a', 'Prenzlauer')
    .invoke('css', 'color', 'green')
    .closest('.row')
    .find('.span2 a')
    .invoke('css', 'color', 'red')
    .wait(2000)
    .as('linkToBooking')
    .click();

  cy.get('.calendar-table > :nth-child(3) .calendar-month-table td')
    .should('have.length.greaterThan', 0)
    .each(td => {
      const dayNumber = parseInt(td.text());
      // for testing
      /*if (dayNumber == 1) {
        td.append('<a>test</a>');
      }*/
      const foundSlots = td.find('a').length;
      if (foundSlots > 0) {
        cy.get('@linkToBooking')
          .invoke('attr', 'href')
          .then(href => {
            const message = `Found slot in ${dayNumber}! Press the link ${href}`;
            cy.log(message);
            sendMessage(message);
          });
      }
    });

});