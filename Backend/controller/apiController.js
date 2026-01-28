import jwt from 'jsonwebtoken';
const generateToken = (length = 16) => {
    return jwt.sign(
        { data: require('crypto').randomBytes(length).toString('hex') },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
}

export const registerUser =(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        //check if user exists
    }catch(error){
        next(error);
    }

}
export const loginUser =(req,res,next)=>{
    try{
        const {username,email,password} = req.body;
        //check if user exists
    }catch(error){
        next(error);
    }

}

export const getProfile =(req,res,next)=>{
    try{
       
        //check if user exists
    }catch(error){
        next(error);
    }

}

export const updateProfile =(req,res,next)=>{
    try{
    }catch(error){
        next(error);
    }

}

export const changePassword =(req,res,next)=>{
    try{
    }catch(error){
        next(error);
    }
}  