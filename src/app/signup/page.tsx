import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";
import OauthButtons from "src/components/ui/OauthButtons";
import SignUpTabs from "@/app/signup/SignUpTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup · News From Space",
};

export default async function Page() {
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
          <SignUpTabs />
        </CardBody>
      </Card>
    </div>
  );
}
