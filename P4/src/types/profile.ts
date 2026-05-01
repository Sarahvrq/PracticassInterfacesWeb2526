import { User } from "./user";
import { Post } from "./post";

export type ProfileResponse = {
  user: User;
  posts: Post[];
};

export type FollowResponse = {
  siguiendo: boolean;
  user: User;
};