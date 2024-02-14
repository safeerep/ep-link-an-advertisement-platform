import { Request, Response } from "express";

export default () => {
    
    const saveNewFileAsMessage = async (req: Request, res: Response) => {
        // we will get roomId, message, senderId as req.body;
        try {
            // now we are taking all the files from request;
            const messageFiles = Array.isArray(req?.files) ?
                (req.files as Express.Multer.File[]).map((file: any) => {
                    return file?.location;
                })
                : [];

            if (!messageFiles) {
                return res.json({ success: false, message: "there is no files in request;" })
            }
            // here we will return the files which we saved in s3-bucket;
            return res.json({ success: true, files: messageFiles, message: 'successfully saved files to send message' })
        } catch (error) {
            console.log(`something went wrong during taking all files from request ${error}`);
            return res.status(503).json({ success: false, message: "something went wrong" })
        }
    }

    return saveNewFileAsMessage;
}