import { adminCollection } from "../../";
import { userCollection } from "../../";
import { IAdmin } from "../../../../../entities/adminEntities";
import { IUserData } from "../../";

export const findAdminWithEmail = async (email: string):Promise <IAdmin | boolean> => {
  try {
    const adminData = await adminCollection.findOne({ email: email });
    if (!adminData) return false;
    return adminData as IAdmin;
  } catch (error: any) {
    console.log(`here happened an error \n`, error);
    return false;
  }
};


export const getAdminDataFromId = async (adminId: string):Promise <IAdmin | boolean> => {
    try {
      const adminData = await adminCollection.findOne({ _id: adminId });      
      if (!adminData) return false;
      return adminData as IAdmin;
    } catch (error: any) {
      console.log(`here happened an error \n`, error);
      return false;
    }
};

export const getAllUsers = async () :Promise <IUserData [] | boolean> => {
  try {
    const users = await userCollection.find()
    return users as IUserData[];
  } catch (error) {
    console.log(`an error happened ${error}`);
    return false;
  }
}
  
export const changeUserStatus = async ( userId: string):Promise<IUserData[] | boolean> => {
  try {
    const currentUser = await userCollection.findById(userId);
    if (currentUser?.status) await userCollection.findByIdAndUpdate(userId, { status: false});
    if (!currentUser?.status) await userCollection.findByIdAndUpdate(userId, { status: true});
    const users = await userCollection.find()
    return users as IUserData[];
  } catch (error) {
    console.log('something went wrong during changing the status of user')
    return false;
  }
}

export const updatePassword = async (
  email: string,
  password: string
): Promise<IAdmin | boolean> => {
  try {
    const adminData = await adminCollection.findOneAndUpdate(
      { email: email },
      { password: password }
    );
    return adminData as IAdmin;
  } catch (error) {
    console.log("something went wrong");
    return false;
  }
};
