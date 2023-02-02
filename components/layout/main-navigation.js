import Link from "next/link";

import classes from "./main-navigation.module.css";
import { signOut, useSession } from "next-auth/react";

function MainNavigation() {
	const { data: session, status } = useSession();

	function signOutHandler() {
		signOut();
	}

	return (
		<header className={classes.header}>
			<Link href="/" legacyBehavior>
				<div className={classes.logo}>Next Auth</div>
			</Link>
			<nav>
				<ul>
					{!session && status !== "loading" && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}
					{session && (
						<li>
							<Link href="/profile">Profile</Link>
						</li>
					)}
					{session && (
						<li>
							<button onClick={signOutHandler} type={"button"}>
								Logout
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
