import saveMessage from "./saveMessage"
import saveMediafiles from "./saveMediafiles"

export default ( dependencies: any) => {
    return {
        saveMessageController: saveMessage(dependencies),
        saveMediafilesController: saveMediafiles(dependencies)
    }
}