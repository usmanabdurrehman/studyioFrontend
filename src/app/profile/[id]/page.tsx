import Profile from "@/Components/Profile/Profile";
import React from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <Profile userId={params?.id} />;
}
