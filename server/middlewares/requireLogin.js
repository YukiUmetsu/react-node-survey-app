/**
 * Created by yukiX on 2018/03/03.
 */
module.exports = (req,res,next) => {
  if(!req.user){
      return res.status(401).send(
          { error: 'You must login!'}
      );
  }

  next();
};