import React, { useState } from "react";
import Post from "../components/Post";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllPostsFn } from "../api/userApi";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import AddPostModal from "../components/modal/AddPostModal";

const Home = () => {
    //state for opening and closing add post modal
    const [openAddPostModal, setOpenAddPostModal] = useState(false);

    //fetching all post using react query custom hook
    const {
        data: posts,
        error,
        isLoading: isLoadingPosts,
    } = useQuery("posts", getAllPostsFn, {
        select: (data) => data.data.posts,
    });

    return (
        <div>
            {/* showing the add post modal if the openAddPostModal is true */}
            {openAddPostModal && (
                <AddPostModal
                    isOpen={openAddPostModal}
                    setPostModal={setOpenAddPostModal}
                />
            )}

            <main>
                <div className="post-wrapper my-5">
                    <div className="post-content ">
                        <div className="add-action text-end mb-4">
                            <Button
                                label="Add Post"
                                onClick={() => setOpenAddPostModal(true)}
                            />
                        </div>
                        {/* showing loader if post is fetching , after fetch is success showing the list of the post */}
                        {isLoadingPosts ? (
                            <ProgressSpinner />
                        ) : posts?.length > 0 ? (
                            posts?.map((post) => {
                                return <Post post={post} key={post.id} />;
                            })
                        ) : (
                            <p>No Posts Available</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Home;
