/**
 * Created by yukiX on 2018/02/26.
 */
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}