"use client";

import React, { memo } from "react";

import { Editor } from "@tinymce/tinymce-react";

import { ChangeEvent } from "react";
import { Box, Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { FaImage, FaPaperclip, FaXmark } from "react-icons/fa6";
import { FileUpload } from "../FileUpload";

interface AddPostCardProps {
  post: any;
  postText: string;
  addPost: (e: React.SyntheticEvent) => void;
  editPost: (e: React.SyntheticEvent) => void;
  images: File[];
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (text: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const AddPostCard = memo(
  ({
    post,
    postText,
    addPost,
    editPost,
    images,
    onFileChange,
    onTextChange,
    onImageChange,
  }: // onCloseImageClick,
  // onCloseFileClick,
  AddPostCardProps) => (
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
            onChange={onImageChange}
            accept=".jpg,.png"
          />
          <FileUpload
            icon={<FaPaperclip />}
            ariaLabel="Attach Documents"
            onChange={onFileChange}
          />
        </Flex>
      </Flex>
      <Box p={2}>
        <form onSubmit={post ? editPost : addPost}>
          <div>
            <Editor
              apiKey="mr7s25j95m3vnm6e6bty7baeo74sc83zmll44tbxcpl959ou"
              init={{
                plugins: "emoticons",
                toolbar: "emoticons",
                toolbar_location: "bottom",
                menubar: false,
                resize: false,
              }}
              value={postText}
              onEditorChange={onTextChange}
            />
          </div>
          {images && (
            <div>
              {images.map((image) => (
                <div>
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="Post"
                  />
                  <IconButton
                    icon={<FaXmark />}
                    aria-label="Remove Image"
                    // onClick={() => onCloseImageClick(image?.name || image)}
                    size="xs"
                  />
                </div>
              ))}
            </div>
          )}
          <Flex mt={4} justifyContent="flex-end">
            <Button type="submit" colorScheme={"blue"} size="sm">
              {post ? "Update" : "Add Post"}
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
);
