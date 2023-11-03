interface Abstract {
  _id: string;
}

export interface Comment extends Abstract {
  commenter: {
    profileImage: string;
    name: string;
  };
  comment: string;
}

export interface Post extends Abstract {
  user: {
    profileImage: string;
    name: string;
  };
  userId: string;
  postText: string;
  images: string[];
  likes: string[];
  liked: boolean;
  comments: Comment[];
}

export interface User extends Abstract {
  updatedAt?: Date;
  createdAt?: Date;
  email: string;
  password: string;
  bio?: string;
  firstName: string;
  lastName: string;
  posts?: Post[];
}

export type UserCreds = Pick<User, "email" | "password">;
