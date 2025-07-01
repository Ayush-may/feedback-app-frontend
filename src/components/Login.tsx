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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "@/api/axios"
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";


export default function Login() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', {
        ...data
      })

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      reset()
      toast.success("Logged in")
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen bg-stone-100 flex items-center justify-center" >
      <Card className="w-11/12 md:w-7/12 lg:w-4/12" >
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"

                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 ms-1 -mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/forget-password")
                    }}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 ms-1 -mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <CardFooter className="flex-1 w-full flex-col gap-2 p-0">
              <Button type="submit" className="w-full" disabled={loading} >
                {loading ? (
                  <div className="flex items-center gap-2"  >
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Loging...
                  </div>) : (
                  "Login"
                )}
              </Button>
              <Button variant="link" className="w-full ms-auto"
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}