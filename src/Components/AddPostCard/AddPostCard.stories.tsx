import type { StoryFn } from "@storybook/react";
import React, { useState, useEffect } from "react";

import { AddPostCard } from "./AddPostCard";

export default {
  component: AddPostCard,
};

export const Base = {
  args: {
    postText: "This is my first post",
  },
};
