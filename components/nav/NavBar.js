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

  useEffect(async () => {
    try {
      const { email } = await magic.user.getMetadata();
      setUsername(email);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleClickMyList = (e) => {
    e.preventDefault();
    router.push("/brows/my-list");
  };

  const handleClickUsername = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      console.error("somthing went wring loggining out : ", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
