import { Client, Databases, ID, Models } from "react-native-appwrite";

export async function POST(req: { body: { email: any; password: any; username: any; role: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data?: Models.Document; error?: string; }): void; new(): any; }; }; }) {
  
  const { email, password, username, role } = req.body;

    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    
    .setProject(process.env.PROJECT_ID as string)
    .setPlatform(process.env.PLATFORM_ID as string);

  const databases = new Databases(client);

  try {
    const response = await databases.createDocument(
      process.env.DATABASE_ID as string,
      'users',
      ID.unique(),
      { email, password, username, role }
    );
    res.status(200).json({ data: response });
    console.log('signup success');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
    console.error(error + 'signup error');
  }
}