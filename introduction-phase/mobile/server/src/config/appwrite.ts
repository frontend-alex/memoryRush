import { Client, Databases } from "appwrite";

export const config = {
  PORT: 3000,
  platform: "com.memoryRush.restate",
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '67b44bde0005b2cd0533',
  databaseId: '67bbbbd5001484c9736d',
  mutiplayerGameCollectionid:'67c1b4030028f86cc797',
};

const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)

const databases = new Databases(client);

export { databases };
