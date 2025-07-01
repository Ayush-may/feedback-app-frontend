import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown";

export default function ResponseTextHistory(
    { message, feedback, createdAt }: { message: string; feedback: string, createdAt: string }
) {
    return (
        <>
            <Dialog >
                <DialogTrigger asChild >
                    <Card className=" shadow-none border border-gray-300 bg-gray-100 cursor-pointer hover:bg-gray-200/80 duration-300 transition-all" >
                        <CardHeader>
                            <CardTitle line-clamp-1 >{message}</CardTitle>
                            <CardDescription className="line-clamp-2" >
                                {feedback}
                            </CardDescription>
                        </CardHeader>
                        <CardContent >
                            <p className="text-sm  text-muted-foreground text-end -mt-4" >{new Date(createdAt).toLocaleString()}</p>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className="max-h-10/12 min-w-11/12" >
                    {/* <DialogHeader>                    </DialogHeader> */}
                    <div className="max-h-[70vh] overflow-y-auto mt-4">
                        <Label className="font-semibold text-end pe-10 " >
                            <span className="block bg-stone-200 text-stone-800 p-5 rounded-xl font-normal text-start" >
                                {message}
                            </span>
                            <span className="block mt-2 font-normal text-sm text-gray-400" >
                                {new Date(createdAt).toLocaleString()}
                            </span>
                        </Label>
                        <div className="text-sm text-stone-600 whitespace-pre-line leading-normal">
                            <ReactMarkdown>{feedback}</ReactMarkdown>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}