import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import api from "@/api/axios"

export default function ProtectedRoute({ children }: { children: any }) {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

    const changePage = () => {
        navigate('/')
        toast.error("Login first")
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        console.log(token)

        if (!token) {
            return changePage();
        }

        (async () => {
            try {
                await api.post('/auth/validate', { token })
                console.log("this is trur")
                setIsVerified(true);
            } catch (error) {
                changePage()
            }
        })()

    }, [])

    if (!isVerified) return null;

    return (
        <>
            {children}
        </>
    );
}
