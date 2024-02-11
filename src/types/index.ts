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

export type Attachment = { filename: string; originalFilename: string };

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
  files: Attachment[];
  hidden: boolean;
}

export interface User extends Abstract {
  updatedAt?: Date;
  createdAt?: Date;
  email: string;
  password: string;
  bio?: string;
  name: string;
  posts?: Post[];
  profileImage: string;
}

export type UserCreds = Pick<User, "email" | "password">;

export enum NotificationAction {
  Followed = "followed",
  Commented = "commented",
  Liked = "liked",
}

export interface Notification extends Abstract {
  action: NotificationAction;
  doerId: string;
  message: string;
  postId: string;
  profileImage: string;
}
