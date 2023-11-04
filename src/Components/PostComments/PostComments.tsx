import { useAddComment } from "@/mutations";
import { useProfileInfo, useTimelinePosts } from "@/queries";
import { Post } from "@/types";
import { Box, Button, Divider, Input } from "@chakra-ui/react";
import { Field, FieldProps, Formik } from "formik";
import React, { useState } from "react";

import { Comment } from "../Comment";

export default function PostComments({ post }: { post: Post }) {
  const [showMore, setShowMore] = useState(false);
  const { mutateAsync: addComment } = useAddComment();

  const { refetch: refetchTimeline } = useTimelinePosts();
  const { refetch: refetchProfileInfo } = useProfileInfo();

  const postComments = showMore ? post.comments : post?.comments.slice(0, 2);

  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={async (values, { resetForm }) => {
        await addComment({ comment: values.comment, postId: post._id });
        refetchTimeline();
        refetchProfileInfo();
        resetForm();
      }}
    >
      {({ submitForm }) => (
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
              {postComments.map((postComment, index) => (
                <Box mt={2} mb={2}>
                  <Comment comment={postComment} />
                  {index !== postComments?.length - 1 && (
                    <Divider m={"2px 0"} />
                  )}
                </Box>
              ))}
            </Box>

            {post.comments?.length > 2 && (
              <Button size="xs" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>
          <Box>
            <Button colorScheme={"blue"} size="sm" onClick={submitForm}>
              Comment
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
