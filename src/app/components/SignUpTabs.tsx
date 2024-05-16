"use client";
import { Tab, Tabs } from "@nextui-org/react";
import SignUpEmailLink from "./SignUpEmailLink";
import SignUpEmailPassword from "./SignUpEmailPassword";

const SignUpTabs = () => {
  return (
    <Tabs
      classNames={{ tabList: "w-full" }}
      className="px-1"
      aria-label="Signup Options"
    >
      <Tab key="passwordless" title="Passwordless">
        <SignUpEmailLink />
      </Tab>
      <Tab key="password" title="Password">
        <SignUpEmailPassword />
      </Tab>
    </Tabs>
  );
};

export default SignUpTabs;
