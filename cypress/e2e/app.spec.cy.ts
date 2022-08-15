describe('Тестирование аутентификации', () => {

    beforeEach(() => {
        cy.intercept("POST", "auth/login", {fixture: 'login.json'}).as("postlogin");
        cy.visit('http://localhost:3000');
    });


    it('Авторизация', () => {
        const email = 'maybe.gm@gmail.com'
        const password = '123'
        cy.get('[name:login]').type(`${email}{enter}`)
        cy.get('[name:password]').type(`${password}{enter}`)
        cy.wait('@postlogin').its('request_body').should('deep.equal', {
            email: email,
            password: password
        });
        cy.get(".app_header link").should("have.text", "Полывьянов Виталий")
    })

    it('Переход на страницу логина после логаута', () => {
        cy.get("logout_selector").click();
        cy.get("loginForm").should('exist')
    })
});