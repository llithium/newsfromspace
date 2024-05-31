import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DeleteAccountButton from "./components/DeleteAccountButton";
import { Button, ButtonGroup } from "@nextui-org/button";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";

export const metadata: Metadata = {
  title: "Account · News From Space",
};

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <Card className="mx-auto w-full min-w-fit max-w-[500px] pt-2 md:w-[500px]">
        <CardBody className="flex flex-col gap-2">
          <p>
            Linked:{" "}
            {data.user.app_metadata.providers.map(
              (provider: string, index: number) => {
                index++;
                if (index === data.user.app_metadata.providers.length) {
                  return provider.charAt(0).toUpperCase() + provider.slice(1);
                } else {
                  return (
                    provider.charAt(0).toUpperCase() + provider.slice(1) + ", "
                  );
                }
              },
            )}
          </p>
          {data.user.app_metadata.providers[0] && (
            <div className="flex flex-wrap items-center  justify-between gap-3">
              <p>
                Account created with:{" "}
                {data.user.app_metadata.providers[0].charAt(0).toUpperCase() +
                  data.user.app_metadata.providers[0].slice(1)}
              </p>
              <div className="flex items-center gap-2">
                <p>{data.user.user_metadata.name}</p>
                <Image
                  height={40}
                  width={40}
                  alt={`Avatar from ${data.user.app_metadata.providers[0]}`}
                  src={data.user.user_metadata.avatar_url}
                />
              </div>
            </div>
          )}

          {data.user.email && (
            <div className="flex flex-col gap-2">
              <p className="w-fit">Email: {data.user.email}</p>
              <ButtonGroup className="w-full">
                <Button
                  as={Link}
                  href="/account/email"
                  className="w-full text-medium"
                  size="sm"
                >
                  Change Email
                </Button>
                <Button
                  as={Link}
                  href="/account/reset"
                  className="w-full text-medium"
                  size="sm"
                >
                  Change Password
                </Button>
              </ButtonGroup>
            </div>
          )}

          {data.user.phone && (
            <div className="flex flex-col gap-2">
              <p>Phone Number: {data.user.phone}</p>
              <Button className="w-26 text-medium" size="sm">
                Change Phone Number
              </Button>
            </div>
          )}
          <Spacer y={2} />
          <DeleteAccountButton />
        </CardBody>
      </Card>
    </>
  );
}
