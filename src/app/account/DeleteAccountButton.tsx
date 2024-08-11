"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { deleteUser } from "../actions";
import { Button } from "@nextui-org/button";

const DeleteAccountButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="text-sm font-medium"
        size="sm"
        variant="light"
        color="danger"
        onPress={onOpen}
      >
        Delete Account
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Account
              </ModalHeader>
              <ModalBody>
                <p>Confirm that you wish to delete your account</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="text-sm font-medium"
                  variant="light"
                  onPress={() => {
                    deleteUser();
                  }}
                  color="danger"
                >
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;
