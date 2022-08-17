import getIngredients from '../../fixtures/constructor.fixture';

const addIngredientsInOrder = () => {
    const dataTransfer = new DataTransfer();
    cy.contains('Ингредиент 1').as('itemBun');
    cy.get('@itemBun').trigger('dragstart', {dataTransfer});
    cy.get('@constructor').trigger('drop').trigger('dragend');

    cy.contains('Ингредиент 8').as('itemMain');
    cy.get('@itemMain').trigger('dragstart', {dataTransfer});
    cy.get('@constructor').trigger('drop').trigger('dragend');
};

describe('На главной странице можно офрмить заказ', () => {
    beforeEach(() => {
        getIngredients();
        cy.visit('http://localhost:3000');
    });

    it('Когда неавторизованный пользователь нажимает "оформить заказ",' +
        ' происходит редирект на страницу авторизации.', () => {
        cy.wait('@ingredients');
        cy.get('#burger-constructor').as('constructor');

        addIngredientsInOrder();

        cy.get('button').contains('Оформить заказ').click();
        cy.url().should('include', 'login');
    });

    describe('Оформление заказа (только авторизованный польователь.)', () => {
        beforeEach(() => {
            window.localStorage.setItem(
                "refreshToken",
                JSON.stringify("test-refreshToken")
            );
            cy.setCookie('accessToken', 'test-accessToken')
            cy.viewport(1300, 800);
            cy.intercept('POST', '/api/auth/token', {fixture: 'refresh-token.json'}).as('refresh');
            cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'}).as('auth');
            cy.intercept('POST', '**/api/orders', {fixture: 'order.json'}).as('order');
            cy.visit("http://localhost:3000");
        });

        afterEach(() => {
            cy.clearLocalStorage();
            cy.clearCookies();
        });

        it('Когда пользователь авторизован и нажимает "оформить заказ", заказ оформляется и открыввается модальное окно', () => {
            cy.get('#burger-constructor').as('constructor');

            addIngredientsInOrder();

            cy.get('button').contains('Оформить заказ').click();
            cy.url().should('not.include', 'login');
            cy.get('#modal').should('contain', '123456');
            cy.get('#modal').should('contain', 'идентификатор заказа');
        });
    });
});