/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Logout', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Vérifier les informations affichées', () => {
    cy.logout();

    cy.get('[class*="TopBanner_title"]').contains(/(Portail de données|Data Portal)/).should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [id="study"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_dots"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"] [src*="/static/media/cartagene."]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('DEE').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('BACQ').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('PRAGMatIQ').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_title"]').contains('NeuroDev').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-head"]').contains(/(Données CQDG|Release)/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).find('[id="study"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).find('[id="participant"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).find('[id="biospecimen"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).find('[id="file"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).find('[id="gene"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).find('[id="exomes"]').should('exist');
    cy.get('[class*="Rare_container"] [src*="/static/media/RARE."]').should('exist');
    cy.get('[class*="SecureData_container"] [src*="data:image/png"]').should('exist');
    cy.get('[class*="VariantCard_container"] [id="gene"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[id="information"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[id="cloud-database"]').should('exist');
    cy.get('[src*="/static/media/logos-genome_qc."]').should('exist');
    cy.get('[src*="/static/media/logos-chusj-color."]').should('exist');
    cy.get('[src*="/static/media/logos-FRQS-color."]').should('exist');
    cy.get('[src*="/static/media/logos-FCI-color."]').should('exist');
    cy.get('[src*="/static/media/logos-ferlab-color."]').should('exist');
  });
});
