import { useRouter } from "next/router";
import { useEffect } from "react";



const Success = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/therapist/questionnaire');
    },[])
    return (
        <div className="bg-neutral">
            <div className="px-10 py-5">
                <p className="text-center text-sm font-bold">
                    Thank you for creating your account!<br/>
                    You will now be redirected to complete our questionnaire.
                </p>
            </div>
        </div>
    )
}

export default Success;