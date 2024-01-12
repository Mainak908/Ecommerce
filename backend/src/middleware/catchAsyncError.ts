import { Request, Response, NextFunction } from "express";
interface MiddlewareFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}
const middlewareWrapper =
  (thisFunc: MiddlewareFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(thisFunc(req, res, next)).catch(next);
  };

export default middlewareWrapper;

//(req: Request, res: Response, next: NextFunction) => any
