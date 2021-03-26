import express from 'express';

const signedPOST = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(200).send()
}

export default signedPOST;