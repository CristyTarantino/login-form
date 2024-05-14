import {validateEmail} from './emailValidation';

describe('validateEmail', () => {
    // Test valid email addresses
    test.each([
        'email@example.com',
        'firstname.lastname@example.com',
        'email@subdomain.example.com',
        'firstname+lastname@example.com',
        '1234567890@example.com',
        'email@example-one.com',
        '_______@example.com',
        'email@example.name',
        'email@example.museum',
        'email@example.co.jp',
        'email@domain.web',
        'firstname-lastname@example.com'
    ])('validates the email address: %s', (email) => {
        expect(validateEmail(email)).toBeTruthy();
    });

    // Test invalid email addresses
    test.each([
        'email@123.123.123.123',
        'plainaddress',
        '@missingusername.com',
        'email.example.com',
        'email@example@example.com',
        '.email@domain.com',
        'email@-domain.com',
        'email@111.222.333.44444',
        'email@domain..com',
        'email@domain.com (Joe Smith)',
        'email@domain',
        'email@123.123.123.123.123',
        'email@[123.123.123.123]',
        '“email”@example.com',
        'email@.domain.com',
        'email@domain_com',
        'email@domain..com'
    ])('fails validation for the email address: %s', (email) => {
        expect(validateEmail(email)).toBeFalsy();
    });
});
