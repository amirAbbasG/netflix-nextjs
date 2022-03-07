import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { magic } from "../lib/magic";
import Loading from "../components/loading/Loading";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(async () => {
    const isLogin = await magic.user.isLoggedIn();

    if (isLogin) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
