import "../../src/app/globals.css"
import SideCard from "@/app/ui/activity"
import Stories from "../../src/app/ui/stories"
import Messages from "../../src/app/ui/messages"


export default function Homepage(){
    return(
        <div className="pr-3 grid grid-cols-10 gap-7 ">
        <div className="col-span-2 col-start-2 h-screen overflow-y-auto hidden sm:hidden xl:grid">
          <SideCard />
        </div>
        <div className="xl:col-span-4 xl:col-start-4 md:col-span-6 md:col-start-2 flex col-start-2 col-span-9 home">
          <Stories />
        </div>
        <div className="xl:col-span-2 h-screen md:flex flex-col gap-4 overflow-y-auto hidden sm:col-start-8 sm:col-span-3">
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