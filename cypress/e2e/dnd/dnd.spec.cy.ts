import getIngredients from "../../fixtures/constructor.fixture";

describe('Проверка функции переноса ингредиента.', () => {

    beforeEach(() => {
        getIngredients();
        cy.visit('http://localhost:3000');
    });

    it('Ингредиент можно перетащить в конструктор, и он добавится в него.', () => {
        cy.wait('@ingredients');
        cy.contains('Ингредиент 1').as('item');

        cy.get('#burger-constructor').as('constructor');

        const dataTransfer = new DataTransfer();
        cy.get('@item').trigger('dragstart', {dataTransfer});

        cy.get('@constructor').trigger('drop').trigger('dragend');
        expect(cy.get('@constructor').contains('Ингредиент 1'));
    });

    it('В конструкторе есть надпись "Выберите булочку пожалуйста :-)", когда булка добавлена, надпись исчезает.', () => {
        cy.wait('@ingredients');
        cy.get('#burger-constructor').as('constructor');

        expect(cy.get('@constructor').contains('Выберите булочку пожалуйста :-)'));

        cy.contains('Ингредиент 1').as('item');

        const dataTransfer = new DataTransfer();
        cy.get('@item').trigger('dragstart', {dataTransfer});

        cy.get('@constructor').trigger('drop').trigger('dragend');
        expect(cy.get('@constructor').contains('Ингредиент 1'));

        cy.contains('Выберите булочку пожалуйста :-)').should('not.exist');
    });

})