import React from "react";
import Comments from "./Comments";
import { formatDate } from "../utils/utils";

const Post = ({ post }) => {
    return (
        <div className="p-5 border rounded mb-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="user-post">
                        <div className="user-header mb-4 d-flex align-items-center">
                            <div className="img-wrapper me-4">
                                <img
                                    src="https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png"
                                    class="image-responsive"
                                    alt=""
                                />
                            </div>
                            <div className="user-name">
                                <h3>
                                    <strong>{post.user.name}</strong>
                                </h3>
                                {formatDate(post.created_at)}
                            </div>
                        </div>
                        <div className="post-intro">
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            <img
                                src="https://tse1.mm.bing.net/th?id=OIP.7y2mGjcXCkHYiK3TkjZCoQHaEK&pid=Api&P=0&w=300&h=300"
                                class="image-responsive"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                {/* sedning the commnet of a single post to comments componenet to handle the other functionalite of comment */}
                <div className="col-md-6">
                    <Comments comments={post.comments} postId={post.id} />
                </div>
            </div>
        </div>
    );
};

export default Post;
