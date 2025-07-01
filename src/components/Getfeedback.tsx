import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle } from 'lucide-react'
import { useState } from "react";
import ResponseText from "./ResponseText";
import { useForm } from "react-hook-form";
import api from "@/api/axios"
import { toast } from "sonner";

export default function Getfeedback({
    response,
    setResponse,
    typeMessage,
    setTypeMessage,
}: any) {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            setTypeMessage(data.text)

            const res: any = await api.post('/feedback', { ...data });

            const feedbackText = res.data.data.candidates[0].content.parts[0].text;
            console.log(feedbackText)
            setResponse(feedbackText)

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Get AI-Powered Feedback</CardTitle>
                <CardDescription>Paste your response or short essay below and click "Get Feedback" to receive helpful suggestions from AI.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" >
                    {response === "" ? (
                        <div className="grid gap-2" >
                            <Label>Enter your Text Response</Label>
                            <Textarea
                                className="h-[100px]"
                                placeholder="Type your paragraph, answer, or idea here..."
                                {...register("text", {
                                    required: "Text is required",
                                    maxLength: {
                                        value: 400,
                                        message: "Max 400 characters are allowed"
                                    }
                                })}
                            />
                            {errors.text && (<p className="text-red-500 text-sm ms-1 -mt-1" >
                                {errors.text.message}
                            </p>)}
                            <p className="text-xs text-end text-muted-foreground ms-1 -mt-1">
                                No more than 400 characters.
                            </p>
                        </div>) : (<ResponseText
                            message={typeMessage}
                            text={response} />
                    )}

                    {
                        response === "" ? (
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center gap-2" >
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                        Getting Feedback...
                                    </div>) : (
                                    "Get Feedback"
                                )}
                            </Button>
                        ) : (
                            <button type="button" className="bg-red-500 text-white rounded-lg py-2 font-semibold cursor-pointer" onClick={() => {
                                setResponse("")
                            }} >clear</button>
                        )
                    }

                </form>
            </CardContent >
        </Card >

    )
}