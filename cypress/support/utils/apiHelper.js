/**
 * Utilitário para chamadas de API do Automation Exercise utilizando Supertest
 * Atende ao requisito do uso de Supertest na automação
 */
class ApiHelper {
  /**
   * Cria um usuário via endpoint de API (/api/createAccount) utilizando Supertest
   * @param {Object} userData
   */
  static createUser(userData) {
    return cy.task('createAccountViaApi', userData);
  }

  /**
   * Exclui um usuário via endpoint de API (/api/deleteAccount) utilizando Supertest
   * @param {string} email
   * @param {string} password
   */
  static deleteUser(email, password) {
    return cy.task('deleteAccountViaApi', { email, password });
  }

  /**
   * Busca detalhes do usuário via endpoint de API (/api/getUserDetailByEmail) utilizando Supertest
   * @param {string} email
   */
  static getUserDetail(email) {
    return cy.task('getUserDetailViaApi', email);
  }
}

export default ApiHelper;
