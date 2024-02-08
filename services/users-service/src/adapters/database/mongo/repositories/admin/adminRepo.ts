import { adminCollection, userCollection, reportedUserCollection, IUserData } from "../../";
import { IAdmin } from "../../../../../entities/adminEntities";
import { IReportedUser } from "../../../../../entities/reportedUserEntities";

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

export const getReportedUsers = async ():Promise<IReportedUser[] | boolean> => {
  try {
    const reportedUsers = await reportedUserCollection.aggregate([
      {
        $unwind: "$reports"
      },
      {
        $lookup: {
          from: "users", 
          localField: "userId",
          foreignField: "_id",
          as: "reportedOn"
        }
      },
      {
        $lookup: {
          from: "users", 
          localField: "reports.reportedBy",
          foreignField: "_id",
          as: "reportedBy"
        }
      }
    ])
    
    if (reportedUsers) {
      console.log(reportedUsers);
      return reportedUsers as IReportedUser[];
    }
    else return false;
  } catch (error) {
    console.log(`something went wrong during fetching reported users ${error}`);
    return false;
  }
}