import { faker } from '@faker-js/faker';

/**
 * Data Factory para geração dinâmica e isolada de dados de teste
 * Baseado no padrão abordado na apostila (página 59)
 */
class DataFactory {
  static generateUserData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const timestamp = Date.now();

    return {
      title: 'Mr',
      name: `${firstName} ${lastName}`,
      email: `qa_user_${timestamp}@mailtesting.com`,
      password: `Pass@${timestamp}`,
      day: '15',
      month: 'May',
      year: '1995',
      firstName: firstName,
      lastName: lastName,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '5551234567',
    };
  }

  static generatePaymentData() {
    return {
      nameOnCard: faker.person.fullName(),
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '10',
      expiryYear: '2028',
    };
  }
}

export default DataFactory;
