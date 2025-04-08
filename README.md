# Cypress Automation Testing for Donation Flow

## Introduction

In this project, I used **Cypress** to automate the donation flow of a web application. The goal was to test the end-to-end donation process including the donation selection, user details input, and payment using Stripe's iframe. The objective was to ensure that the donation process works smoothly, the user interface responds well, and the success message is displayed after a successful donation.

## Steps to Set Up Cypress Project

Follow these steps to set up and run a Cypress project:

1. **Install Node.js**:
   - Make sure you have **Node.js** installed. You can check this by running:
     ```
     node -v
     npm -v
     ```
   - If it's not installed, download it from [Node.js official website](https://nodejs.org/).

2. **Install Cypress**:
   - Install Cypress globally or locally using npm:
     ```
     npm install cypress --save-dev
     ```

3. **Open Cypress**:
   - After installing, you can open Cypress by running:
     ```
     npx cypress open
     ```

4. **Create Cypress Test Files**:
   - Create test files under the **cypress/integration/** folder. 
   - Example test file: `donation_flow.spec.js`.

5. **Run Cypress Tests**:
   - Run the tests from the command line:
     ```
     npx cypress run
     ```

6. **Add Required Plugins**:
   - **cypress-iframe** plugin is used to interact with iframes.
   - Install it using npm:
     ```
     npm install cypress-iframe --save-dev
     ```

7. **Configuration**:
   - Configure Cypress settings such as baseUrl, retries, and timeouts by editing the **cypress.json** file.

## Challenges Faced During the Project

1. **Handling Iframes**:
   - One of the biggest challenges was interacting with **iframes** from a different origin (Stripe iframe). Cypress typically cannot interact with iframes from a different origin directly due to cross-origin restrictions. 
   - To solve this, I used the **`cy.origin()`** method to allow Cypress to interact with elements from a different origin (Stripe iframe). This was crucial for automating the payment part of the donation.

2. **Dynamic URLs**:
   - The **Stripe iframe URL** was dynamic, meaning it changes with each session, making it hard to locate. I used the iframe’s **`src`** attribute to extract the full URL dynamically and handle interactions correctly.
   
3. **Timeouts and Waits**:
   - Cypress tests rely on elements being available before interacting with them. I had to carefully manage **timeouts** to ensure that the page and elements were loaded properly before Cypress tried to interact with them. Static waits were avoided in favor of dynamic waits using **`cy.get()`** with proper timeouts to handle loading times.

4. **Handling External Elements**:
   - External elements such as the **Stripe payment iframe** required handling complex scenarios with multiple interactions and verification. This added complexity to the tests and required careful handling of timeouts and retries to ensure the iframe was fully loaded before interaction.

## Business Outcome of Automation Testing

1. **Improved Accuracy**:
   - Automation reduces the risk of human errors, ensuring that the tests are consistent and reliable across different test runs.

2. **Faster Testing**:
   - Manual testing of donation flows could take hours, especially when dealing with external elements such as payment gateways. With automated tests, this process can be completed in minutes, allowing for faster iterations and quicker releases.

3. **Regression Testing**:
   - Automation allows for regression tests to be run easily whenever there is a new update to the application. This ensures that the donation process continues to work smoothly with every release.

4. **Increased Efficiency**:
   - By automating repetitive tasks like filling out forms and verifying success messages, teams can focus on higher-value tasks, such as analyzing results or developing new features.

5. **Scalability**:
   - With the ability to easily add more tests to the automation suite, the project can be scaled as new donation flows or forms are introduced, ensuring continuous test coverage.

6. **Customer Confidence**:
   - Ensuring that the donation process is thoroughly tested through automation improves the reliability and trustworthiness of the platform, increasing customer confidence in making donations online.

## Conclusion

By automating the donation process using Cypress, I was able to ensure that the application is stable and functions as expected. I encountered challenges mainly with iframe handling, dynamic URLs, and managing timeouts, but with solutions like **`cy.origin()`** and proper time management, I was able to successfully automate the process.

In the end, the automation testing provided me with faster feedback, greater efficiency, and more reliable results. It ensures that the donation system is thoroughly tested for every release, which is critical for maintaining a seamless user experience and ultimately driving the business goal of facilitating donations.

