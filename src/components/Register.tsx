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
import api from "@/api/axios"
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/register', { ...data })
      reset()
      toast.success(response.data.message)
      navigate('/')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-screen h-screen bg-stone-100 py-5 flex items-center justify-center" >
      <Card className="w-11/12 md:w-7/12 lg:w-4/12" >
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account by entering your email and password below.
          </CardDescription>
        </CardHeader>

        <CardContent >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ayush Sharma"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 ms-1 -mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
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
                {errors.password && <p className="text-sm text-red-500 ms-1 -mt-1">{errors.password.message}</p>}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value: any) => value === watch("password") || "Password do not match"
                  })}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500 ms-1 -mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <CardFooter className="flex-1 w-full flex-col gap-2 p-0">
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <Button variant="link" className="w-full ms-auto"
                onClick={() => navigate("/")}
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