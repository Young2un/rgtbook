import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const serverClient = createClient();
  const { data } = await serverClient.from("books").select();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      home
    </main>
  );
}
