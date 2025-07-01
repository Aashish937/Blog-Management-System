import importEnv from "../importEnv/importEnv";

import { Client, Account, ID } from "appwrite";

// Authentication using Appwrite
class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(importEnv.appwriteUrl)
            .setProject(importEnv.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // call another method
                return this.login({email,password});
            }
            else {
                return userAccount;
            }
        } catch(err){
            throw err;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        } catch(err){
            throw err;
        }
        return null;
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } catch(err){
            console.log("AppWrite service :: getCurrentUser :: missing", err);
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        } catch(err){
            console.log("AppWrite service :: logout :: having some error",err);
        }
    }
};

const authService = new AuthService();

export default authService;