import { Layout, Profile } from "@/Components";
import React from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <Profile userId={params?.id} />
    </Layout>
  );
}
