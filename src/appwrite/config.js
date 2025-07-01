import importEnv from "../importEnv/importEnv";
import { Permission,Role,Client,ID, Databases,Storage,Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(importEnv.appwriteUrl)
            .setProject(importEnv.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch(err){
            console.log("AppWrite :: createPost :: error",err);
        }
    }

    async updatePost(slug,{title,content,status,featuredImage}){
        try{
            return await this.databases.updateDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(err){
            console.log("AppWrite :: updatePost :: error",err);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug
            )
            return true;
        } catch(err){
            console.log("AppWrite :: daletePost :: error",err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug
            )
        } catch(err){
            console.log("AppWrite :: getPost :: error",err);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                queries
            )
        } catch(err){
            console.log("AppWrite :: getPosts :: error",err);
            return false;
        }
    }

    // File upload services
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                importEnv.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch(err){
            console.log("AppWrite :: uploadFile :: error",err);
            return false;
        }
    }

    // File delete service
    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                importEnv.appwriteBucketId,
                fileId
            )
            return true;
        } catch(err){
            console.log("AppWrite :: deleteFile :: error",err);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            importEnv.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;