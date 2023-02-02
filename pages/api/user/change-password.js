import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/helpers/db";
import { hashPassword, verifyPassword } from "@/helpers/auth";

export default async function handler(req, res) {
	if (req.method !== "PATCH") return;

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: "Not authenticated!" });
		return;
	}

	const newPassword = req.body.newPassword;
	const oldPassword = req.body.oldPassword;

	const email = session.user.email;
	const client = await connectToDatabase();
	const users = await client.db().collection("users");
	const user = await users.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found!" });
		await client.close();
		return;
	}

	for (const userElement in req.body) {
		console.log(userElement);
	}

	if (!(await verifyPassword(oldPassword, user.password))) {
		res.status(403).json("Invalid password!");
		await client.close();
		return;
	}

	const hashedNewPassword = await hashPassword(newPassword);

	await users.updateOne(
		{ email: email },
		{ $set: { password: hashedNewPassword } }
	);
	await client.close();
	res.status(200).json({ message: "Password is updated!" });
}
