import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import ResponseTextHistory from "./ResponseTextHistory";
import api from "@/api/axios"
import { toast } from "sonner";
import { Label } from "./ui/label";
import { LoaderCircle } from "lucide-react";

export default function Gethistory() {
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await api.post("/history", {
                    limit: 5
                });
                setHistory(res.data.data)
            } catch (error) {
                toast.error('Unable to fetch history');
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        < Card >
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>
                    Your past responses and feedback are saved here. Click a card to revisit the suggestions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Label className="mx-auto flex justify-center">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Loading
                    </Label>
                ) : history.length > 0 ? (
                    <div className="flex flex-col gap-3" >
                        {history.map((his: any) => (
                            <ResponseTextHistory
                                key={his._id}
                                message={his.user_input}
                                feedback={his.feedback}
                                createdAt={his.createdAt}
                            />
                        ))}
                    </div>
                ) : (
                    <Label className="text-center text-sm text-muted-foreground">
                        No history found.
                    </Label>
                )}
            </CardContent >
        </Card >

    )
}