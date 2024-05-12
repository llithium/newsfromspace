import { Card, CardBody } from "@nextui-org/react";
import OauthButtons from "@/components/OauthButtons";
import SignUpEmailLink from "@/components/SignUpEmailLink";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-5/6 flex-row justify-center">
      <Card className="w-full max-w-[400px] py-1">
        <OauthButtons />
        <CardBody>
          <SignUpEmailLink />
          {/* <SignUpEmailPassword /> */}
        </CardBody>
      </Card>
    </div>
  );
}
