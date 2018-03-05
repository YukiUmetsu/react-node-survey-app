/**
 * Created by yukiX on 2018/03/04.
 */
import util from './trimming';
export default (emails) => {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const invalidEmailsArray = emails
        .split(',')
        .map(email=>email.trim())
        .map(email=>util.trimRight(email, ',').trim())
        .filter((email) => {
            if(email !== ""){
                return regex.test(email) === false;
            }
            return false;
        });

    if(invalidEmailsArray.length) {
        return `These emails are invalid: ${invalidEmailsArray}`;
    }
    return;
}