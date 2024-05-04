import React from "react";
import { createPostFn } from "../../api/userApi";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { Dialog } from "primereact/dialog";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const AddPostModal = ({ isOpen, setPostModal }) => {
    const queryClient = useQueryClient();
    const defaultValues = {
        title: "",
        desciption: "",
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ values: defaultValues });

    const getFormErrorMessage = (name) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };

    const createMutation = useMutation(createPostFn, {
        onSuccess: () => {
            toast.success("Post has been added successfully.");
            setPostModal(false);
            queryClient.invalidateQueries("posts");
            reset({ ...defaultValues });
        },
        onError: (error) => {},
    });

    const onSubmit = (formData) => {
        createMutation.mutate(formData);
    };
    const handleModalClose = () => {
        reset({ ...defaultValues });

        setPostModal(false);
    };

    return (
        <>
            <Dialog
                header="Add Post"
                visible={isOpen}
                style={{ width: "35vw" }}
                onHide={handleModalClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="admin_form_wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="title">Post Title</label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        rules={{
                                            required: "Post title is required.",
                                        }}
                                        render={({ field }) => (
                                            <InputText
                                                id={field.title}
                                                {...field}
                                                autoFocus
                                            />
                                        )}
                                    />
                                    {getFormErrorMessage("title")}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="description">
                                        Post Description
                                    </label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{
                                            required:
                                                "Post Description is required.",
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
                                    {getFormErrorMessage("description")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        loading={createMutation?.isLoading}
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSubmit(onSubmit)}
                        autoFocus
                    />
                </form>
            </Dialog>
        </>
    );
};

export default AddPostModal;
