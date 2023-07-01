import Image from "next/image"
import baby from "./images/Jonathan_Kent_Arrow_Earth-38_0001.png"
import share from "./images/share.png"
import comment from "./images/comment.png"
import like from "./images/like.png"
import bookmark from "./images/bookmark.png"
export default function Stories(){
    return(
        <div className=" home overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 lg:pl-0  pb-14">
            <section className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full" >
                <Image
                className="story-picture rounded-lg "
                src={baby}
                alt="story picture"
                />
              <div className="flex justify-between mt-2">
              <div className="flex gap-2 ">
                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={like}
                    alt="like"
                    />
                    </button>

                   <button className=" p-2">
                   <Image
                   className="w-5"
                    src={comment}
                    alt="comment"
                    />
                   </button>

                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={share}
                    alt="share"
                    />
                    </button>

                </div>
                <button className=" p-2">
                    <Image
                    className="w-4"
                    src={bookmark}
                    alt="bookmark"
                    />
                </button>
              </div>

            </section>
            <section className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full" >
                <Image
                className="story-picture rounded-lg "
                src={baby}
                alt="story picture"
                />
              <div className="flex justify-between mt-2">
              <div className="flex gap-2 ">
                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={like}
                    alt="like"
                    />
                    </button>

                   <button className=" p-2">
                   <Image
                   className="w-5"
                    src={comment}
                    alt="comment"
                    />
                   </button>

                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={share}
                    alt="share"
                    />
                    </button>

                </div>
                <button className=" p-2">
                    <Image
                    className="w-4"
                    src={bookmark}
                    alt="bookmark"
                    />
                </button>
              </div>

            </section>
            <section className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full" >
                <Image
                className="story-picture rounded-lg "
                src={baby}
                alt="story picture"
                />
              <div className="flex justify-between mt-2">
              <div className="flex gap-2 ">
                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={like}
                    alt="like"
                    />
                    </button>

                   <button className=" p-2">
                   <Image
                   className="w-5"
                    src={comment}
                    alt="comment"
                    />
                   </button>

                    <button className=" p-2">
                    <Image
                    className="w-5"
                    src={share}
                    alt="share"
                    />
                    </button>

                </div>
                <button className=" p-2">
                    <Image
                    className="w-4"
                    src={bookmark}
                    alt="bookmark"
                    />
                </button>
              </div>

            </section>
        </div>
    )
}