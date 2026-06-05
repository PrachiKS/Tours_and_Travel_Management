import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: Number, required: true },
    photo: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

const tours = [
  {
    title: "Goa Beach Paradise",
    city: "Goa",
    address: "Calangute Beach, Goa",
    distance: 600,
    photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    desc: "Enjoy the beautiful beaches of Goa with guided tours, water sports, and vibrant nightlife. Perfect for groups and families.",
    price: 2999,
    maxGroupSize: 10,
    featured: true,
  },
  {
    title: "Kerala Backwaters Cruise",
    city: "Alleppey",
    address: "Alleppey Backwaters, Kerala",
    distance: 1200,
    photo: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    desc: "Experience the serene backwaters of Kerala on a traditional houseboat. Includes meals, accommodation and guided village tours.",
    price: 4999,
    maxGroupSize: 8,
    featured: true,
  },
  {
    title: "Rajasthan Royal Heritage Tour",
    city: "Jaipur",
    address: "Hawa Mahal, Jaipur, Rajasthan",
    distance: 1400,
    photo: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    desc: "Explore the majestic forts and palaces of Rajasthan. Visit Amber Fort, City Palace, Hawa Mahal and experience royal Rajasthani culture.",
    price: 5999,
    maxGroupSize: 12,
    featured: true,
  },
  {
    title: "Manali Snow Adventure",
    city: "Manali",
    address: "Mall Road, Manali, Himachal Pradesh",
    distance: 2000,
    photo: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    desc: "Adventure trip to the snowy mountains of Manali. Includes skiing, snow trekking, Rohtang Pass visit and Solang Valley activities.",
    price: 6999,
    maxGroupSize: 10,
    featured: true,
  },
  {
    title: "Agra Taj Mahal Sunrise Tour",
    city: "Agra",
    address: "Taj Mahal, Agra, Uttar Pradesh",
    distance: 1300,
    photo: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    desc: "Witness the breathtaking Taj Mahal at sunrise. Includes guided tour of Taj Mahal, Agra Fort and Mehtab Bagh with photography stops.",
    price: 3499,
    maxGroupSize: 15,
    featured: false,
  },
  {
    title: "Andaman Island Explorer",
    city: "Port Blair",
    address: "Radhanagar Beach, Andaman Islands",
    distance: 2500,
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    desc: "Explore the pristine beaches and crystal clear waters of Andaman Islands. Includes snorkeling, scuba diving and island hopping.",
    price: 12999,
    maxGroupSize: 8,
    featured: true,
  },
  {
    title: "Varanasi Spiritual Journey",
    city: "Varanasi",
    address: "Dashashwamedh Ghat, Varanasi, UP",
    distance: 1500,
    photo: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800",
    desc: "Experience the spiritual capital of India. Witness Ganga Aarti, boat ride on the Ganges, temple visits and authentic Banarasi culture.",
    price: 2499,
    maxGroupSize: 12,
    featured: false,
  },
  {
    title: "Darjeeling Tea Garden Tour",
    city: "Darjeeling",
    address: "Happy Valley Tea Estate, Darjeeling",
    distance: 1800,
    photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    desc: "Visit the famous tea gardens of Darjeeling with stunning views of Kanchenjunga. Includes toy train ride, tea tasting and monastery visits.",
    price: 4499,
    maxGroupSize: 10,
    featured: false,
  },
  {
    title: "Leh Ladakh Bike Expedition",
    city: "Leh",
    address: "Leh Palace, Leh, Ladakh",
    distance: 2800,
    photo: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800",
    desc: "Epic bike expedition through the world's highest motorable roads. Cross Khardung La, visit Pangong Lake and experience Ladakhi culture.",
    price: 15999,
    maxGroupSize: 6,
    featured: true,
  },
  {
    title: "Coorg Coffee Plantation Stay",
    city: "Coorg",
    address: "Madikeri, Coorg, Karnataka",
    distance: 900,
    photo: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=800",
    desc: "Relax in the lush coffee plantations of Coorg. Includes plantation walks, waterfall visits, wildlife safari and authentic Coorgi cuisine.",
    price: 3999,
    maxGroupSize: 8,
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('Existing tours cleared 🗑️');

    // Insert new tours
    await Tour.insertMany(tours);
    console.log('10 Sample tours inserted successfully 🎉');

    mongoose.connection.close();
    console.log('Database connection closed ✅');

  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDB();