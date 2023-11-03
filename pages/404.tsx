import { Button } from "@nextui-org/react"
import Link from "next/link"
export default function Custom404() {
    return <div className="h-screen flex flex-col gap-2 items-center justify-center"> <h1>404 - Page Not Found</h1> <Button as={Link} href="/" color="danger"> ◁ Go back Home</Button></div>
  }