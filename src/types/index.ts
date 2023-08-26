export interface Comment {
  commenter: {
    profileImage: string;
    name: string;
  };
  comment: string;
}

export interface Post {
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

export interface User {
  updatedAt?: Date;
  createdAt?: Date;
  email: string;
  password: string;
  bio?: string;
  firstName: string;
  lastName: string;
  posts?: Post[];
}
