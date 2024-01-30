import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (token)=>{
	return new Promise(function(resolve, reject){
		 jwt.verify(token, process.env.SALT, function(err, user) {
			if(err) {
				return reject(err);
			}
			return resolve(user);
		  });
	})
}

function authenticate(req, res, next) {
    
    const bearerToken = req.header('Authorization')

    if(!bearerToken){
        return res.status(403).send({ message:"Please provide bearer token"})
    }
    const token = bearerToken.split(" ")[1];
   
	if(!token) {
		return res.status(403).send({ message:"Please login or register first token"})
	}
    
	const userPromise = verifyToken(token);
    
    userPromise.then((user)=>{
        req.userData = user
        next();
    }).catch((err)=>{
        return res.status(401).send({message:"you are using wrong token please login again",error:err})
    })

}

export default authenticate; 