import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { magic } from "../../lib/magic";
import styles from "./navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        setToken(didToken);
        setUsername(email);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleClickUsername = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const didToken = await magic.user.getIdToken();

      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (error) {
      console.error("somthing went wrong loggining out : ", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li onClick={handleClickHome} className={styles.navItem}>
            Home
          </li>
          <li onClick={handleClickMyList} className={styles.navItem2}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              onClick={handleClickUsername}
              className={styles.usernameBtn}
            >
              <p className={styles.username}>{username}</p>
              {/** Expand more icon */}
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <a onClick={handleSignOut} className={styles.linkName}>
                    Sign out
                  </a>

                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
