import { Request,Response, response } from "express"
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.1";
import { CLIENT_AUTH_URL, JWT_SECRET_KEY } from "../constants";

export const signup=async(req:Request,res:Response)=>{
    const {email,password,name,imageUrl = null}=req?.body;
    if(!email){
        res.json({message:"Email is Required"})
    }
    if(!password){
        res.json({message:"password is Required"})
    }if(!name){
        res.json({message:"name is Required"})
    }
    try{
        const existingUser=await prisma.user.findFirst({where:{email}});
        if(existingUser){
            return res.json({message:"Email is already in use"});
        }
        if(!existingUser){
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=await prisma.user.create({
                data:{email,name,imageUrl,password:hashedPassword},
            });
            res.cookie("token",await generateToken(newUser));

            return res.json({message:"Signed up successfully",User:{ email: newUser?.email,
                id: newUser?.id,
                name: newUser?.name,
                imageUrl: newUser?.imageUrl,
            },
        });
        }
    }
    catch(error){
        console.log(error);
        res.json({error:error?.toString()})
    }
};

export const login=async(req:Request,res:Response)=>{
 const {email,password}=req?.body;
 if(!email){
    res.json({message:"Email is Required"})
}
if(!password){
    res.json({message:"password is Required"})
}
try{
    const existingUser=await prisma.user.findFirst({where:{email}});
    if(!existingUser){
        return res.json({message: "Couldn't find the user"});
    }
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!isPasswordValid) {
          return res.json({ message: "Invalid password" });
        }
        res.cookie("token", await generateToken(existingUser));
        return res.json({
            message: "Logged in successfully",
            user: {
              email: existingUser?.email,
              id: existingUser?.id,
              name: existingUser?.name,
              imageUrl: existingUser?.imageUrl,
            },
          });
    }
  
}catch(error){ console.log(error);
    res.json({error:error?.toString()})}
}

export const verifyUser=async(req:Request,res:Response)=>{
    const cookies=req?.cookies

    if(cookies?.token){
        const decodedToken: any = jwt.verify(cookies.token, JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.redirect(CLIENT_AUTH_URL as string);
    }
    try{
        const existingUser = await prisma.user.findFirst({
            where: { email: decodedToken?.email },
          });
          if (!existingUser) {
            return res.redirect(CLIENT_AUTH_URL as string);
          }
          return res.json({
            isAuthenticated: true,
            user: {
              email: existingUser?.email,
              id: existingUser?.id,
              name: existingUser?.name,
              imageUrl: existingUser?.imageUrl,
            },
          });
    }catch(error){
        console.log(error);
        return res.redirect(CLIENT_AUTH_URL as string);
    }
    }
}