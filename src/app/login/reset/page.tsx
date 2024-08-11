import { Card, CardBody } from "@nextui-org/card";
import ResetPassword from "./ResetPassword";

export default async function Page() {
  return (
    <div className="mx-auto flex w-5/6 flex-row justify-center">
      <Card className="w-full max-w-[400px] py-1">
        <CardBody>
          <ResetPassword />
        </CardBody>
      </Card>
    </div>
  );
}
