import { faker } from '@faker-js/faker';
const users = {
        login: {
            userWithValidData:{
                email: 'hanna@gaem.io',
                password: 'Tester_123'
            },
            userWithInvalidPassword:{
                email: 'hanna@gaem.io',
                password: 'Tester_12345'
            },
            userWithInvalidEmail:{
                email: 'hanna123@gaem.io',
                password: 'Tester_12345'
            }
        },
        registration:
        {
            email: faker.internet.email(),
            password: 'Tester_123',
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: faker.phone.number("99#######")
        },
        forgotPassword:
        {
            email: "hanna@gaem.io",
        },
        deposit: {
            email: 'hanna+22@gaem.io',
            password: 'Tester_123'
        }

}
exports.users = users;