import "../src/app/globals.css";
import SideCard from "../src/app/ui/activity";
import Stories from "../src/app/ui/stories";
import Messages from "../src/app/ui/messages";

export default function Homepage() {
  return (
    <div className="homepage  flex m-auto justify-around xl:justify-between max-w-[75rem] gap-7 pt-2  overflow-y-auto  h-full ">
      <aside className="col-span-2 col-start-2 h-[90vh] overflow-y-auto hidden sm:hidden xl:grid w-[20%] pt-1 pr-1 pl-1">
        <SideCard />
      </aside>
      <main className="stories  flex  home  pr-1 ">
        <Stories />
      </main>
      <aside className=" xl:col-span-2 activity h-[90vh] md:flex xl:w-[22%] flex-col gap-4 overflow-y-auto hidden   pb-10 pr-1 pl-1 w-[25%] pt-1">
        <div>
          <Messages />
        </div>
        <div>
          <SideCard />
        </div>
      </aside>
    </div>
  );
}
