"use client";

import React, { memo, useCallback, useMemo } from "react";

import { Editor } from "@tinymce/tinymce-react";

import { Box, Button, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FileUpload } from "../FileUpload";
import { Formik, FormikHelpers } from "formik";
import { useAddPost, useEditPost } from "@/mutations";
import { Attachment, Post } from "@/types";
import { buildFormikFormData } from "@/utils";
import { useProfileInfo, useTimelinePosts } from "@/queries";
import {
  FileIcon,
  defaultStyles,
  FileIconProps,
  DefaultExtensionType,
} from "react-file-icon";
import { CardImage, Paperclip, XLg } from "react-bootstrap-icons";

interface AddPostCardProps {
  post?: Post;
  onSubmit?: () => void;
}

type AddPostValues = {
  images: (string | File)[];
  postText: string;
  attachments: (Attachment | File)[];
};

export const AddPostCard = memo(
  ({ post, onSubmit: handleSubmit }: AddPostCardProps) => {
    const { mutateAsync: addPost } = useAddPost();
    const { mutateAsync: editPost } = useEditPost();

    const { refetch: refetchTimeline } = useTimelinePosts();
    const { refetch: refetchProfileInfo } = useProfileInfo();

    const initialValues: AddPostValues = useMemo(() => {
      return {
        images: post?.images || [],
        postText: post?.postText || "",
        attachments: post?.files || [],
      };
    }, [post]);

    const onSubmit = useCallback(
      async (
        values: AddPostValues,
        { resetForm }: FormikHelpers<AddPostValues>
      ) => {
        const { postText, images, attachments } = values;
        const formdata = new FormData();

        const { newAttachments, oldAttachments } = attachments.reduce(
          (acc, val) => {
            if (val instanceof File) acc.newAttachments.push(val);
            else acc.oldAttachments.push(val);
            return acc;
          },
          {
            newAttachments: [],
            oldAttachments: [],
          } as { newAttachments: File[]; oldAttachments: Attachment[] }
        );

        const { newImages, oldImages } = images.reduce(
          (acc, val) => {
            if (val instanceof File) acc.newImages.push(val);
            else acc.oldImages.push(val);
            return acc;
          },
          {
            newImages: [],
            oldImages: [],
          } as { newImages: File[]; oldImages: string[] }
        );

        formdata.append("post", postText);
        if (newAttachments) {
          newAttachments.forEach((attachment: File) => {
            formdata.append("attachments", attachment, attachment.name);
          });
        }
        if (newImages) {
          newImages.forEach((image) => {
            formdata.append("images", image, image.name);
          });
        }

        if (post) {
          formdata.append("oldAttachments", JSON.stringify(oldAttachments));
          formdata.append("oldImages", JSON.stringify(oldImages));
          formdata.append("postId", post._id);
          await editPost(formdata);
        } else {
          await addPost(formdata);
        }
        refetchTimeline();
        refetchProfileInfo();
        handleSubmit && handleSubmit();
        resetForm();
      },
      [handleSubmit, refetchProfileInfo, refetchTimeline]
    );

    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, setFieldValue, submitForm }) => {
          return (
            <Box width={"100%"} background="white" boxShadow={"md"}>
              <Flex
                color="white"
                background={"#007bff"}
                alignItems="center"
                justifyContent={"space-between"}
                p={2}
              >
                <Box>{post ? "Edit Post" : "New Post"}</Box>
                <Flex gap={2}>
                  <FileUpload
                    icon={<CardImage />}
                    ariaLabel="Attach Images"
                    onChange={(e) => {
                      setFieldValue("images", [
                        ...values.images,
                        ...((e.target.files || []) as FileList[]),
                      ]);
                    }}
                    accept=".jpg,.png"
                  />
                  <FileUpload
                    icon={<Paperclip />}
                    ariaLabel="Attach Documents"
                    onChange={(e) => {
                      setFieldValue("attachments", [
                        ...values.attachments,
                        ...((e.target.files || []) as FileList[]),
                      ]);
                    }}
                  />
                </Flex>
              </Flex>
              <Box p={2}>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_EDITOR_API_KEY}
                  init={{
                    plugins: "emoticons",
                    toolbar: "emoticons",
                    toolbar_location: "bottom",
                    menubar: false,
                    resize: false,
                  }}
                  value={values.postText}
                  onEditorChange={(text) => setFieldValue("postText", text)}
                />

                {values.images && (
                  <Flex gap={1} flexWrap="wrap" mt={2}>
                    {values.images.map((image) => (
                      <Box data-group pos="relative">
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          width={60}
                          height={60}
                          alt="Image"
                        />
                        <IconButton
                          zIndex={1}
                          pos={"absolute"}
                          onClick={() =>
                            setFieldValue(
                              "images",
                              values.images.filter(
                                (imageItem) =>
                                  (imageItem instanceof File
                                    ? imageItem?.name
                                    : imageItem) !==
                                  (image instanceof File ? image?.name : image)
                              )
                            )
                          }
                          top={1}
                          right={1}
                          visibility="hidden"
                          _groupHover={{ visibility: "visible !important" }}
                          aria-label="Remove Image"
                          size="xs"
                          icon={<XLg />}
                        />
                      </Box>
                    ))}
                  </Flex>
                )}
                {values.attachments && (
                  <Flex gap={1} flexWrap="wrap" mt={2}>
                    {values.attachments.map((attachment) => {
                      const ext = (
                        attachment instanceof File
                          ? attachment?.name
                          : attachment?.filename
                      )
                        ?.split(".")
                        .at(-1) as DefaultExtensionType;
                      return (
                        <Box data-group pos="relative">
                          <Box width={12} height={12}>
                            <FileIcon extension={ext} {...defaultStyles[ext]} />
                          </Box>

                          <IconButton
                            zIndex={1}
                            pos={"absolute"}
                            onClick={() =>
                              setFieldValue(
                                "attachments",
                                values.attachments.filter(
                                  (attachmentItem) =>
                                    (attachmentItem instanceof File
                                      ? attachmentItem?.name
                                      : attachmentItem?.originalFilename) !==
                                    (attachment instanceof File
                                      ? attachment?.name
                                      : attachment?.originalFilename)
                                )
                              )
                            }
                            top={1}
                            right={1}
                            visibility="hidden"
                            _groupHover={{ visibility: "visible !important" }}
                            aria-label="Remove Image"
                            size="xs"
                            icon={<XLg />}
                          />
                        </Box>
                      );
                    })}
                  </Flex>
                )}
                <Flex mt={4} justifyContent="flex-end">
                  <Button
                    isDisabled={
                      !(
                        values.postText ||
                        values.images?.length ||
                        values?.attachments?.length
                      )
                    }
                    colorScheme={"blue"}
                    size="sm"
                    onClick={submitForm}
                  >
                    {post ? "Update" : "Add Post"}
                  </Button>
                </Flex>
              </Box>
            </Box>
          );
        }}
      </Formik>
    );
  }
);
