import { userCollection, IUserData } from "../../index";
import { otpCollection, IOtpDocument } from "../../index";

export const createNewUser = async (
  userCredentials: IUserData
): Promise<IUserData | boolean> => {
  try {
    const newUser = await userCollection.create(userCredentials);
    if (newUser) return newUser as IUserData;
    else throw new Error("something went wrong during creating new user");
  } catch (error: any) {
    // if phone number is already existing;
    if (error.code === 11000) return false;
    return false;
  }
};

export const getUserData = async (email: string) => {
  try {
    const userData = await userCollection.findOne({ email: email });
    if (!userData) return false;
    return userData;
  } catch (error: any) {
    console.log(`here happened an error \n`, error);
    return false;
  }
};

export const getUserDataFromId = async (userId: string) => {
  try {
    const userData = await userCollection.findOne({ _id: userId });
    if (!userData) return false;
    return userData;
  } catch (error: any) {
    console.log(`here happened an error \n`, error);
    return false;
  }
};

export const getUserWithPhone = async (phone: number) => {
  try {
    const userData = await userCollection.findOne({ phone: phone });
    if (!userData) return false;
    return userData;
  } catch (error: any) {
    console.log(`here happened an error \n`, error);
    return true;
  }
};

export const userLogin = async (
  email: string,
  password: string
): Promise<IUserData | boolean> => {
  const existingUser = await userCollection.findOne({
    email: email,
    password: password,
  });
  console.log(`in repo`, existingUser);
  if (!existingUser) return false;
  return existingUser as IUserData;
};

export const storeOtp = async (email: string, otp: number): Promise<void> => {
  try {
    // making upert true because if otp is existing, it should update
    // other wise, it will create new one document; 
    await otpCollection.findOneAndUpdate({ email: email}, { otp: otp}, { upsert: true})
  } catch (error: any) {
    if (error.code === 11000)
      console.log(`already an otp is there which is not expired`);
    else
      console.log(
        "something went wrong during saving otp in database \n",
        error
      );
  }
};

export const verifyOtp = async (
  email: string,
  otp: number
): Promise<boolean> => {
  try {
    const currentUser = await otpCollection.findOne({ email: email, otp: otp });
    if (currentUser) return true;
    return false;
  } catch (error: any) {
    return false;
  }
};

export const updatePassword = async (
  email: string,
  password: string
): Promise<IUserData | boolean> => {
  try {
    const updatedUser = await userCollection.findOneAndUpdate(
      { email: email },
      { password: password }
    );
    return updatedUser as IUserData;
  } catch (error) {
    console.log("something went wrong");
    return false;
  }
};

// to follow the user
export const followUser =async (currentUserId: string, userId: string) => {
    try {
      const currentUser = await userCollection.findByIdAndUpdate(currentUserId, {
        $push: {
          following: userId
        }
      })

      const userGotFollowed = await userCollection.findByIdAndUpdate( userId, {
        $push: {
          followers: currentUserId
        }
      })

      return true;
    } catch (error) {
      console.log(`something went wrong during updating the profiles ${error}`);
      return false;
    }
}


// to unfollow the user
export const unFollowUser =async (currentUserId: string, userId: string) => {
    try {
      const currentUser = await userCollection.findByIdAndUpdate(currentUserId, {
        $pull: {
          following: userId
        }
      })

      const userGotUnFollowed = await userCollection.findByIdAndUpdate( userId, {
        $pull: {
          followers: currentUserId
        }
      })

      return true;
    } catch (error) {
      console.log(`something went wrong during updating the profiles ${error}`);
      return false;
    }
}
