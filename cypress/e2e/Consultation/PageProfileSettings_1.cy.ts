/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitProfileSettingsPage();
});

describe('Page Profile Settings - Vérifier les informations affichées', () => {
  it('Titre [CQDG-774]', () => {
    cy.get('[class*="Settings_profileSettingsHeader"]').contains('Profile Settings');
  });

  it('Section Identification - Bannière', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('[class*="ant-alert-info"]').contains('You are authenticated with using . This email is never shown to the public and cannot be changed.').should('exist');
  });

  it('Section Identification - Champs', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('Cypress', {force: true});
    cy.get('input[id="last_name"]').clear({force: true}).type('Test', {force: true});
    cy.get('input[id="public_email"]').clear({force: true});
    cy.get('input[id="linkedin"]').clear({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});

    cy.get('label[for="first_name"]').contains('First Name').should('exist');
    cy.get('input[id="first_name"]').should('have.attr', 'value', 'Cypress').should('have.attr', 'placeholder', 'Your First Name');

    cy.get('label[for="last_name"]').contains('Last Name').should('exist');
    cy.get('input[id="last_name"]').should('have.attr', 'value', 'Test').should('have.attr', 'placeholder', 'Your Last Name');
 
    cy.get('label[for="public_email"]').contains('Public Email').should('exist');
    cy.get('label[for="public_email"]').contains('(optional)').should('exist');
    cy.get('input[id="public_email"]').should('have.attr', 'value', '').should('have.attr', 'placeholder', 'email@domain.com');
  
    cy.get('label[for="public_email"] [class*="anticon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('[class="ant-popover-inner"]').contains('This email will be displayed on your profile page and accessible to all logged-in users of the portal.').should('exist');

    cy.get('label[for="linkedin"]').contains('LinkedIn').should('exist');
    cy.get('label[for="linkedin"]').contains('(optional)').should('exist');
    cy.get('input[id="linkedin"]').should('have.attr', 'value', '').should('have.attr', 'placeholder', 'https://www.linkedin.com/in/username');

    cy.get('button[class*="Identification_removeImageButton"]').should('not.exist');
  });

  it('Section Role & Affiliation - Champs', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="bioinformatician_software_developer"]').check({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').uncheck({force: true});
    cy.get('input[id="no_affiliation"]').check({force: true});
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});

    cy.get('label[for="roles"]').contains('I am a').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-group"]').contains('Check all that apply').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(0).contains('Bioinformatician, software developer').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(1).contains('Clinician').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(2).contains('Employee in a governmental agency').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(3).contains('Representative of a commercial or for-profit company').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(4).contains('Researcher in an academic or non-profit institution').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="ant-checkbox-wrapper"]').eq(5).contains('Other').should('exist');

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="bioinformatician_software_developer"]').should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="clinician"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="employee_in_governmental_agency"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="representative_of_commercial_or_for_profit_company"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="researcher_in_academic_or_non_profit_institution"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').should('not.be.checked');

    cy.get('label[title="I am affiliated with"]').contains('I am affiliated with').should('exist');
    cy.get('input[id="affiliation"]').should('not.exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="form_withCustomHelp"]').eq(1).contains('I do not have an institutional affiliation').should('exist');
    cy.get('input[id="no_affiliation"]').should('be.checked');
  });

  it('Section Research Domain - Champs', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="aging"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').uncheck({force: true}).should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});

    cy.get('label[for="research_domain"]').contains('Research domains or domains of interest').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-group"]').contains('Check all that apply').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(0).contains('Aging').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(1).contains('Bioinformatics').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(2).contains('Birth Defects').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(3).contains('Cancer').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(4).contains('Circulatory and Respiratory Health').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(5).contains('General Health').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(6).contains('Infection and Immunity').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(7).contains('Musculoskeletal Health and Arthritis').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(8).contains('Neurodevelopmental Conditions').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(9).contains('Neurosciences, Mental Health and Addiction').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(10).contains('Nutrition, Metabolism and Diabetes').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(11).contains('Population Genomics').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(12).contains('Rare Diseases').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('[class*="ant-checkbox-wrapper"]').eq(13).contains('Other').should('exist');

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="aging"]').should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="bioinformatics"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="birth_defects"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="cancer"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="circulatory_respiratory_health"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="general_health"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="infection_immunity"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="musculoskeletal_health_arthritis"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="neurodevelopmental_conditions"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="neurosciences_mental_health_addiction"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="nutrition_metabolism_diabetes"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="population_genomics"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="rare_diseases"]').should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').should('not.be.checked');

  });

  it('Section Delete Account - Champs', () => {  
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(3).contains('You will no longer be able to sign into the CQDG data portal. All of your saved sets and queries will be lost. You can create a new account at any time.').should('exist');
    cy.get('button[class*="ant-btn-dangerous"]').contains('Delete my account').should('exist');
  });
});
