import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email) {
      if (email === "amir.h.a.g73@gmail.com") {
        setUserMsg("");
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });

          console.log({ didToken });
          if (didToken) {
            router.push("/");
          }
        } catch (error) {
          console.log("something went wrong logginig in", error);
        }
      } else {
        setUserMsg("Email address is wrong");
      }
    } else {
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix signin</title>
      </Head>
      <header className={styles.header}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="128px"
              height="34px"
            />
          </div>
        </a>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLogin} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
