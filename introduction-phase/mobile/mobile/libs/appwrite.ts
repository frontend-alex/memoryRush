import {
  Client,
  Account,
  ID,
  Databases,
  OAuthProvider,
  Avatars,
  Query,
  Storage,
  Permission,
  Role,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { useGlobalContext } from "./global-provider";

export const config = {
  platform: "com.memoryRush.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  levelCollectionId: process.env.EXPO_PUBLIC_APPWRITE_LEVEL_COLLECTION_ID,
  userGamesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GAMES_COLLECTION_ID,
};

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function loginWithProvider(provider: OAuthProvider) {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(provider, redirectUri);
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success") throw new Error("OAuth login failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("OAuth login failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    const user = await account.get();
    if (!user) throw new Error("User not found");

    console.log("Authenticated User:", user);

    let existingUser;
    try {
      existingUser = await databases.listDocuments(
        config.databaseId!,
        config.userCollectionId!,
        [Query.equal("userId", user.$id)]
      );
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Failed to check user in database");
    }

    if (existingUser.documents.length === 0) {
      try {
        await databases.createDocument(
          config.databaseId!,
          config.userCollectionId!,
          ID.unique(),
          {
            userId: user.$id,
            name: user.name,
            avatar: user.name ? avatar.getInitials(user.name) : "",
            provider,
          },
          [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
        console.log("User saved in database.");
      } catch (error) {
        console.error("Error saving user to database:", error);
        throw new Error("Failed to save user in database");
      }
    } else {
      console.log("User already exists in database.");
    }

    return true;
  } catch (error) {
    console.error("OAuth Login Error:", error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesByUserId() {
  try {
    const user = await account.get();

    if (user.$id) {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.userGamesCollectionId!,
        [Query.equal("userId", user.$id)]
      );

      return response;
    }
  } catch (error) {
    console.error("Error fetching user documents:", error);
  }
}

export async function getAllLevel() {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.levelCollectionId!
    );
    return response;
  } catch (error) {
    console.error("Error getting data from collection:", error);
  }
}

export async function getLevelById(params: { id: string }) {
  try {
    const { id } = params;

    console.log(params);

    const response = await databases.getDocument(
      config.databaseId!,
      config.levelCollectionId!,
      id
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

export const saveGameData = async (
  levelId: string | string [], 
  gameDetails: { timeTaken: number; score: number; bestScore: number }
) => {
  try {
    const user = await account.get();
    const userId = user.$id;
    const { timeTaken, score } = gameDetails;

    const response = await databases.listDocuments(
      config.databaseId!,
      config.userGamesCollectionId!,
      [Query.equal("userId", userId), Query.equal("levelId", levelId)]
    );

    if (response.documents.length > 0) {
      const existingDoc = response.documents[0];

      const updatedBestScore = Math.max(existingDoc.bestScore, score);

      const res = await databases.updateDocument(
        config.databaseId!,
        config.userGamesCollectionId!,
        existingDoc.$id,
        {
          timeTaken,
          score,
          bestScore: updatedBestScore,
        }
      );

      return res;
    } else {
      const res = await databases.createDocument(
        config.databaseId!,
        config.userGamesCollectionId!,
        ID.unique(),
        {
          userId,
          levelId, 
          timeTaken,
          score,
          bestScore: score,
        }
      );
      return res;
    }
  } catch (error) {
    console.error("Error saving game data:", error);
  }
};
