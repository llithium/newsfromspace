import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";
import OauthButtons from "src/components/ui/OauthButtons";
import { Metadata } from "next";
import LoginTabs from "./LoginTabs";

export const metadata: Metadata = {
  title: "Login · News From Space",
};

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/account");
  }
  return (
    <div className="mx-auto flex w-5/6 flex-row justify-center">
      <Card className="w-full max-w-[400px] py-1">
        <OauthButtons />
        <CardBody>
          <LoginTabs />
        </CardBody>
      </Card>
    </div>
  );
}
