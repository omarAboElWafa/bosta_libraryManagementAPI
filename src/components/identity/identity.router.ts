import { Router } from "express";
import { checkPhone, checkEmail, verifyAccessToken, verifyRefreshToken, verifyAdminToken } from "../../utils/middlewares";
import IdentityController from './identity.controller';

class IdentityRouter{
    identityController : IdentityController;
    constructor(UserController: IdentityController){
        this.identityController = UserController;
    }
    getRouter = () => {
        const router = Router();
        router.post('/register', [checkPhone, checkEmail] ,this.identityController.register);
        router.post('/login', checkEmail ,this.identityController.login);
        router.get('/logout',[verifyAccessToken], this.identityController.logout);
        router.get('/me', [verifyAccessToken] , this.identityController.me);
        router.patch('/update-profile',[verifyAccessToken], this.identityController.updateProfile);
        router.post('/refresh-token', [verifyRefreshToken], this.identityController.refreshToken);
        router.post('/change-password',[verifyAccessToken], this.identityController.changePassword);
        router.post('/forgot-password',[checkEmail, checkPhone], this.identityController.forgotPassword);
        router.post('/reset-password', this.identityController.resetPassword);
        router.post('/set-new-password', verifyAccessToken,this.identityController.setNewPasword);
        router.post('/verify-email', checkEmail ,this.identityController.verifyEmail);
        router.post('/verify-phone',[verifyAccessToken], this.identityController.verifyPhone);
        router.post('/issue-otp',[checkEmail, checkPhone], this.identityController.issueOTP);

        // admin routes
        router.get('/all-users',[verifyAdminToken], this.identityController.getAllUsers);
        router.get('/user/:id',[verifyAdminToken], this.identityController.getUserById);
        router.post('/update-user/:id',[verifyAdminToken], this.identityController.updateUser);
        router.delete('/delete-user/:id',[verifyAdminToken], this.identityController.deleteUser);
        router.post('/new-admin', this.identityController.registerAdmin);
        router.get('/all-admins',[verifyAdminToken], this.identityController.getAllAdmins);


        return router;
    }
}

export default IdentityRouter;