import { ID, Account, Client } from 'react-native-appwrite'

const appwriteClient = new Client()

const APPWRITE_ENDPOINT: string = process.env.ENDPOINT || '';
const APPWRITE_PROJECT_ID:string = process.env.PROJECT_ID || '';

type CreateUserAccount = {
  email: string;
  password: string;
  name: string
}

type LoginUserAccount = {
  email: string;
  password: string;
}

class AppwriteService {
  account;

  constructor(){
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)

    this.account = new Account(appwriteClient)
  }

  //create a new record of user inside appwrite

  async createAccount({email, password, name}: CreateUserAccount){
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )
      if (userAccount) {
        //TODO: create login feature
        return this.login({email, password})
      } else {
        return userAccount
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount() :: " + error);
    }
    
  }
  

  async login({email, password}: LoginUserAccount){
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.log("Appwrite service :: loginAccount() :: " + error);
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get()
    } catch (error) {
      console.log("Appwrite service :: getCurrentAccount() :: " + error);
    }
  }

  async logout(){
    try {
      return await this.account.deleteSession('current')
    } catch (error) {
      console.log("Appwrite service :: getCurrentAccount() :: " + error);
    }
  }
}

export default AppwriteService