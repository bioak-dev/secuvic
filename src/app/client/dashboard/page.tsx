import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClientDashboard } from "@/components/client/ClientDashboard";
import { isDemoAllowed } from "@/lib/validation";

export default async function ClientDashboardPage() {
  const cookieStore = await cookies();
  const hasDemoCookie = cookieStore.get("vicd_demo")?.value === "true";
  const isDemo = hasDemoCookie && isDemoAllowed();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let isAuthenticated = false;

  if (supabaseUrl && supabaseKey) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    isAuthenticated = !!user;
  }

  if (!isAuthenticated && !isDemo) {
    redirect("/client/login");
  }

  return <ClientDashboard isDemo={isDemo && !isAuthenticated} />;
}
