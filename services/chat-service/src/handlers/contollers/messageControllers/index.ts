import saveMessage from "./saveMessage"
export default ( dependencies: any) => {
    return {
        saveMessageController: saveMessage(dependencies),
    }
}