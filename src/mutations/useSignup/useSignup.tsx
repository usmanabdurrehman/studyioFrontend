import { client } from "../../graphqlClient";
import { Post, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const signup = gql`
  mutation signup($data: SocialUserCreateInput!) {
    createSocialUser(data: $data) {
      id
    }
  }
`;

export const useSignup = () => {
  return useMutation(async (data: User) => {
    return await client.request(signup, { data });
  });
};
