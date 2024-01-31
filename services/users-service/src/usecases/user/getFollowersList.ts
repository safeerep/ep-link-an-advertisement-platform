export const getFollowersList_usecase = (dependencies: any) => {
    const {
        repositories: {
            userRepo: { getFollowersList },
        },
    } = dependencies;
    console.log(`here in usecase`);

    if (!getFollowersList) throw new Error("dependecy is required for to populate followers");

    const interactor = async (userId: number) => {
        return await getFollowersList(userId);
    };

    return { interactor };
};
