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
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.number("99#######")
        },
        forgotPassword:
        {
            email: "hanna@gaem.io",
        }
}
exports.users = users;