import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

const users = [
  {
    username: 'prachi_admin',
    email: 'prachi@admin.com',
    password: 'Admin@1234',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'admin',
  },
  {
    username: 'rahul_sharma',
    email: 'rahul@gmail.com',
    password: 'Rahul@1234',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'user',
  },
  {
    username: 'priya_patel',
    email: 'priya@gmail.com',
    password: 'Priya@1234',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'user',
  },
  {
    username: 'amit_verma',
    email: 'amit@gmail.com',
    password: 'Amit@1234',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    role: 'user',
  },
  {
    username: 'sneha_joshi',
    email: 'sneha@gmail.com',
    password: 'Sneha@1234',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    role: 'user',
  },
]

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected ✅')

    await User.deleteMany({})
    console.log('Existing users cleared 🗑️')

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        return { ...user, password: hash }
      })
    )

    await User.insertMany(hashedUsers)
    console.log('5 Sample users inserted successfully 🎉')

    console.log('\n--- Login Credentials ---')
    users.forEach(user => {
      console.log(`${user.role.toUpperCase()} → Email: ${user.email} | Password: ${user.password}`)
    })

    mongoose.connection.close()
    console.log('\nDatabase connection closed ✅')

  } catch (err) {
    console.error('Error seeding users:', err.message)
    process.exit(1)
  }
}

seedUsers()