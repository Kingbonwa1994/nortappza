import { Client, Account, Models } from "react-native-appwrite";

export async function POST(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: any; data?: Models.User<Models.Preferences>; }): any; new(): any; }; }; }) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.PROJECT_ID as string);

    const account = new Account(client);

    // Authenticate user
    await account.createEmailPasswordSession(email, password);

    // Fetch user details
    const user = await account.get();

    return res.status(200).json({ data: user });
  } catch (error: any) {
    console.error("Appwrite Error:", error);
    return res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
}
