jest.mock('meteor/gadicc:blaze-react-component');

export const Meteor = {
	user: jest.fn().mockReturnValueOnce({
		profile: {
			ingredients: []
		}
	}),
	userId: jest.fn(),
	settings: {
		public: {
			edamam: {
				id: '06054e01',
				key: '8ac8228d49c7f57077d45d99b1ac781f',
				url: 'https://api.edamam.com/search'
			}
		}
	}
};
