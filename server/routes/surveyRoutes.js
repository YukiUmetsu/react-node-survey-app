/**
 * Created by yukiX on 2018/03/03.
 */
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
        res.send(surveys);
    });

    app.get('/api/surveys/thanks', (req, res)=>{
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res)=>{
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try{
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            // update user credit
            res.send(user);
        } catch (err){
            res.status(422).send(err);
        }
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post("/api/survey/webhooks", urlencodedParser, (req, res) => {
        const p = new Path("/api/survey/:surveyId/:choice");
        const { recipient: email, url, event } = req.body;
        const match = p.test(new URL(url).pathname);
        if (match && event === "clicked") {
            Survey.updateOne(
                {
                    _id: match.surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                },
                {
                    $inc: { [match.choice]: 1 },
                    $set: { "recipients.$.responded": true },
                    lastResponded: new Date()
                }
            ).exec();
        }

        res.send({});
    });
};