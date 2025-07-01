import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "@radix-ui/react-label"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import api from "@/api/axios"
import { toast } from "sonner"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const res = await api.post('/auth/forget-password', { ...data })
      navigate('/')
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-stone-100 flex items-center justify-center" >
      <Card className="w-11/12 md:w-7/12 lg:w-4/12" >
        <CardHeader>
          <CardTitle>Forget Password</CardTitle>
          <CardDescription>Enter your email, current password, and new password to update your account credentials.</CardDescription>
        </CardHeader>

        <CardContent >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', {
                    required: "Email is required"
                  })}
                />
                {errors.email && <p className="text-sm text-red-500 ms-1 -mt-1">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Old Password</Label>
                </div>
                <Input id="password" type="password"
                  {...register('password', {
                    required: "Password is required"
                  })}
                />
                {errors.password && <p className="text-sm text-red-500 ms-1 -mt-1">{errors.password.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="newPassword">New Password</Label>
                </div>
                <Input id="newPassword" type="password"
                  {...register('newPassword', {
                    required: "New Password is require",
                    minLength: {
                      value: 6,
                      message: "New Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.newPassword && <p className="text-sm text-red-500 ms-1 -mt-1">{errors.newPassword.message}</p>}
              </div>
            </div>
            <CardFooter className="mt-6 flex-1 w-full flex-col gap-2 p-0">
              <Button type="submit" className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2" >
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Updating...
                  </div>) : (
                  "Update"
                )}
              </Button>
              <Button variant="link" className="w-full ms-auto"
                onClick={() => {
                  navigate("/")
                }}
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

    </div >
  )
}