import { faker } from '@faker-js/faker';
const users = {
        login: {
            email: 'hanna@gaem.io',
            password: 'Tester_123',
        },
        registration:
        {
            email: faker.internet.email(),
            password: 'Tester_123',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.number("99#######")
        }
}
exports.users = users;