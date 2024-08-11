import { createClient } from "@/app/utils/supabase/server";
import { Card, CardBody } from "@nextui-org/card";
import { redirect } from "next/navigation";
import ChangeAccountEmail from "./ChangeAccountEmail";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex w-5/6 flex-row justify-center">
      <Card className="w-full max-w-[400px] py-1">
        <CardBody>
          <ChangeAccountEmail />
        </CardBody>
      </Card>
    </div>
  );
}
