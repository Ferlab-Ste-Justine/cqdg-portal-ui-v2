/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitProfileSettingsPage();
});

describe('Page Profile Settings - Valider les liens disponibles', () => {
  it('Lien du bouton View profile', () => {
    cy.get('[class*="ProfileSettings_profileSettingsHeader"] button').clickAndWait({force: true}); // data-cy="ViewProfileButton"
    cy.get('[data-cy="AvatarHeader"]').should('exist');
  });

  it('Bouton Discard changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="last_name"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="public_email"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('input[id="linkedin"]').clear({force: true}).type('Discard', {force: true}).should('have.attr', 'value', 'Discard');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-text"]').clickAndWait({force: true});
    
    cy.get('input[id="first_name"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="last_name"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="linkedin"]').should('not.have.attr', 'value', 'Discard');
    cy.get('input[id="public_email"]').should('not.have.attr', 'value', 'Discard');
  });

  it('Checkbox No Affiliation de la section Role & Affiliation', () => {
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');

    cy.get('input[id="affiliation"]').should('exist');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('[class*="form_withCustomHelp"]').eq(1).contains('Provide institutional or organizational affiliation').should('exist');
  });

  it('Bouton Discard changes de la section Role & Affiliation', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="bioinformatician_software_developer"]').uncheck({force: true}).should('not.be.checked');
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-text"]').clickAndWait({force: true});
    
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="bioinformatician_software_developer"]').should('be.checked');
    cy.get('input[id="no_affiliation"]').should('be.checked');
  });

  it('Bouton Discard changes de la section Research Domain', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-text"]').clickAndWait({force: true});

    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').should('not.be.checked');
  });

  it('Bouton Delete my account de la section Delete Account', () => {
    cy.get('button[class*="ant-btn-dangerous"]').clickAndWait({force: true});
    
    cy.get('[class="ant-modal-content"]').contains('Delete Account').should('exist');
    cy.get('[class="ant-modal-content"]').contains('Are you sure you want to permanently delete this account?').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-content"] button[class*="ant-btn-primary ant-btn-dangerous"]').contains('Delete').should('exist');

    cy.get('[class="ant-modal-content"] button[class*="ant-btn-default"]').clickAndWait({force: true});
    cy.get('[class="ant-modal-content"]').should('not.exist');
  });

  it('Bouton Save changes de la section Identification', () => {
    cy.get('input[id="first_name"]').clear({force: true}).type('FirstNameEdit', {force: true}).should('have.attr', 'value', 'FirstNameEdit');
    cy.get('input[id="last_name"]').clear({force: true}).type('LastNameEdit', {force: true}).should('have.attr', 'value', 'LastNameEdit');
    cy.get('input[id="public_email"]').clear({force: true}).type('email@edit.com', {force: true}).should('have.attr', 'value', 'email@edit.com');
    cy.get('input[id="linkedin"]').clear({force: true}).type('https://www.linkedin.com/in/edit/', {force: true}).should('have.attr', 'value', 'https://www.linkedin.com/in/edit/');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(0).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
    cy.visitProfileViewPage();
    
    cy.get('body').contains('FirstNameEdit').should('exist');
    cy.get('body').contains('LastNameEdit').should('exist');
    cy.get('[href="mailto:email@edit.com"]').should('exist');
    cy.get('[href="https://www.linkedin.com/in/edit/"]').should('exist');
  });

  it('Bouton Save changes de la section Role & Affiliation', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('input[id="no_affiliation"]').uncheck({force: true}).should('not.be.checked');
    cy.get('input[id="affiliation"]').clear({force: true}).type('AffiliationEdit', {force: true}).should('have.attr', 'value', 'AffiliationEdit');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(1).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
    cy.visitProfileViewPage();
    
    cy.get('body').contains('AffiliationEdit').should('exist');
  });

  it('Bouton Save changes de la section Research Domain', () => {
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="aging"]').uncheck({force: true}).should('not.be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('input[value="other"]').check({force: true}).should('be.checked');
    cy.get('[class*="Gridcard_fuiCardWrapper"]').eq(2).find('button[class*="ant-btn-primary"]').clickAndWait({force: true});
    cy.visitProfileViewPage();

    cy.get('body').contains('Aging').should('not.exist');
    cy.get('body').contains('Other').should('exist');
  });
});
