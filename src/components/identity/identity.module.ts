import UserController from "./identity.controller";
import IdentityService from "./identity.service";
import UserRouter from "./identity.router";


const identityService = new IdentityService();
const identityController = new UserController(identityService);
const identityRouter = new UserRouter(identityController);

export default {
    service: identityService,
    controller: identityController,
    router: identityRouter.getRouter()
};