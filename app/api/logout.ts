import { Client, Account } from "react-native-appwrite";

export async function POST(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: any; message?: string; }): any; new(): any; }; }; }) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID as string);

    const account = new Account(client);

    // Delete the current session (logs user out)
    await account.deleteSession("current");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
}
