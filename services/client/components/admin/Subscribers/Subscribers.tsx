import { getSubscribersList } from '@/store/actions/adminActions/adminActions'
import { AppDispatch, RootState } from '@/store/store'
import { User } from '@/types/user'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Subscribers = () => {

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getSubscribersList())
    }, [])

    const subscribers: User[] = useSelector((state: RootState) => state?.user?.data?.subscribers)

    return (
        <>
            <div className="flex justify-between w-full">
                <h1 className='text-xl p-3'>Subscribers</h1>
            </div>
            <table className="table border w-full overflow-scroll ms-1">
                <thead>
                    <tr>
                        <th className="border text-center">Email</th>
                        <th className="border text-center">Policy Chosen</th>
                        <th className="border text-center">Taken On</th>
                        <th className="border text-center">Validity upto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscribers &&
                        subscribers.map((user: User) => (
                            <tr key={user?._id}>
                                <td className="border text-center">{user?.email}</td>
                                <td className="border text-center">{user?.subscription?.policy}</td>
                                <td className="border text-center">{user?.subscription?.takenOn ? new Date(user.subscription.takenOn).toLocaleDateString() : ''}</td>
                                <td className="border text-center">
                                    {user?.subscription?.takenOn
                                        ? user?.subscription?.policy === 'annual'
                                            ? new Date(user.subscription.takenOn).setFullYear(new Date(user.subscription.takenOn).getFullYear() + 1).toLocaleString()
                                            : new Date(user.subscription.takenOn).setMonth(new Date(user.subscription.takenOn).getMonth() + 1).toLocaleString()
                                        : ''}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Subscribers