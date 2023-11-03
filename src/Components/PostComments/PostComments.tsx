import { useAddComment } from "@/mutations";
import { Post } from "@/types";
import { Box, Button, Input } from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import React, { useState } from "react";

import { Comment } from "../Comment";

export default function PostComments({ post }: { post: Post }) {
  const [showMore, setShowMore] = useState(false);
  const { mutateAsync: addComment } = useAddComment();

  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values) => {
        await addComment({ comment: values.comment, postId: post._id });
      }}
    >
      {() => (
        <Box>
          <Box flex="1">
            <Field name="comment">
              {({ field }: FieldProps) => (
                <Input
                  borderColor="#007bff"
                  fontSize="xs"
                  size="sm"
                  width="100%"
                  borderWidth={1.4}
                  borderRadius="0 20px 20px 0"
                  {...field}
                  placeholder="Comment..."
                />
              )}
            </Field>
            <Box mt={2}>
              {post.comments &&
                (showMore
                  ? post.comments?.map((postComment) => (
                      <Comment comment={postComment} />
                    ))
                  : post?.comments
                      .slice(0, 2)
                      .map((postComment) => <Comment comment={postComment} />))}
            </Box>

            {post.comments?.length > 2 && (
              <Button size="xs" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
          <Box>
            <Button type="submit" colorScheme={"blue"} size="sm">
              Comment
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
