export const getFollowingList_usecase = (dependencies: any) => {
    const {
        repositories: {
            userRepo: { getFollowingList },
        },
    } = dependencies;
    console.log(`here in usecase`);

    if (!getFollowingList) throw new Error("dependecy is required for to populate following list");

    const interactor = async (userId: string) => {
        return await getFollowingList(userId);
    };

    return { interactor };
};
