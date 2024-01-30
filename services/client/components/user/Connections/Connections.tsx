import { useState } from "react"

const Connections = () => {
    const [ section, setSection] = useState(`followers`)
    return (
        <>
            <div className="container mx-auto ps-8">
                <div className="lg:flex justify-center">
                    {/* followers */}
                    <div className="lg:w-1/2 w-ful py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'followers'? 'border-b-2': 'border-b'}`}>followers</p>
                    </div>

                    {/* following */}
                    <div className="lg:w-1/2 w-ful py-2">
                        <p className={`text-center font-bold p-4 border-black ${section === 'following'? 'border-b-2': 'border-b'}`}>following</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connections