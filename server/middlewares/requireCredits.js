/**
 * Created by yukiX on 2018/03/03.
 */
/**
 * Created by yukiX on 2018/03/03.
 */
module.exports = (req,res,next) => {
    if(req.user.credits < 1){
        return res.status(403).send(
            { error: 'Not enough credits!'}
        );
    }

    next();
};