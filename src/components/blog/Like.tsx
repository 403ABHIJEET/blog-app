import { EmptyHeartSvg, FilledHeartSvg } from "@/util/svgs";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { useDebounceCallback } from 'usehooks-ts';

interface props {
    blogId: number
}

export default function Like({ blogId } : props) {

    const { data: session, status } = useSession();
    const [liked, setLiked] = useState<boolean>(false)
    const [numberOfLiked, setNumberOfLiked] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchLiked = async() => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const fetchNumberOfLiked = async() => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/like/${blogId}`)
            if(response.data) {
                if(response.data.data) {
                    setNumberOfLiked(response.data.data)
                }
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const oncLikeClient = () => {
        if(liked) {
            setNumberOfLiked(numberOfLiked - 1)
        } else {
            setNumberOfLiked(numberOfLiked + 1)
        }
        setLiked(!liked)
    }

    const onLikeServer = async() => {
        try {
            const email = session?.user.email
            if(liked) {
                await axios.delete(`/api/like?userEmail=${email}&blogId=${blogId}`)
            } else {
                await axios.post(`/api/like`, {
                    userId: session?.user.id,
                    blogId: blogId
                }) 
            }        
        } catch (error) {
            console.log(error)
        }
    }

    const debounced = useDebounceCallback(onLikeServer, 1000)

    useEffect(() => {
        if(status === "loading" || status === "unauthenticated") {
            return
        }
        if(status === "authenticated") {
            fetchLiked()
        }
        fetchNumberOfLiked()
    }, [status])

    return (
        <Button
            variant="ghost"
            className="p-0 m-0 hover:bg-gray-300 bg-none rounded-4xl"
            disabled={status === "loading" || status === "unauthenticated" || loading}
            onClick={() => {
                oncLikeClient()
                debounced()
            }}
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
