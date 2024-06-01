import { Router } from "express";
import { checkPhone, checkEmail, verifyAccessToken, verifyRefreshToken, verifyAdminToken, validateNewUserFields, verifyUserUpdateFields, verifyPasswordLength, checkValidationErrors } from "../../utils/middlewares";
import IdentityController from './identity.controller';

class IdentityRouter{
    identityController : IdentityController;
    constructor(UserController: IdentityController){
        this.identityController = UserController;
    }
    getRouter = () => {
        const router = Router();
        router.post('/register', [validateNewUserFields, verifyPasswordLength ,checkPhone, checkEmail, checkValidationErrors] ,this.identityController.register);
        router.post('/login', checkEmail ,this.identityController.login);
        router.get('/logout',[verifyAccessToken], this.identityController.logout);
        router.get('/me', [verifyAccessToken] , this.identityController.me);
        router.patch('/me',[verifyUserUpdateFields ,verifyAccessToken], this.identityController.updateProfile);
        router.post('/refresh-token', [verifyRefreshToken], this.identityController.refreshToken);
        router.post('/change-password',[verifyAccessToken], this.identityController.changePassword);
        router.post('/forgot-password',[checkEmail, checkPhone], this.identityController.forgotPassword);
        router.post('/reset-password', this.identityController.resetPassword);
        router.post('/set-new-password', [verifyPasswordLength], verifyAccessToken,this.identityController.setNewPasword);
        router.post('/issue-otp',[checkEmail, checkPhone], this.identityController.issueOTP);

        router.get('/users',[verifyAdminToken], this.identityController.getAllUsers);
        router.get('/users/:id',[verifyAdminToken], this.identityController.getUserById);
        router.put('/users/:id',[verifyUserUpdateFields ,verifyAdminToken, checkValidationErrors], this.identityController.updateUser);
        router.delete('/users/:id',[verifyAdminToken], this.identityController.deleteUser);


        return router;
    }
}

export default IdentityRouter;