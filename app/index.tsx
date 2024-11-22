import React from "react";
import { Redirect } from "expo-router";

const Home = () => {
  const isSignedIn = false;

  if (isSignedIn) {
    return <Redirect href="./(root)/home" />;
  }
  return <Redirect href={"./(auth)/login"} />;
};

export default Home;
