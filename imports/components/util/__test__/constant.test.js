jest.mock('meteor/meteor');
import { API, URI_BASE, URI_BASE_RETR, URI_LEN } from '../constant';

describe('Constant should be correct', () => {
	const rootURI = 'https://api.edamam.com/search';
	const sharedURI = 'http://www.edamam.com/ontologies/edamam.owl';

	it('Test API', () => {
		expect(API.includes(rootURI)).toBe(true);
	});

	it('Test URI_BASE', () => {
		expect(URI_BASE.includes(sharedURI)).toBe(true);
	});

	it('Test URI_BASE_RETR', () => {
		expect(URI_BASE_RETR.includes(sharedURI)).toBe(true);
	});

	it('Test URI_LEN', () => {
		expect(URI_LEN == 51).toBe(true);
	});
});
