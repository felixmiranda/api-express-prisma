import { NextFunction, Request, Response } from "express";
import authenticationService from "./authentication.service";
import { IPayloadJWT } from "./interfaces/jwt.interface";

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const authParts = authHeader?.split(' ');

    if (authParts?.length !== 2) {
        return res.status(401).json({
            message: 'No authorization token was found in request'
        });
    }

    if(!/^Bearer$/i.test(authParts[0])) {
        return res.status(401).json({
            message: 'Bad format, authorization format is: Bearer [token]'
        });
    }
    // it could be a decode step to verify the algorithm type

    try {
        res.locals.jwt = (await authenticationService.verifyToken(authParts[1], 'access')) as IPayloadJWT
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}

export default {
    validateJWT
}