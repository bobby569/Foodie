import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

const ECEmail = {
	renderTemplate: (header, content) => {
		// Load the base email tamplate file
		SSR.compileTemplate(
			'baseEmail',
			Assets.getText('emailTemplates/_base.html')
		);
		// Render the template into this _base html
		const { name, address, domain } = Meteor.settings.public.site;
		const res = SSR.render('baseEmail', {
			company: {
				name,
				address,
				domain,
				unsubUrl: `${domain}/email/unsubscribe`
			},
			header,
			content
		});
		return res;
	},
	sendEmail: (
		to,
		from,
		cc,
		replyTo,
		subject,
		templateType,
		templateHeader,
		templateData
	) => {
		// Check the parameters type
		check(to, String);
		check(from, String);
		check(cc, String);
		check(replyTo, String);
		check(subject, String);
		check(templateType, String);
		check(templateHeader, String);
		check(templateData, Object);

		// Check if the templateType exists, which is if the related html exists
		const filePath = `emailTemplates/${templateType}.html`;

		// templateType cannot be null
		if (templateType) {
			// Load the html template file
			SSR.compileTemplate(templateType, Assets.getText(filePath));
			// Render data into the template
			const tplt = SSR.render(templateType, templateData);

			// Render final email based on _base.html
			const finalEmail = ECEmail.renderTemplate(tplt, templateHeader);

			Meteor.defer(() => {
				// Send the email
				Email.send({
					to,
					from: from || Meteor.settings.public.Company.contactEmail,
					cc: cc || null,
					replyTo: replyTo || null,
					subject: subject || 'Never stop eating!',
					html: finalEmail
				});
			});
		} else {
			throw new Error('EmailTemplateError');
		}
	}
};

module.exports = ECEmail;
