import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

export default function ResponseText({ text, message }: any) {
    return (
        <div className="flex flex-col gap-6 border bg-gray-100/30 rounded-lg p-3" >
            <div className="flex gap-2 flex-col" >
                <Label className="whitespace-pre-line font-semibold text-stone-800 line-clamp-2" >
                    {message}
                </Label>
                <Separator className="my-1 bg-stone-300" />
                {/* <Label className="whitespace-pre-line text-stone-600" >
                    {text}
                </Label> */}

                <div className="prose max-w-none prose-sm text-stone-600 whitespace-pre-line" >
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>

                <Label className="text-muted-foreground text-end text-sm" >
                    {new Date().toLocaleString()}
                </Label>
            </div>
        </div>
    )
}