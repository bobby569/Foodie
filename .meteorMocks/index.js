jest.mock('meteor/gadicc:blaze-react-component', () => {
	return {
		default: 'Blaze'
	};
});

export const Meteor = {
	user: jest.fn(),
	userId: jest.fn()
};
