export const getMostActiveTenLocations_usecase = ( dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;

    const interactor = async () => {
        return await productRepo.getMostActiveTenLocations()
    }

    return { interactor }
}