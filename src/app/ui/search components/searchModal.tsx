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
  Skeleton,
  Card,
} from "@nextui-org/react";

interface user {
  avatar: any;
  name: string;
  _id: string;
  email: string;
}

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../../public/context/AppContext";
import { AiOutlineClose } from "react-icons/ai";
import FollowFollowingUi from "../AccountUi/followFollowingUi";
import FollowUnfollowBtn from "../buttons/followButtons";

export default function SearchModal() {
  const [selected, setSelected] = useState<string | any>("accounts");
  const [searchParams, setSearchParams] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [errorMessage,setErrorMessage]=useState(false)
  const [loading, setLoading] = useState(false); // Loading state
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { showSearchbar, setShowSearchbar } = useContext(AppContext);
  const { followerArray } = useContext(AppContext);

  const myLoader = () => {
    if (selected === "accounts") {
      return (
        <div className="flex flex-wrap gap-2 h-full w-full">
          <Card className="w-[140px] h-[180px] flex flex-col gap-1 items-center justify-center">
            <Skeleton className="w-[80px] h-[80px] rounded-[50%]"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
          </Card>
          <Card className="w-[140px] h-[180px] flex flex-col gap-1 items-center justify-center">
            <Skeleton className="w-[80px] h-[80px] rounded-[50%]"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
          </Card>
          <Card className="w-[140px] h-[180px] flex flex-col gap-1 items-center justify-center">
            <Skeleton className="w-[80px] h-[80px] rounded-[50%]"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
          </Card>
          <Card className="w-[140px] h-[180px] flex flex-col gap-1 items-center justify-center">
            <Skeleton className="w-[80px] h-[80px] rounded-[50%]"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
            <Skeleton className="w-[120px] h-3 rounded-md"></Skeleton>
          </Card>
        </div>
      );
    } else if (selected === "posts") {
      <div className="flex flex-wrap gap-2">
        <Card className="w-[140px] h-full flex flex-col gap-1 items-center justify-center">
          <Skeleton className="w-[120px] h-3"></Skeleton>
        </Card>
        <Card className="w-[140px] h-full flex flex-col gap-1 items-center justify-center">
          <Skeleton className="w-[120px] h-3"></Skeleton>
        </Card>
        <Card className="w-[140px] h-full flex flex-col gap-1 items-center justify-center">
          <Skeleton className="w-[120px] h-3"></Skeleton>
        </Card>
        <Card className="w-[140px] h-full flex flex-col gap-1 items-center justify-center">
          <Skeleton className="w-[120px] h-3"></Skeleton>
        </Card>
        <Card className="w-[140px] h-full flex flex-col gap-1 items-center justify-center">
          <Skeleton className="w-[120px] h-3"></Skeleton>
        </Card>
      </div>;
    }
  };

  const search = async () => {
    try {
      if (searchParams.length > 0) {
        setLoading(true); // Set loading state to true
        const res = await fetch(
          `https://ephraim-iyanda.onrender.com/user/search/${selected}/${searchParams}`,
          { cache: "force-cache" }
        );
        const searchRes = await res.json();
        setSearchedItems(searchRes.results);
        // Set loading state to false when results are available
        setLoading(false);
        setErrorMessage(false) 
        if(searchRes.results.length===0){
          setErrorMessage(true)
        }
      } else {
        setSearchedItems([]); // Clear the searchItems array if searchParams is empty
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading state to false on error
    }
  };
  useEffect(() => {
    if (showSearchbar) {
      onOpen();
    }
  }, [showSearchbar]);

  const close = () => {
    onClose();
    setShowSearchbar(false);
    setSearchParams("");
    setSearchedItems([]);
  };
  return (
    <Modal
      isDismissable={false}
      scrollBehavior="inside"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="sm:max-h-[70vh] sm:max-w-[70vh] sm:w-full sm:h-full h-[100svh] "
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col ">
              <Button
                onClick={close}
                isIconOnly
                className="bg-white w-[30px] ml-auto hover:bg-slate-200 -mt-2 p-0"
              >
                <AiOutlineClose size={15} />
              </Button>
              <div className="flex flex-col gap-2">
                <Input
                  className="mt-3"
                  autoFocus
                  endContent={
                    <Image
                      className="h-6 mb-auto   mt-1 pt-1 "
                      src={bb}
                      alt="search"
                      width={20}
                      height={10}
                    />
                  }
                  placeholder="what are you searching for ..."
                  variant="bordered"
                  value={searchParams}
                  onValueChange={setSearchParams}
                  onKeyUp={()=>{
                    setTimeout(()=>{
                      search()
                    },500)
                  }}
                />
                <Tabs
                  color="primary"
                  aria-label="options"
                  radius="md"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  variant="bordered"
                >
                  <Tab
                    key="accounts"
                    title="people"
                    onClick={() => setSearchedItems([])}
                  />
                  <Tab
                    key="posts"
                    title="posts"
                    onClick={() => setSearchedItems([])}
                  />
                </Tabs>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="flex flex-wrap gap-3 py-3 h-full w-full">
                {loading // Display a loading state
                  ? myLoader()
                  : searchedItems.length > 0
                  ? // Render search results based on selected type
                    selected === "accounts"
                    ? searchedItems.map((user: user, index: number) => {
                        const { avatar, name, _id, email } = user;

                        return (
                          <div
                            className="px-3 py-3  bg-white flex flex-col gap-1 items-center justify-center w-[140px] h-[190px] border border-stone-200 shadow-sm rounded-xl"
                            key={_id}
                          >
                            {avatar ? (
                              <Image
                                className="w-[80px] h-[80px] rounded-[50%]"
                                src={avatar}
                                alt={`${name}'s avatar`}
                                height={100}
                                width={100}
                              ></Image>
                            ) : (
                              <Skeleton
                                isLoaded={false}
                                className="w-[80px] h-[80px] rounded-[50%]"
                              ></Skeleton>
                            )}

                            {name ? (
                              <Link
                                className="text-black  text-center"
                                href={`/Accounts/${_id}`}
                              >
                                {" "}
                                <span className="text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis w-[120px]">
                                  {name}
                                </span>
                              </Link>
                            ) : (
                              <Skeleton className="w-full h-3"></Skeleton>
                            )}
                            <p className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[120px]">
                              {email}
                            </p>

                            {_id ? (
                              <FollowUnfollowBtn
                                _id={_id}
                                following={
                                  followerArray && followerArray.includes(_id)
                                    ? false
                                    : true
                                }
                              />
                            ) : (
                              <Skeleton className="w-[100px] h-3"></Skeleton>
                            )}
                          </div>
                        );
                      })
                    : selected === "posts"
                    ? searchedItems.map((post: any, index: number) => (
                        <Link href={`/#${post._id}`} onClick={close}>
                          <Image
                            src={post.content}
                            alt={`${post.text}`}
                            width={100}
                            height={100}
                            className="w-[140px] h-[140px] object-contain"
                          />
                        </Link>
                      ))
                    : null
                  : null}
              </div>
              {errorMessage&&(
                <div className="flex flex-col absolute m-auto top-[50%] w-full justify-center items-center"><p>  Nothing mathes your search !!</p></div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
