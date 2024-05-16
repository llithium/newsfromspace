"use client";
import { Tab, Tabs } from "@nextui-org/react";
import LogInEmailLink from "./LogInEmailLink";
import LoginEmailPassword from "./LogInEmailPassword";

const LoginTabs = () => {
  return (
    <Tabs
      classNames={{ tabList: "w-full" }}
      className="px-1"
      aria-label="Login Options"
    >
      <Tab key="passwordless" title="Passwordless">
        <LogInEmailLink />
      </Tab>
      <Tab key="password" title="Password">
        <LoginEmailPassword />
      </Tab>
    </Tabs>
  );
};

export default LoginTabs;
