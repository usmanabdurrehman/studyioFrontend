import { client } from "../../graphqlClient";
import { Post, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const signup = gql`
  query signin($email: SocialUserCreateInput!) {
    socialUser(where: { email: $email }) {
      id
    }
  }
`;

export const useSignin = () => {
  return useMutation(async (data: User) => {
    return await client.request(signup, { data });
  });
};
