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
   
   async getById(id:number){
        const user = await User.findById(id);

        return user;
   }

   async getByEmail(email:string){
       const user = await User.findOne({email}).select('pwd');

       return user;
   }

   async getAll(){
        const users = await User.find();

        return users;
   }
}


export default new UserRepository();