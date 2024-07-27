import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {User} from '../src/models/user.model';

dotenv.config();
// run with npx ts-node ./scripts/seed.ts  command.
const users = [
    { first_name: 'Alice', last_name: 'Smith', username: 'aliceSmith', password: 'password123', role: 'manager' },
    { first_name: 'Bob', last_name: 'Johnson', username: 'bobJohnson', password: 'password123', role: 'user' },
    { first_name: 'Charlie', last_name: 'Brown', username: 'charlieBrown', password: 'password123', role: 'user' }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        await User.deleteMany({});
        console.log('Cleared existing users');

        const hashedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return { ...user, password: hashedPassword };
            })
        );

        await User.insertMany(hashedUsers);
        console.log('Seeded users');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase().then();
