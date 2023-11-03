import Image from "next/image";
import bb from "../images/Union.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {useState} from "react"
export default function SearchBar() {
  const [selected, setSelected] = useState<any>("people");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <div
        className="searchbar flex gap-1   h-10  rounded-3xl cursor-pointer  border-none pl-2 bg-body lg:w-[590px] w-[95%]  ml-[10px] "
        onClick={onOpen}
      >
        <Image
          className="h-6 mb-auto cursor-pointer  mt-2 pt-1 "
          src={bb}
          alt="search"
          width={20}
          height={10}
        />
        <input
          className=" w-[80%] bg-body focus:outline-none cursor-pointer"
          placeholder="search for creators,inspirations,projects..."
          type="text"
        />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="sm:max-h-[70vh] sm:max-w-[70vh] sm:w-full sm:h-full h-[100svh] "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                <Input
                  className="mt-3"
                  autoFocus
                  endContent={
                    <Image
                      className="h-6 mb-auto   mt-2 pt-1 "
                      src={bb}
                      alt="search"
                      width={20}
                      height={10}
                    />
                  }
                  placeholder="what are you searching for ..."
                  variant="bordered"
                />
                <Tabs
                  color="primary"
                  aria-label="options"
                  radius="md"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  variant="bordered"
                >
                  <Tab key="People" title="people" />
                  <Tab key="Posts" title="posts" />
                </Tabs>
              </ModalHeader>

              <ModalBody></ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
