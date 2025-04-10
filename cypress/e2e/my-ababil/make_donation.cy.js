import 'cypress-iframe';

describe('Donation Flow', () => {

  before(() => {
    // Visit the donation page once before running all tests
    cy.visit('https://tooba-web.myababil.com/f/donation-by-levels');
  });

  it('should complete the donation process', () => {

    // Step 1: Select a donation amount and proceed to personal details
    cy.contains('.MuiCardContent-root', '$100Construction of new school', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.contains('.MuiButtonBase-root', 'Proceed Next', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Step 2: Fill out personal details (first name, last name, phone number, etc.)
    cy.get('input[placeholder="First name"]', { timeout: 10000 })
      .clear()
      .type('Foysal');

    cy.get('input[placeholder="Last name"]', { timeout: 10000 })
      .clear()
      .type('Ahmed');

    cy.get('input[type="tel"]', { timeout: 10000 })
      .clear()
      .type('4474756565', { delay: 100 });

    cy.get('#react-select-2-input', { timeout: 10000 })
      .clear()
      .type('test')
      .should('be.visible');
    cy.wait(3000)
    
    cy.get('#react-select-2-input', { timeout: 10000 })
      .type('{downarrow}')
      .type('{enter}');

    cy.contains('.MuiButtonBase-root', 'Proceed Next', { timeout: 10000 })
      .should('be.visible')
      .click();

    // Step 3: Enter payment details in the iframe
    // Ensure the payment iframe is visible and ready to interact with
    cy.get('iframe[title="Secure payment input frame"]', { timeout: 10000 })
      .should('be.visible')
      .then(($iframe) => {
        const fullSrc = $iframe.prop('src');
        console.log('Full Iframe URL:', fullSrc);

        const stripeOrigin = new URL(fullSrc).origin;
        console.log('Stripe Origin:', stripeOrigin);

        // Switch to the Stripe iframe origin and fill out the payment details
        cy.origin(stripeOrigin, () => {
          // Fill in card number
          cy.get('input[name="number"]', { timeout: 10000 })
            .should('be.visible')
            .type('4242424242424242', { delay: 100 });

          // Fill in expiration date
          cy.get('input[name="expiry"]', { timeout: 10000 })
            .should('be.visible')
            .type('0327', { delay: 100 });

          // Fill in CVC
          cy.get('input[name="cvc"]', { timeout: 10000 })
            .should('be.visible')
            .type('0327', { delay: 100 });

          // Fill in full name on the card
          cy.get('input[placeholder="Full name on card"]', { timeout: 10000 })
            .should('be.visible')
            .type('Test Card Details Visa');
        
          // Select address (if needed)
          cy.get('#react-select-3-input', { timeout: 10000 })
            .clear()
            .type('test')
            .should('be.visible');
        
          cy.get('#react-select-3-input', { timeout: 10000 })
            .type('{downarrow}')
            .type('{enter}');

          // Click on the Pay button
          cy.contains('.MuiButtonBase-root', 'Pay $100.00', { timeout: 10000 })
            .should('be.visible')
            .click();
        });
      });

    // Step 4: Validate the success message after payment
    cy.get('h4', { timeout: 10000 })
      .contains('Donation successful!', { timeout: 10000 })
      .should('be.visible');
  });

});
