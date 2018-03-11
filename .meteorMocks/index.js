jest.mock('meteor/gadicc:blaze-react-component');

export const Meteor = {
	user: jest.fn().mockReturnValue({
		profile: {
			ingredients: ['tomato']
		}
	}),
	userId: jest.fn().mockReturnValue('id'),
	settings: {
		public: {
			edamam: {
				id: '06054e01',
				key: '8ac8228d49c7f57077d45d99b1ac781f',
				url: 'https://api.edamam.com/search'
			}
		}
	},
	call: jest.fn()
};
