
import { deleteUserById, getUserById, getUsers } from "../db/users";
import { Request,Response } from "express";

export const getAllUsers = async(req:Request,res:Response)=>{
    try{
        const users = await getUsers();
        return res.status(200).json(users)
    }catch(e){
        console.log(e);
        return res.sendStatus(400);
        
    }
}


export const deleteUser = async(req:Request,res:Response)=>{
    try{
        const {id}= req.params;
        const deleteUser = await deleteUserById(id);
        return res.json(deleteUser);
    }catch(e){
        console.log(e);
        return res.sendStatus(400);
    }
}

export const updateUser = async(req:Request, res:Response)=>{
    try{
        const {username} =req.body;
        const {id} = req.params;
        if(!username){
            return res.sendStatus(400);
        }
        const user = await getUserById(id);
        user.username = username;
        await user.save();
        return res.status(200).json(user).end();
    }catch(e){
        console.log(e);
        return res.sendStatus(400);
        
    }
}