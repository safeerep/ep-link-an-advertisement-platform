export const getAllPlans_usecase = (dependencies: any) => {
    try {
        const {
            repositories: {
                premiumPlansRepo
            }
        } = dependencies;

        if (!premiumPlansRepo) console.log(`premium plans repo is not getting as we wish`);

        const interactor = async () => {
            return await premiumPlansRepo.getAllPolicies()
        }
        
        return { interactor }
    } catch (error) {
        console.log(`something went wrong in fetching all policies`);
        return false;
    }
}