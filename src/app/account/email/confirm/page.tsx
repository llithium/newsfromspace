import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-fit">
      <h2 className="text-2xl">
        Click the like sent to your Email to confirm your new email
      </h2>
    </div>
  );
}
