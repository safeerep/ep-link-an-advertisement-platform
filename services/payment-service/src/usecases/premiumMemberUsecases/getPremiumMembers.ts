export const getPremiumMembersList_usecase = (dependencies: any) => {
    try {
        const {
            repositories: {
                premiumMembersRepo
            }
        } = dependencies;

        if (!premiumMembersRepo) console.log(`premium members repo is not getting as we wish`);

        const interactor = async ( currentPage: number) => {
            const skip: number = (currentPage - 1) * 10;
            const limit: number = 10;
            return await premiumMembersRepo.getPremiumMembersList(skip, limit)
        }
        
        return { interactor }
    } catch (error) {
        console.log(`something went wrong on fetching premium members`);
        return false;
    }
}