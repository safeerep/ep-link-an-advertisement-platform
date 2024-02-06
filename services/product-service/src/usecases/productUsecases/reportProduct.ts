export const reportProduct_usecase = (dependencies: any) => {
    const {
        repositories: {
            productRepo
        }
    } = dependencies;
  
    const interactor = async ( productId: string, report: any) => {
      return await productRepo.reportProduct( productId, report);
    };
  
    return { interactor };
};
  