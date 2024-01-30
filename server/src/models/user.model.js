import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true, "please add your name"]
	},
	email:{
		type:String,
		required:[true, "please add your email"],
		unique:[true, "email is already in use"]
	},
	password:{
		type:String,
		required:[true, "please add your password"],
		
	}
	
},{
	versionKey:false,
	timestamps:true,
});

userSchema.pre("save", function(next){
	if(!this.isModified("password")){
		return next();
	}
	const hash = bcrypt.hashSync(this.password,8);
	this.password = hash
	
	return next();
});

userSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

// userSchema.methods.getResetPasswordToken = function(){
// 	const resetToken = crypto.randomBytes(20).toString("hex");
// 	this.resetPasswordToken = crypto
// 	.createHash("sha256")
// 	.update(resetToken)
// 	.digest("hex");

// 	this.resetPasswordExpire = Date.now() + 15*60*1000;
// 	return resetToken;
// }

export default mongoose.model("User",userSchema);