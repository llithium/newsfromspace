import { Card, CardBody } from "@nextui-org/react";
import OauthButtons from "@/components/OauthButtons";
import LogInEmailLink from "@/components/LogInEmailLink";

export default function LoginPage() {
  return (
    <div className="mx-auto w-fit">
      <Card className="w-[400px] py-1">
        <OauthButtons />
        <CardBody>
          <LogInEmailLink />
          {/* <LoginEmailPassword /> */}
        </CardBody>
      </Card>
    </div>
  );
}
