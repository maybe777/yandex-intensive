import getIngredients from '../../fixtures/constructor.fixture';

describe('Страница конструктора.', () => {
    it('Страница доступна по адресу baseUrl', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Соберите бургер');
    });

    describe('Ингредиенты корректно отображаются на странице.', () => {
        beforeEach(() => {
            getIngredients();
            //Что-то посетить все-таки надо...
            cy.visit('http://localhost:3000');
        });

        //Мокаем обращение к API так как нам интересно проверить логику работы приложения, а не взаимодействие с API
        it('Ингредиент корректно отображается.', () => {
            //Данные получаем из файла в директории fixtures
            cy.wait('@ingredients');
            cy.contains('Ингредиент 1');
        });
    });

    describe('Отображение информации, об отсутствии ингредиентов.', () => {
        beforeEach(() => {
            cy.intercept('GET', 'api/ingredients', {fixture: 'empty-ingredients.json'}).as(
                'ingredients'
            );
            cy.visit('http://localhost:3000');
        });

        it('Должна появиться надпись Пусто, когда ингредиенты не загрузились.', () => {
            cy.wait('@ingredients');
            cy.contains('Пусто');
        });
    });

    describe('Детали ингредиента', () => {
        beforeEach(() => {
            getIngredients();
            cy.visit('http://localhost:3000');
        });

        it('При клике на ингредиент открывается модальное окно.', () => {
            cy.wait('@ingredients');
            cy.contains('Ингредиент 1').click();
            cy.get('#modal').should('contain', 'Детали ингредиента');
            cy.get('#modal').should('contain', 'Ингредиент 1');
        });

        it('Модальное окно содержит информацию об ингредиенете.', () => {
            cy.wait('@ingredients');
            cy.contains('Ингредиент 1').click();
            cy.get('#modal').should('contain', 'Ингредиент 1');
            cy.get('#modal').should('contain', '420');
            cy.get('#modal').should('contain', '80');
            cy.get('#modal').should('contain', '24');
            cy.get('#modal').should('contain', '53');
        });

        it('При клике на кнопку закрытие модального окна, оно закрывается.', () => {
            cy.wait('@ingredients');
            cy.contains('Ингредиент 1').click();
            cy.get('#modal').should('contain', 'Детали ингредиента');

            cy.get('#modal_close').first().click();
            cy.contains('Детали ингредиента').should('not.be');
        });

        it('При клике на пустое место сбоку, модальное окно закрывается', () => {
            cy.wait('@ingredients');
            cy.contains('Ингредиент 1').click();
            cy.get('#modal').should('contain', 'Детали ингредиента');

            cy.get('body').click(0, 0);
            cy.contains('Детали ингредиента').should('not.exist');
        });
    });
});