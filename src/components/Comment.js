import { useContext, useEffect, useState } from "react"
import commentsApi from "../api/comments"
import { UserContext } from "../context/UserContextProvider"

export default function Comment(props) {

    const { id, username, createTime, content, replies } = props.comment

    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const [readOnly, setReadOnly] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setReadOnly(false)
            setReplyContent("")
        } else {
            setReplyContent("请登录后再回复/留言")
        }
    }, [user])

    const submitReply = () => {
        commentsApi.post(`/${id}/reply`, { "content": replyContent })
            .then((res) => {
                setReplyContent("")
                setShowReplyInput(false)
                window.alert("回复成功！")
                props.addReply(id, res.data)
            }).catch((e) => {
                window.alert(e.response.data.message)
            })
    }

    const handleChange = (e) => {
        setReplyContent(e.target.value)
    }

    return (
        <div>
            <div className='border-t border-2 border-gray-200 mt-5'>
                <div className="flex justify-between">
                    <div><span className="font-bold text-lg">#{props.index + 1}</span> {username} - {createTime}</div>
                    <div
                        className='underline cursor-pointer'
                        onClick={() => setShowReplyInput(prevState => !prevState)}>
                        回复
                    </div>
                </div>
                <div>{content}</div>
                {
                    showReplyInput &&
                    <div>
                        <textarea
                            value={replyContent}
                            onChange={handleChange}
                            className="border-2 border-black w-full rounded-md"
                            readOnly={readOnly}
                        />
                        <div className="button bg-red-400 text-white text-center w-20 my-1" onClick={submitReply}>提交回复</div>
                    </div>
                }
            </div>
            {replies && replies.map(reply => (
                <div className='ml-5 bg-gray-200'>
                    <div>{reply.username} - {reply.createTime}</div>
                    <div>{reply.content}</div>
                </div>
            ))}
        </div>
    )
}