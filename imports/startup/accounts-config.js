/* ------------------------ Accounts Email ----------------------------- */
Accounts.config({
	sendVerificationEmail: true
});

// Email settings
const { name, contactEmail } = Meteor.settings.public.site;
Accounts.emailTemplates.siteName = name;
Accounts.emailTemplates.from = `${name} <${contactEmail}>`;

Accounts.emailTemplates.enrollAccount = {
	subject(user) {
		return `Welcome to ${name}`;
	},
	html(user, url) {
		var ECEmail = require('../api/core/renderEmail');
		// This is the content html
		var tplt = `
            <p>Dear ${user.emails[0].address},</p>
            <p>To activate your account, follow this link: ${url}</p>
		`;

		const header = `Welcome to ${name}`;
		return ECEmail.renderTemplate(header, tplt);
	}
};

Accounts.emailTemplates.resetPassword = {
	// Overrides the value set in `Accounts.emailTemplates.from` when resetting
	// passwords.
	subject() {
		return 'Reset Password';
	},
	html(user, url) {
		var ECEmail = require('../api/core/renderEmail');
		// This is the content html
		var tplt = `
            <p>Dear ${user.emails[0].address},</p>
            <p>To reset password, click <a href="${url}">here</a></p>
		`;
		const header = 'Reset Password';
		return ECEmail.renderTemplate(header, tplt);
	}
};

Accounts.emailTemplates.verifyEmail = {
	subject() {
		return 'Activate your account now!';
	},
	html(user, url) {
		var ECEmail = require('../api/core/renderEmail');
		// This is the content html
		var tplt = `
            <p>Dear ${user.emails[0].address},</p>
            <p>Verify your email by following this link: ${url}</p>
		`;
		const header = 'Activate your account now!';
		return ECEmail.renderTemplate(header, tplt);
	}
};
