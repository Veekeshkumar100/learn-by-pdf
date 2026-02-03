import jwt from 'jsonwebtoken';
import  {User}  from '../model/user.js';
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
}

export const registerUser =async(req,res,next)=>{
    try{
        console.log(req.body);
        const {username,email,password} = req.body;
        //check if user exists
        const userExist= await User.findOne({email});

        if(userExist){
            return res.status(401).json({
                success:false,
                error:'User is already exist',
                statusCode:401,
            })
        }
        
        const user= await User.create({
            username,
            email,
            password,
        })
       
        const token=generateToken(user._id);

        res.status(401).json({
            success:true,
            data:{
                user:{
                    id:user.id,
                    name:user.username,
                    email:user.email,
                    profielImage:user.profileImage,
                    createdAt:user.createdAt,
                },
                token,
            },
            status:200,
            message:'user register succesfully'
        })

    }catch(error){
        next(error);
    }

}
export const loginUser =async(req,res,next) => {
    try{
        const {email,password} = req.body;
        //check if user exists
        console.log(req.body);
        if(!password || ! email){
            return res.status(401).json({
                succes:false,
                error:'all the field are required',
                statusCode:401,
            })
        }

        const userExist= await User.findOne({email});
        if(!userExist){
          return res.status(401).json({
            succes:false,
            error:'user is not exist',
            statusCode:401,
          })
        }

        const isPasswordCorrect=userExist.matchPassword(password);
       
        if(!isPasswordCorrect){
            return res.status.json({
                success:false,
                error:"password is not currect",
                stautusCode:401,
            })
        }

         res.status(401).json({
            success:true,
            status:200,
            message:'user loged in succesfully'
        })
    }catch(error){
        next(error);
    }
}

export const getProfile =async (req,res,next)=>{
    try{
      const user= await User.findById(req.user._id);
      if(!user){
        return res.status(401).json({
            success:true,
            error:'user is not found',
            statusCode: 401,
        })
      }

    res.status(401).json({
        succes:false,
        data:{
            user:{
                id:user.id,
                username: user.username,
                email:user.email,
                profileImage:user.profileImage,
            }
        },
        message:"user found suuccessfully"
    })
        //check if user exists
    }catch(error){
        next(error);
    }
}

export const updateProfile =async(req,res,next)=>{
    try{
      const {username,email}= req.body;
      console.log(req.body);
      const user = await User.findById(req.user._id);

      if(username) user.username=username;
      if(email) user.email=email;
     
      await user.save();
      res.status(401).json({
        succes:true,
        data:{
            id:user.id,
            username:user.username,
            email:user.email,
            profielImage:user.profielImage,   
        },
        message:"user profiel updated successfully",
      })  
    }catch(error){
        next(error);
    }
}
export const changePassword =async(req,res,next)=>{
    try{
        const {currentPassword,newPassword} = req.body;
        if(!currentPassword || ! newPassword){
            return res.status(401).json(
                {
                  succes:false,
                  error:'new and old password is required',
                  statusCode:401,
                }
            )
        }
        const user = await User.findById(req.user._id).select("+password");
        console.log(user);
        const iscurrentPasswordCurrect= user.matchPassword(currentPassword);
        if(!iscurrentPasswordCurrect){
          return res.status(401).json({
                  succes:false,
                  error:'current password is required',
                  statusCode:401,
          })
        }
         user.password=newPassword;
         await user.save()
         
          res.status(401).json({
            succes:true,
            message:'password is changed successfully',
            stautusCode:401,
         })
    }catch(error){
        next(error);
    }
}  