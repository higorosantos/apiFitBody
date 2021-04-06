import User,{ IUser } from '../models/User';
import bcrypt from 'bcryptjs';


class UserRepository {

   async create(user:IUser){
      const { name, email , pwd } = user;
      const userModel = await User.create({
          name,
          email,
          pwd
      })
      const hash = await bcrypt.hash(pwd,10);
      userModel.pwd = hash;
     
      await userModel.save();
    
      return userModel;
   }
   
   async getById(id:string){
        return await User.findById(id).select('-_id');
   }

   async getByEmail(email:string,fields?:string[]){
     return await User.findOne({email}).select(fields);
  }

   async update(id:string,user:IUser){
        console.log(user);
        return await User.findByIdAndUpdate(id,{
             $set:user
        }).select('-_id');
   }

   async getAll(){

        return await User.find().select('-_id');
   }
}


export default new UserRepository();