import { Post } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { graphql, GraphQLArgs } from "graphql";
import request from "graphql-request";

const signup = graphql(`
  mutation signup($data: SocialUserCreateInput!) {
    createSocialUser(data: $data) {}
  }
`);

export const useSignup = () => {
  return useMutation(async (data: Post) => {
    request(
      "https://swapi-graphql.netlify.app/.netlify/functions/index",
      signup,
      { data }
    );
  });
};
