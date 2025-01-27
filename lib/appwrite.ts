import { Client, Account, Databases, Storage } from 'react-native-appwrite';

const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = process.env.PROJECT_ID || '';
const platform = process.env.PLATFORM || '';

const client = new Client()
    .setProject(projectId)
    .setEndpoint(endpoint)
    .setPlatform(platform);
     
    
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export default client;
    
    