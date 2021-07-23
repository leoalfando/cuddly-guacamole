import {
    Router,
    Request,
    Response,
    NextFunction,
} from 'express';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
    middlewareWrappers: Wrapper[],
    router: Router,
): void => {
    for (let i = 0; i < middlewareWrappers.length; i += 1) {
        const middleware = middlewareWrappers[i];
        middleware(router);
    }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router): void => {
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};
