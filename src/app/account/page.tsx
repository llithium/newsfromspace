import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import DeleteAccountButton from "./components/DeleteAccountButton";
import { Card, CardBody, Image, Spacer } from "@nextui-org/react";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <Card className="mx-auto w-full min-w-fit max-w-[500px] pb-2 md:w-[500px]">
        <CardBody className="flex flex-col gap-2">
          {data.user.app_metadata.providers[1] && (
            <div className="flex flex-wrap items-center  justify-between gap-3">
              <p>
                Signed in with:{" "}
                {data.user.app_metadata.providers[1].charAt(0).toUpperCase() +
                  data.user.app_metadata.providers[1].slice(1)}
              </p>
              <div className="flex items-center gap-2">
                <p>{data.user.user_metadata.name}</p>
                <Image
                  height={40}
                  width={40}
                  alt={`Avatar from ${data.user.app_metadata.providers[1]}`}
                  src={data.user.user_metadata.avatar_url}
                />
              </div>
            </div>
          )}

          {data.user.email && <p>Email: {data.user.email}</p>}
          {data.user.phone && <p>Email: {data.user.phone}</p>}
          <Spacer y={2} />

          <DeleteAccountButton />
        </CardBody>
      </Card>
    </>
  );
}
