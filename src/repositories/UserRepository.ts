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
        return await User.findById(id);
   }

   async getByEmail(email:string){
       return await User.findOne({email});;
   }

   async update(user:IUser){
        return await User.findByIdAndUpdate(user.id,user)
   }


   async getAll(){

        return await User.find();
   }
}


export default new UserRepository();