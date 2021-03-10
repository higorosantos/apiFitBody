import User from '../models/User';


class UserRepository {

   async create(user:any){
      const { name, email , pwd } = user;
      const userModel = await User.create({
          name,
          email,
          pwd
      })
      await userModel.save();

      return userModel;
   }
   
   async getById(id:number){
        const user = await User.findById(id);

        return user;
   }

   async getByEmail(email:string){
       const user = await User.findOne({email});

       return user;
   }

   async getAll(){
        const users = await User.find();

        return users;
   }
}


export default new UserRepository();