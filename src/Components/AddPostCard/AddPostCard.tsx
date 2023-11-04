"use client";

import React, { memo, useCallback, useMemo } from "react";

import { Editor } from "@tinymce/tinymce-react";

import { Box, Button, Flex } from "@chakra-ui/react";
import { FaImage, FaPaperclip, FaXmark } from "react-icons/fa6";
import { FileUpload } from "../FileUpload";
import { Formik, FormikHelpers } from "formik";
import { useAddPost, useEditPost } from "@/mutations";
import { Post } from "@/types";
import { buildFormikFormData } from "@/utils";
import { useProfileInfo, useTimelinePosts } from "@/queries";

interface AddPostCardProps {
  post?: Post;
}

type AddPostValues = {
  images: (string | File)[];
  postText: string;
  attachments: (string | File)[];
};

export const AddPostCard = memo(({ post }: AddPostCardProps) => {
  const { mutateAsync: addPost } = useAddPost();
  const { mutateAsync: editPost } = useEditPost();

  const { refetch: refetchTimeline } = useTimelinePosts();
  const { refetch: refetchProfileInfo } = useProfileInfo();

  const initialValues: AddPostValues = useMemo(() => {
    return { images: [], postText: post?.postText || "", attachments: [] };
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
          if (typeof val !== "string") acc.newAttachments.push(val);
          else acc.oldAttachments.push(val);
          return acc;
        },
        {
          newAttachments: [],
          oldAttachments: [],
        } as { newAttachments: File[]; oldAttachments: string[] }
      );

      const { newImages, oldImages } = images.reduce(
        (acc, val) => {
          if (typeof val !== "string") acc.newImages.push(val);
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

      formdata.forEach((value, key) => {
        console.log({ [key]: value });
      });

      if (post) {
        formdata.append("oldAttachments", JSON.stringify(oldAttachments));
        formdata.append("oldImages", JSON.stringify(oldImages));
        await editPost(formdata);
      } else {
        await addPost(formdata);
      }
      refetchTimeline();
      refetchProfileInfo();
      resetForm();
    },
    []
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
                  icon={<FaImage />}
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
                  icon={<FaPaperclip />}
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
                apiKey="mr7s25j95m3vnm6e6bty7baeo74sc83zmll44tbxcpl959ou"
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
                    <Box>
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
                    </Box>
                  ))}
                </Flex>
              )}
              <Flex mt={4} justifyContent="flex-end">
                <Button colorScheme={"blue"} size="sm" onClick={submitForm}>
                  {post ? "Update" : "Add Post"}
                </Button>
              </Flex>
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
});
