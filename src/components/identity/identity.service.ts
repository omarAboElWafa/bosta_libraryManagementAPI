import Identity from './identity.repository'; 
import { IUser } from '@/contracts/user';
import * as cache from "../../utils/cache";
import { REFRESH_TOKEN_EXPIRY_FOR_CACHE } from '../../utils/config';

class IdentityService {
    private identityRepository: Identity;
    constructor(){
        this.identityRepository = new Identity();
    }

    addUser = async (user: IUser) => {
        try{
            const newUSer = await this.identityRepository.create(user);
            return newUSer;
        } catch(error){
            throw error;
        }
    }
    findUserByEmail = async (email: string) => {
        try{
            return await this.identityRepository.getOneBy({email: email});
        } catch(error){
            throw error;
        }
    }

    findUserById = async (id: string, fullUser:boolean = false) => {
        try{
            return await this.identityRepository.getById(id);
        } catch(error){
            throw error;
        }
    }


    updateUser = async (id: string, toBeUpdated : Object) => {
        try{
            return await this.identityRepository.update(id, toBeUpdated);
        } catch(error){
            throw error;
        }
    }

    // admin methods
    getAllUsers = async () => {
        try{
            return await this.identityRepository.getAll();
        } catch(error){
            throw error;
        }
    }

    deleteUser = async (id: string) => {
        try{
            return await this.identityRepository.delete(id);
        } catch(error){
            throw error;
        }
    }



    //token related methods
    storeToken = async (id: string, token: string, expiresIn : number) => {
        const tokensCacheClient = cache.tokenClientPool;
        const stored =  await cache.setToCache(tokensCacheClient, id, token, expiresIn);
        
        return stored;
    }

    findToken = async (id: string) => {
        const tokensCacheClient = cache.tokenClientPool;
        const token =  await cache.getFromCache(tokensCacheClient, id);
        
        return token;
    }

    isRefreshTokenBlacklisted = async (id: string) => {
        const tokensCacheClient = cache.tokenClientPool;
        const blacklistedUser = await cache.getFromCache(tokensCacheClient, `${id}-blacklisted`);
        
        return !!blacklistedUser;
    }

    whitelistRefreshToken = async (id: string) => {
        const tokensCacheClient = cache.tokenClientPool;
        const whiteListed =  await cache.deleteFromCache(tokensCacheClient, `${id}-blacklisted`);
        
        return whiteListed;
    }

    blacklistRefreshToken = async (id: string) => {
        const tokensCacheClient = cache.tokenClientPool;
        const blacklisted =  await cache.setToCache(tokensCacheClient, `${id}-blacklisted`, 'true', REFRESH_TOKEN_EXPIRY_FOR_CACHE);
        
        return blacklisted;
    }

    deleteToken = async (id: string) => {
        const tokensCacheClient = cache.tokenClientPool;
        const deleted = await cache.deleteFromCache(tokensCacheClient, id);
        
        return deleted;
    }

}

export default IdentityService;