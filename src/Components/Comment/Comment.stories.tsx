import type { StoryFn } from "@storybook/react";
import React, { useState, useEffect } from "react";

import Comment from "./Comment";

export default {
  component: Comment,
};

export const Base = {
  args: {
    comment: {
      commenter: {
        profileImage: "https://img.freepik.com/free-icon/user_318-563642.jpg",
        name: "Usman Rehman",
      },
      comment: "Nice Comment Dear",
    },
  },
};
