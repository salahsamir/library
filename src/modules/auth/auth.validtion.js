import Joi from 'joi'
//sign up validation
export const signupvalidition={
    body:Joi.object(
        {
            username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cpassword:Joi.string().required().valid(Joi.ref('password')),
            age:Joi.number()
            .integer()
            .min(12)
            .max(100)
            .required()
        }
    ).required(),
}
//sign in validation 
export const signinvalidition={
    body:Joi.object(
        {
           
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()       
        }
    ).required()
}
///message
export const message_validtion={
    body:Joi.object(
        {
           
            code: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()    ,
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()       
   
        }
    ).required(),
    params:Joi.object({
        reviserEmail:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    })
}