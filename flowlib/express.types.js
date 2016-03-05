declare module "express" {
  declare var exports: () => ExpressApp;
  declare function Router(): ExpressRouter;
  declare function static(filePath: string): ExpressRouter;
}

declare module "body-parser" {
  declare function json(options?: Object): ExpressRouter;
}

type ExpressReq = any; //TODO
type ExpressRes = any; //TODO
type ExpressCallback = (req: ExpressReq, res: ExpressRes, next: ()=>void) => void;
type ExpressErrorCallback = (err: Error, req: ExpressReq, res: ExpressRes, next: ()=>void) => void;
type ExpressUseArg = ExpressCallback | ExpressErrorCallback | ExpressRouter;

declare class ExpressRouter {
  use(string_or_useArg: string | ExpressUseArg, useArg?: ExpressUseArg): void;
  get(string_or_useArg: string | ExpressUseArg, useArg?: ExpressUseArg): void;
  post(string_or_useArg: string | ExpressUseArg, useArg?: ExpressUseArg): void;
};

declare class ExpressApp extends ExpressRouter {
  listen(port: number): void;
};