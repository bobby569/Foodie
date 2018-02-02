Package.describe({
	summary: 'Simple templates to add login widgets to an app',
	name: 'foodie:accounts-ui',
	version: '1.3.0'
});

Package.onUse(function(api) {
	// Export Accounts (etc) to packages using this one.
	api.imply('accounts-base', ['client', 'server']);
	api.use('foodie:accounts-ui-unstyled', 'client');
	api.use('less', 'client');

	api.addFiles(['login_buttons.less'], 'client');
});
