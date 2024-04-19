const mongoose = require('mongoose');
import { Document } from "mongoose";
interface UserObject {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false }, //kogda ya polychy otvet v pole otveta pass ne bydet vklychen
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    'authentication.sessionToken': sessionToken,
  });
export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>new UserModel(values)//record klych ryadok a zna4enie 4to ygodno
.save().then((user:Document<UserObject>) => user.toObject())//sozdaent user na osnovainii Schema potom sohranyaet v bazy potom vozvrashaet user i pereobrazyem v obiz4niy object js v funktciy

export const deleteUserById = (id:string)=>UserModel.findOneAndDelete({_id:id});
export const updateUserById = (id:string,values:Record<string,any>)=>UserModel.findByAndUpdate(id,values);


