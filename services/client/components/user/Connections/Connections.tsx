import { authRequired, getFollowersList, getFollowingList, followUser, unFollowUser } from "@/store/actions/userActions/userActions";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation";

const Connections: React.FC = () => {
    const dispatch: any = useDispatch();
    const router = useRouter();
    const [section, setSection] = useState('followers')
    const searchParams = useSearchParams();
    const sellerId: string | any = searchParams.get("id");
    const user = useSelector((state: any) => state?.user?.data?.userData)
    const followers = useSelector((state: any) => state?.user?.data?.followers)
    const following = useSelector((state: any) => state?.user?.data?.following)

    useEffect(() => {
        dispatch(authRequired(router))
    },[])

    useEffect(() => {
        if (sellerId) {
            dispatch(getFollowersList(sellerId))
            dispatch(getFollowingList(sellerId))
        }
        else if (user?._id){
            dispatch(getFollowersList(user?._id))
            dispatch(getFollowingList(user?._id))
        }
    }, [ user?._id])

    const handleFollow = async (userId: string) => {
        console.log('clicked for follow');
        dispatch(followUser(userId))
    }

    const handleUnfollow = async (userId: string) => {
        console.log('clicked for unfollow');
        dispatch(unFollowUser(userId))
    }

    return (
        <>
            <div className="container mx-auto ps-8">
                <div className="lg:flex justify-center cursor-pointer">
                    {/* followers */}
                    <div
                        onClick={() => setSection('followers')}
                        className="lg:w-1/2 w-full py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'followers' ? 'border-b-2' : 'border-b'}`}>followers</p>
                    </div>

                    {/* following */}
                    <div
                        onClick={() => setSection('following')}
                        className="lg:w-1/2 w-ful py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'following' ? 'border-b-2' : 'border-b'}`}>following</p>
                    </div>
                </div>
                {/* list of followers */}
                {
                    section === 'followers' && (
                        followers?.length > 0 ?
                            (
                                <div className="lg:flex flex-col justify-center">
                                    {/* each person */}
                                    {
                                        followers?.map((singleUser: any) => (
                                            <div
                                                key={singleUser?._id}
                                                className="w-full flex justify-between h-16 border-b items-center border-black"
                                            >
                                                <div className="flex justify-start gap-2 items-center">
                                                    <div className="w-10 bg-gray-600 h-10 rounded-full">
                                                        <img className="object-cover w-full h-full rounded-full" src={singleUser?.profilePhoto} alt="" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{singleUser?.userName}</span>
                                                    </div>
                                                </div>
                                                {
                                                    user?.following?.includes(singleUser?._id) ?
                                                        <button
                                                            onClick={() => handleUnfollow(singleUser?._id)}
                                                            className="bg-slate-950 text-white px-4 p-1 rounded-full">UNFOLLOW</button> :
                                                        <button
                                                            onClick={() => handleFollow(singleUser?._id)}
                                                            className="bg-slate-950 text-white px-4 p-1 rounded-full">FOLLOW</button>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            <div className="flex justify-center">
                                <span className="text-center">There is no followers !!</span>
                            </div>
                    )
                }
                {/* list of followers ends here */}
                {/* list of following */}

                {
                    section === 'following' && (
                        following?.length > 0 ?
                            (
                                <div className="lg:flex flex-col justify-center">
                                    {/* each person */}
                                    {
                                        following?.map((singleUser: any) => (
                                            <div
                                                key={singleUser?._id}
                                                className="w-full flex justify-between h-16 border-b items-center border-black"
                                            >
                                                <div className="flex justify-start gap-2 items-center">
                                                    <div className="w-10 bg-gray-600 h-10 rounded-full">
                                                        <img className="object-cover w-full h-full rounded-full" src={singleUser?.profilePhoto} alt="" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{singleUser?.userName}</span>
                                                    </div>
                                                </div>
                                                {
                                                    user?.following?.includes(singleUser?._id) ?
                                                        <button
                                                            onClick={() => handleUnfollow(singleUser?._id)}
                                                            className="bg-slate-950 text-white px-4 p-1 rounded-full">UNFOLLOW</button> :
                                                        <button
                                                            onClick={() => handleFollow(singleUser?._id)}
                                                            className="bg-slate-950 text-white px-4 p-1 rounded-full">FOLLOW</button>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ) :
                            <div className="flex justify-center">
                                <span className="text-center">There is no following !!</span>
                            </div>
                    )
                }

                {/* list of following ends here */}
            </div>
        </>
    )
}

export default Connections