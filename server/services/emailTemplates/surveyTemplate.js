/**
 * Created by yukiX on 2018/03/03.
 */
const keys = require('../../config/keys');


module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd live your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                       <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                       <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};