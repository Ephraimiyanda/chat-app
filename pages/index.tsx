import "../src/app/globals.css"
import SideCard from "../src/app/ui/activity"
import Stories from "../src/app/ui/stories"
import Messages from "../src/app/ui/messages"


export default function Homepage(){
    return(
        <div className="pr-3 grid grid-cols-10 gap-7 pt-2 -ml-[69px]">
        <div className="col-span-2 col-start-2 h-screen overflow-y-auto hidden sm:hidden xl:grid">
          <SideCard />
        </div>
        <div className="xl:col-span-4 xl:col-start-4 md:col-span-6 sm:col-start-2 sm:col-span-9 md:col-start-2 flex col-start-2 col-span-10 home">
          <Stories />
        </div>
        <div className="xl:col-span-2 h-[89vh] md:flex flex-col gap-4 overflow-y-auto hidden sm:col-start-8 sm:col-span-3 home pb-10 pr-2">
          <div>
            <Messages />
          </div>
          <div>
            <SideCard />
          </div>
        </div>
      </div>
    )
}