import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/helpers/db";
import { verifyPassword } from "@/helpers/auth";

export default NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const client = await connectToDatabase();
				const users = client.db().collection("users");

				const user = await users.findOne({
					email: credentials.email,
				});

				if (!user) {
					await client.close();
					throw new Error("User not found!");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					await client.close();
					throw new Error("Could not log you in!");
				}

				await client.close();
				return { email: user.email };
			},
		}),
	],
});
