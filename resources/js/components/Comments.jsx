import React, { useState } from "react";
import CommentModal from "./modal/CommentModal";
import { Button } from "primereact/button";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { formatDate } from "../utils/utils";
const Comments = ({ comments, postId }) => {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const queryClient = useQueryClient();

    //function to delte the comment
    const handleCommentDelete = (commentId) => {
        Axios.delete(`user/comments/${commentId}`)
            .then((res) => {
                queryClient.invalidateQueries("posts");
                toast.success("Comment has been delted successfully.");
            })
            .catch((err) => {
                console.log("err", err);
                toast.error(err.response.data.message);
            });
    };
    return (
        <>
            {/* only show the modal if showCommentModal is true */}
            {showCommentModal && (
                <CommentModal
                    postId={postId}
                    isOpen={showCommentModal}
                    setCommentModal={setShowCommentModal}
                    editId={editId}
                    setEditId={setEditId}
                />
            )}

            <div className="user-comment">
                <div className="add-action text-end">
                    <Button
                        label="Add Comment"
                        onClick={() => {
                            setShowCommentModal(true);
                        }}
                    />
                </div>
                <h4>Comments</h4>
                <ul className="all-comments ">
                    {comments?.length > 0 ? (
                        <>
                            {/* showing the list of comments */}
                            {comments.map((comment) => (
                                <li>
                                    <div className="actions">
                                        <a
                                            href="#"
                                            onClick={() => {
                                                setShowCommentModal(true);
                                                setEditId(comment.id);
                                            }}
                                        >
                                            Edit
                                        </a>
                                        <a
                                            href="#"
                                            onClick={() =>
                                                handleCommentDelete(comment.id)
                                            }
                                        >
                                            Delete
                                        </a>
                                    </div>
                                    <h5>{comment.title}</h5>
                                    <p>{comment.body}</p>
                                    <div className="comment-by">
                                        <small>
                                            Posted on{" "}
                                            {formatDate(comment?.created_at)},
                                            By {comment?.user.name}
                                        </small>
                                    </div>
                                </li>
                            ))}
                        </>
                    ) : (
                        <p>No Comments Available</p>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Comments;
