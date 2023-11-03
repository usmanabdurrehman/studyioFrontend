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

interface AddPostCardProps {
  post?: Post;
}

type AddPostValues = {
  images: any[];
  text: string;
  files: any[];
};

export const AddPostCard = memo(({ post }: AddPostCardProps) => {
  const { mutateAsync: addPost } = useAddPost();
  const { mutateAsync: editPost } = useEditPost();

  const initialValues: AddPostValues = useMemo(() => {
    return { images: [], text: post?.postText || "", files: [] };
  }, []);

  const onSubmit = useCallback(
    async (
      values: AddPostValues,
      { resetForm }: FormikHelpers<AddPostValues>
    ) => {
      if (post) {
        await editPost(buildFormikFormData(values));
      } else {
        await addPost(buildFormikFormData(values));
      }
      resetForm();
    },
    []
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
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
                  setFieldValue("files", [
                    ...values.files,
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
              value={values.text}
              onEditorChange={(text) => setFieldValue("text", text)}
            />
            {values.images && (
              <Flex gap={1} flexWrap="wrap">
                {values.images.map((image) => (
                  <Box>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      width={30}
                      height={30}
                      alt="Post"
                    />
                  </Box>
                ))}
              </Flex>
            )}
            <Flex mt={4} justifyContent="flex-end">
              <Button type="submit" colorScheme={"blue"} size="sm">
                {post ? "Update" : "Add Post"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Formik>
  );
});
