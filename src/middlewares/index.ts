import {get, merge} from "lodash";
import { getUserBySessionToken } from "../db/users";
import {NextFunction, Request,Response} from 'express';


export const isAuthenticated = async (req:Request, res:Response,next:NextFunction)=>{
    try{
        const sessionToken = req.cookies['VITALIY-AUTH'];
        if(!sessionToken){
            return res.sendStatus(403);
        }
        const existinUser = await getUserBySessionToken(sessionToken);
        if(!existinUser){
            return res.sendStatus(403);
        }
        merge(req,{identity:existinUser})
        return next()
    }catch(e){
        console.log(e);
        return res.sendStatus(400);
        
    }
}
export const isOwner = async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const {id} = req.params;
        const currentUserId = get(req,'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString()!==id){
            return res.sendStatus(403);
        }
        next();
    }catch(e){
        console.log(e);
        return res.sendStatus(400);
        
    }
}