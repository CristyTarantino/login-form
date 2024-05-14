import axios from 'axios';
import sha1 from 'sha1';
import {validatePassword} from './passwordValidation'; // Adjust path as needed

// TypeScript types
import {MockedFunction} from 'jest-mock';

// Mock axios and sha1
jest.mock('axios');

// Define axios.get as a mocked function for better TypeScript integration
const mockedAxiosGet = axios.get as MockedFunction<typeof axios.get>;

describe('validatePassword', () => {
    beforeEach(() => {
        jest.mock('sha1', () => jest.fn(() => 'dummyHashValue'));

        // Mock console.error to prevent logging during tests
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore the original console.error after each test
        jest.restoreAllMocks();
    });

    const mockHIBPResponse = (suffixes: string[]): { data: string } => {
        return {data: suffixes.map(suffix => `${suffix}:1`).join("\n")};
    };

    test('returns false for passwords shorter than 8 characters', async () => {
        const result = await validatePassword('1234567');
        expect(result).toBeFalsy();
    });

    test('returns true for passwords not found in HIBP database', async () => {
        const password = 'safePassword123!';
        const hashedPassword = sha1(password).toUpperCase();
        const prefix = hashedPassword.slice(0, 5);

        mockedAxiosGet.mockResolvedValueOnce(mockHIBPResponse(['NOTYOURHASH']));
        const result = await validatePassword(password);
        expect(result).toBeTruthy();
        expect(mockedAxiosGet).toHaveBeenCalledWith(`https://api.pwnedpasswords.com/range/${prefix}`);
    });

    test('returns false for passwords found in HIBP database', async () => {
        const password = 'compromisedPassword!';
        const hashedPassword = sha1(password).toUpperCase();
        const prefix = hashedPassword.slice(0, 5);
        const suffix = hashedPassword.slice(5);

        mockedAxiosGet.mockResolvedValueOnce(mockHIBPResponse([suffix]));
        const result = await validatePassword(password);
        expect(result).toBeFalsy();
        expect(mockedAxiosGet).toHaveBeenCalledWith(`https://api.pwnedpasswords.com/range/${prefix}`);
    });

    test('returns true when an error occurs during the API call', async () => {
        const password = 'errorPassword!';
        mockedAxiosGet.mockRejectedValue(new Error('API Error'));
        const result = await validatePassword(password);
        expect(result).toBeTruthy();
    });
});
