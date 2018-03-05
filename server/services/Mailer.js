/**
 * Created by yukiX on 2018/03/03.
 */
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.emaily.cloudns.cx');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;


// const keys = require('../config/keys');
// const mailgun = require("mailgun-js")({
//     apiKey: keys.mailSenderAPIKey,
//     domain: keys.domain
// });
//
// class MailgunMailer {
//     constructor({ subject, recipients }, content) {
//         this.data = {
//             from: "no-reply@yukitech.cloudns.cx",
//             to: recipients,
//             subject: subject,
//             html: content
//         };
//     }
//
//     formatAdresses(recipients) {
//         return recipients.map(({ email }) => email).join(",");
//     }
//
//     async send() {
//         try{
//             const resp = await mailgun.messages().send(this.data);
//             return resp;
//         } catch (err){
//             return err;
//         }
//     }
// }
//
// module.exports = MailgunMailer;
