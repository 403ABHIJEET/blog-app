import Loading from "@/app/(app)/loading";
import { Comment } from "@/generated/prisma";
import axios from "axios";
import { useEffect, useState } from "react";

interface props {
  blogId: number
  parentId: number;
  level: number
}

export default function CommentSection({ blogId, parentId, level }: props) {

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
    
    const fetchData = async() => {
        setLoading(true)
        try {
            const response = await axios.get('/api/comment', {
                params: {
                    blogId: blogId,
                    parentId: parentId
                }
            })

            if(response.data) {
                setComments(response.data.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }   
    }

    useEffect(() => {
        fetchData()
    }, [])

    const toggleReplies = (id: number) => {
        showReplies[id] = true
        setShowReplies(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

  
    return (
        <div className="w-full pt-5">
            {comments.length ? (
                comments.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="w-full mb-10"
                      style={{ paddingLeft: `${level * 10}px` }}
                    >
                        <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />

                            <div className="p-2 rounded w-full break-words">
                                <p className="break-words">{comment.content}</p>
                                    <button
                                        className="text-sm text-blue-600 mt-1"
                                        onClick={() => toggleReplies(comment.id)}
                                    >
                                        {showReplies[comment.id] ? "Hide Replies" : "Show Replies"}
                                    </button>
                            </div>

                        </div>
                          
                        {
                            showReplies[comment.id] && (
                                <CommentSection blogId={blogId} parentId={comment.id} level={level + 1} />
                            )
                        }
                    </div>
                ))
            ) : <Loading />}
        </div>
    );
}
