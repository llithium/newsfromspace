"use client";
import { Button } from "@nextui-org/react";
import { deleteUser } from "../actions";

const DeleteAccountButton = () => {
  return (
    <Button
      className="text-sm font-medium"
      size="sm"
      variant="light"
      onPress={() => {
        deleteUser();
      }}
      color="danger"
    >
      Delete Account
    </Button>
  );
};

export default DeleteAccountButton;
