import { Layout } from "../../../Components/Layout";
import { Profile } from "../../../Components/Profile";
import React from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <Profile userId={params?.id} />
    </Layout>
  );
}
