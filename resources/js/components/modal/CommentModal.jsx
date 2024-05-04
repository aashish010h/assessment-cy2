import React from "react";
import {
    createCommentFn,
    getCommentFn,
    updateCommentFn,
} from "../../api/userApi";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const CommentModal = ({
    isOpen,
    setCommentModal,
    editId,
    postId,
    setEditId,
}) => {
    const queryClient = useQueryClient();

    //default form values
    const defaultValues = {
        title: "",
        body: "",
        postId: postId,
    };

    //if the model if opened for editing purpose api call to get single comment to put in the form as a defualt value
    const {
        data: comment,
        error,
        isLoading: isLoadingSingleComment,
    } = useQuery(["comments", editId], () => getCommentFn(editId), {
        select: (data) => data.data.comment,
    });

    //if form is opened for edit the set default value provided above else put the signle comment from api call
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ values: editId ? comment : defaultValues });

    //for displaying the error message if occurs
    const getFormErrorMessage = (name) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };

    //using mutation for storing the comment so that only new updated comment is added to list of the comment
    const createMutation = useMutation(createCommentFn, {
        onSuccess: () => {
            toast.success("Comment has been added successfully.");
            handleModalClose();
            queryClient.invalidateQueries("posts");
            reset({ ...defaultValues });
        },
        onError: (error) => {},
    });

    //for editing the comment if it is opened for edit purpose
    const editMutation = useMutation(updateCommentFn, {
        onSuccess: () => {
            toast.success("Comment has been updated successfully.");
            handleModalClose();
            queryClient.invalidateQueries("posts");
            reset({ ...defaultValues });
        },
        onError: (error) => {
            console.log("er", error);
            toast.error(error.response.data.message);
        },
    });
    //subbmitng the form
    const onSubmit = (formData) => {
        editId
            ? editMutation.mutate(formData)
            : createMutation.mutate(formData);
    };

    //close the modal after this function call
    const handleModalClose = () => {
        reset({ ...defaultValues });
        setEditId(null);
        setCommentModal(false);
    };

    return (
        <>
            <Dialog
                header="Add Comment"
                visible={isOpen}
                style={{ width: "35vw" }}
                onHide={handleModalClose}
            >
                {/* showing the loader if comment is opened for the edit purpose util single comment api is being called */}
                {isLoadingSingleComment ? (
                    <ProgressSpinner />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="admin_form_wrapper">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="title">
                                            Comment Title
                                        </label>
                                        {/* storing the input from inputtext componenet and storing to form state */}
                                        <Controller
                                            name="title"
                                            control={control}
                                            // validation rules for the comment
                                            rules={{
                                                required:
                                                    "Comment title is required.",
                                            }}
                                            render={({ field }) => (
                                                <InputText
                                                    id={field.title}
                                                    {...field}
                                                    autoFocus
                                                />
                                            )}
                                        />
                                        {/* showing the validation msg */}
                                        {getFormErrorMessage("title")}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="body">
                                            Comment Body
                                        </label>
                                        <Controller
                                            name="body"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Comment body is required.",
                                            }}
                                            render={({ field }) => (
                                                <InputTextarea
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    autoFocus
                                                    rows={3}
                                                    cols={10}
                                                    style={{ width: "100%" }}
                                                />
                                            )}
                                        />
                                        {getFormErrorMessage("body")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* submit btn for both create and update which check condtion to display the label */}
                        <Button
                            loading={
                                createMutation?.isLoading ||
                                editMutation?.isLoading
                            }
                            label={editId ? "Update" : "Add"}
                            icon="pi pi-check"
                            onClick={handleSubmit(onSubmit)}
                            autoFocus
                        />
                    </form>
                )}
            </Dialog>
        </>
    );
};

export default CommentModal;
