import jwt from "jsonwebtoken";
const SECRET = "SECr3t"; // This should be in an environment variable in a real application
import { Request, Response, NextFunction } from "express";

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err || !user) {
        return res.sendStatus(403);
      }

      if (typeof user === "string") {
        return res.sendStatus(403);
      }

      //now we store userId in headers itself
      req.headers["userId"] = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJwt, SECRET };
