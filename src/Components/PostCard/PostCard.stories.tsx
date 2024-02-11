import type { StoryFn } from "@storybook/react";
import React, { useState, useEffect } from "react";

import { PostCard } from "./";

export default {
  component: PostCard,
};

const comment = {
  commenter: {
    profileImage: "https://img.freepik.com/free-icon/user_318-563642.jpg",
    name: "Usman Rehman",
  },
  comment: "Nice Comment Dear",
};

export const Base = {
  args: {
    post: {
      user: {
        profileImage: "https://img.freepik.com/free-icon/user_318-563642.jpg",
        name: "Usman Rehman",
      },
      postText: "This is a very nice post",
      comments: [comment, comment, comment, comment, comment, comment],
    },
  },
};
