import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	return await MongoClient.connect(
		'mongodb+srv://IvanRozb:Y8pwlm5vLucjprn3@cluster0.mcgcxdw.mongodb.net/auth-dev?retryWrites=true&w=majority'
	);
}
