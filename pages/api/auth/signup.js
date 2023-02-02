import { connectToDatabase } from "@/helpers/db";
import { hashPassword } from "@/helpers/auth";

export default async function handler(req, res) {
	if (req.method !== "POST") return;

	const { email, password } = req.body;

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				"Invalid input - password should be at least 7 characters long.",
		});
		return;
	}

	const client = await connectToDatabase();

	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email });

	if (existingUser) {
		res.status(422).json({ message: "User is already exist!" });
		await client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);

	await db.collection("users").insertOne({
		email,
		password: hashedPassword,
	});

	res.status(201).json({ message: "User has been created!" });
	await client.close();
}
