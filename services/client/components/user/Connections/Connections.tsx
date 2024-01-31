import { getFollowersList, getFollowingList } from "@/store/actions/userActions/userActions";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Connections: React.FC = () => {
    const dispatch: any = useDispatch();
    const [section, setSection] = useState('followers')
    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const user = useSelector((state: any) => state?.user?.data?.userData)
    const followers = useSelector((state: any) => state?.user?.data?.followers)
    const following = useSelector((state: any) => state?.user?.data?.following)

    useEffect(() => {
        dispatch(getFollowersList(seller?._id || user?._id))
        dispatch(getFollowingList(seller?._id || user?._id))
    }, [])

    return (
        <>
            <div className="container mx-auto ps-8">
                <div className="lg:flex justify-center">
                    {/* followers */}
                    <div
                        onClick={() => setSection('followers')}
                        className="lg:w-1/2 w-ful py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'followers' ? 'border-b-2' : 'border-b'}`}>followers</p>

                        <div className="flex flex-col">
                            {/* each follower */}
                            <div
                                key={1}
                                className="w-full flex justify-between h-16 border-b items-center border-black"
                            >
                                <div className="flex justify-start gap-2 items-center">
                                    <div className="w-10 bg-gray-600 h-10 rounded-full">
                                        <img className="object-cover w-full h-full rounded-full" src={''} alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{'safeer'}</span>
                                    </div>
                                </div>
                                <span className="bg-purple-300 px-2 rounded-full">Follow button</span>
                            </div>
                        </div>
                    </div>

                    {/* following */}
                    <div
                        onClick={() => setSection('following')}
                        className="lg:w-1/2 w-ful py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'following' ? 'border-b-2' : 'border-b'}`}>following</p>

                        {/* list of following */}
                        <div className="flex flex-col">
                            {/* each person */}
                            <div
                                key={1}
                                className="w-full flex justify-between h-16 border-b items-center border-black"
                            >
                                <div className="flex justify-start gap-2 items-center">
                                    <div className="w-10 bg-gray-600 h-10 rounded-full">
                                        <img className="object-cover w-full h-full rounded-full" src={''} alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{'safeer'}</span>
                                    </div>
                                </div>
                                <span className="bg-purple-300 px-2 rounded-full">Follow button</span>
                            </div>
                        </div>
                        {/* list of following ends here */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connections