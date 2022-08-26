import { ControllerAdapterType, MiddlewareArray } from '@interfaces/middleware';
import { IEndPointsController } from '@interfaces/presentation/controller';
import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UserRouter {
  constructor(
    @inject('FrameworkRouter') public router: Router,
    @inject('CreateUserController')
    private createUserController: IEndPointsController,
    @inject('ListUserController')
    private listUserController: IEndPointsController,
    @inject('CreateUserMiddlewares') private createMiddlewares: MiddlewareArray,
    @inject('ControllerAdapter')
    private controllerAdapter: ControllerAdapterType,
  ) {}

  protected setup(): Router {
    this.router.post(
      '/',
      this.createMiddlewares,
      this.controllerAdapter(this.createUserController),
    );
    this.router.get('/', this.controllerAdapter(this.listUserController));
    return this.router;
  }
}
