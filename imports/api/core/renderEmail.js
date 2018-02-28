import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

let ECEmail = {
	renderTemplate: (header, tplt) => {
		// Load the base email tamplate file
		SSR.compileTemplate(
			'baseEmail',
			Assets.getText('emailTemplates/_base.html')
		);
		// Render the template into this _base html
		const site = Meteor.settings.public.site;
		let res = SSR.render('baseEmail', {
			company: {
				name: site.name,
				address: site.address,
				domain: site.domain,
				unsubUrl: `${site.domain}/email/unsubscribe`
			},
			header: header,
			content: tplt
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
		let filePath = `emailTemplates/${templateType}.html`;

		// templateType cannot be null
		if (templateType) {
			// Load the html template file
			SSR.compileTemplate(templateType, Assets.getText(filePath));
			// Render data into the template
			let tplt = SSR.render(templateType, templateData);

			// Render final email based on _base.html
			let finalEmail = ECEmail.renderTemplate(tplt, templateHeader);

			Meteor.defer(() => {
				// Send the email
				Email.send({
					to: to,
					from:
						from && from.length > 0
							? from
							: Meteor.settings.public.Company.contactEmail,
					cc: cc && cc.length > 0 ? cc : null,
					replyTo: replyTo && replyTo.length > 0 ? replyTo : null,
					subject:
						subject && subject.length > 0 ? subject : 'Never stop eating!',
					html: finalEmail
				});
			});
		} else {
			throw new Error('EmailTemplateError');
		}
	}
};

module.exports = ECEmail;
