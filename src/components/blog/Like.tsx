import { EmptyHeartSvg, FilledHeartSvg } from "@/util/svgs";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface props {
    blogId: number
}

export default function Like({blogId } : props) {

    const { data: session, status } = useSession();
    const [liked, setLiked] = useState<boolean>(false)
    const [numberOfLiked, setNumberOfLiked] = useState<number>(0)

    const fetchLiked = async() => {
        try {
            const email = session?.user.email
            const response = await axios.get(`/api/like?userEmail=${email}&blogId=${blogId}`)
            if(response.data) {
                if(response.data.data) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchNumberOfLiked = async() => {
        try {
            const response = await axios.get(`/api/like/${blogId}`)
            if(response.data) {
                if(response.data.data) {
                    setNumberOfLiked(response.data.data)
                }
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(status === "loading" || status === "unauthenticated") {
            return
        }
        fetchLiked()
        fetchNumberOfLiked()
    }, [status])

    return (
        <Button
            variant="ghost"
            className="p-0 m-0 hover:bg-gray-300 bg-none rounded-4xl"
            disabled={status === "loading" || status === "unauthenticated"}
        >
            {
                (status === "loading" || status === "unauthenticated" || !liked) ? (
                    <EmptyHeartSvg />
                ) : (
                    <FilledHeartSvg />
                )
            }
            <span className="text-black">{numberOfLiked}</span>
        </Button>
    );
}
