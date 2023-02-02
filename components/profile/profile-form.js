import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm() {
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();

	async function submitForm(event) {
		event.preventDefault();

		await fetch("api/user/change-password", {
			method: "PATCH",
			body: JSON.stringify({
				oldPassword: oldPasswordRef.current.value,
				newPassword: newPasswordRef.current.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return (
		<form className={classes.form} onSubmit={submitForm}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input type="password" id="new-password" ref={newPasswordRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input type="password" id="old-password" ref={oldPasswordRef} />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
}

export default ProfileForm;
