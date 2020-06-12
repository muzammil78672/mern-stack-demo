import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

import { getItem } from "../common/helper";

export default ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const user = getItem("user");
    if (!user && router.pathname === "/") {
      Router.push("/login");
    }
  }, []);

  return <Component {...pageProps} />;
};
