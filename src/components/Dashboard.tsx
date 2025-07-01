import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Getfeedback from "./Getfeedback"
import Gethistory from "./Gethistory"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useState } from "react"

export default function Dashboard() {
    const navigate = useNavigate()
    const [typeMessage, setTypeMessage] = useState("")
    const [response, setResponse] = useState("")

    return (
        <div className="relative max-w-screen min-h-screen pb-10 overflow-x-hidden bg-stone-100 flex pt-10 justify-center" >
            <Tabs defaultValue="field" className="w-11/12">
                <TabsList>
                    <TabsTrigger className="cursor-pointer hover:bg-white/80 duration-200 transition-all" value="field">Field</TabsTrigger>
                    <TabsTrigger className="cursor-pointer hover:bg-white/80 duration-200 transition-all" value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="field">
                    <Getfeedback
                        response={response}
                        setResponse={setResponse}
                        typeMessage={typeMessage}
                        setTypeMessage={setTypeMessage}
                    />
                </TabsContent>
                <TabsContent value="history">
                    <Gethistory />
                </TabsContent>
            </Tabs>
            <Button className="absolute top-5 right-5  cursor-pointer" variant="destructive"
                onClick={() => {
                    localStorage.clear()
                    navigate("/")
                    toast.success("Logged out!")
                }}
            >Logout</Button>
        </div>
    )
}