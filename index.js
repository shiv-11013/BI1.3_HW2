const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const NewHotel = require("./db/models/newHotel.models");
const HotelStructure = require("./db/models/newHotel.models");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
initializeDatabase();

// const newHotel1 = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: [
//     "https://example.com/hotel1-photo1.jpg",
//     "https://example.com/hotel1-photo2.jpg",
//   ],
// };

// const newHotel2 = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: [
//     "Room Service",
//     "Horse riding",
//     "Boating",
//     "Kids Play Area",
//     "Bar",
//   ],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: [
//     "https://example.com/hotel2-photo1.jpg",
//     "https://example.com/hotel2-photo2.jpg",
//   ],
// };

async function createNewHotel(newHotel) {
  try {
    const hotel = new HotelStructure(newHotel);
    const saveHotel = await hotel.save();
    // console.log("New Hotel", saveHotel);
    return saveHotel;
  } catch (error) {
    throw error;
  }
}
// createNewHotel(newHotel1);
// createNewHotel(newHotel2);

app.post("/hotels", async (req, res) => {
  const { name, location, rating } = req.body; // Basic validation fields
  if (!name || !location || !rating) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    const savedHotel = await createNewHotel(req.body);
    res
      .status(201)
      .json({ message: "Data Added Successfully", hotel: savedHotel });
  } catch (error) {
    console.error("Error while adding hotel:", error);
    res.status(500).json({ error: "Failed to add Hotel" });
  }
});

async function getAllHotels() {
  try {
    const hotels = await HotelStructure.find({});
    console.log("All Hotels:", hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await HotelStructure.find({});
    console.log("All Hotels:", hotels); // Log for debugging
    res.status(200).json(hotels); // Respond with all hotels
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});
//   getAllHotels()

async function getHotelByName(hotelName) {
  try {
    const hotel = await HotelStructure.findOne({ name: hotelName });
    console.log("HotelsByName:", hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
  }
}

// getHotelByName("Lake View");

async function getHotelsWithParking() {
  try {
    const hotels = await HotelStructure.find({ isParkingAvailable: true });
    console.log("Hotels with Parking:", hotels);
  } catch (error) {
    console.error("Error fetching hotels with parking:", error);
  }
}

//   getHotelsWithParking();

async function getHotelsWithRestaurant() {
  try {
    const hotels = await HotelStructure.find({ isRestaurantAvailable: true });
    console.log("Hotels with Restaurant Available:", hotels);
  } catch (error) {
    console.error("Error fetching hotels with a restaurant:", error);
  }
}

// getHotelsWithRestaurant();

async function getHotelsByCategory() {
  try {
    const hotels = await HotelStructure.find({ category: "Mid-Range" });
    console.log("Mid-Range Hotels:", hotels);
  } catch (error) {
    console.error("Error fetching Mid-Range hotels:", error);
  }
}
// getHotelsByCategory()

async function getHotelsByPriceRange() {
  try {
    const hotels = await HotelStructure.find({ priceRange: "$$$$ (61+)" });
    console.log("Hotels in Price Range '$$$$ (61+)':", hotels);
  } catch (error) {
    console.error("Error fetching hotels in price range '$$$$ (61+)':", error);
  }
}

//   getHotelsByPriceRange()

async function getHotelsWithRatingFour() {
  try {
    const hotels = await HotelStructure.find({ rating: 4.0 });
    console.log("Hotels with 4.0 Rating:", hotels);
  } catch (error) {
    console.error("Error fetching hotels with 4.0 rating:", error);
  }
}
//   getHotelsWithRatingFour()

async function getHotelByPhoneNumber() {
  try {
    const hotel = await HotelStructure.findOne({ phoneNumber: "+1299655890" });
    console.log("Hotel with Phone Number '+1299655890':", hotel);
  } catch (error) {
    console.error("Error fetching hotel by phone number '+1299655890':", error);
  }
}

//    getHotelByPhoneNumber()

async function updateLakeView(hotelId, dataToUpdate) {
  try {
    const updatedLakeView = await NewHotel.findOneAndUpdate(
      { name: hotelId },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedLakeView);
  } catch (error) {
    throw error;
  }
}

// updateLakeView("Lake View", { checkOutTime: "11 AM" });

async function updatedHotelData(hotelName, dataToUpdate) {
  try {
    const updatedHotelData = await NewHotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedHotelData);
  } catch (error) {
    throw error;
  }
}
// updatedHotelData("Sunset Resort", { rating: 4.2 });

async function updatedHotelByPhone(number, dataToUpdate) {
  try {
    const updatedHotel = await NewHotel.findOneAndUpdate(
      { phoneNumber: number },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedHotel);
  } catch (error) {
    throw error;
  }
}

// updatedHotelByPhone("+1299655890", { phoneNumber: "+1997687392" });

async function deleteById(id) {
  try {
    const deleted = await NewHotel.findByIdAndDelete(id);
    console.log("DELETED");
  } catch (error) {
    console.log("Error to deleting");
  }
}

// deleteById("6729b941fc964d7cd2620f55")

async function deleteByPhoneNumber(phoneNumber) {
  try {
    const deleted = await NewHotel.findByIdAndDelete(phoneNumber);
    console.log("DELETED");
  } catch (error) {
    console.log("Error to deleting");
  }
}

// deleteByPhoneNumber("+1299655890");

async function deleteHotelById(hotelId) {
  try {
    const deletedData = await NewHotel.findByIdAndDelete(hotelId);
    return deletedData;
  } catch (error) {
    console.log("Error");
  }
}

app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedData = await deleteHotelById(req.params.hotelId);
    if (deletedData) {
      res
        .status(201)
        .json({ message: "Successfully Deleted", hotel: deletedData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Data" });
  }
});

async function updateHotelById(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await NewHotel.findByIdAndUpdate(
      hotelId,
      dataToUpdate,
      { new: true }
    );
    return updatedHotel;
  } catch (error) {
    console.log("Error");
  }
}

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedData = await updateHotelById(req.params.hotelId, req.body);
    if (updatedData) {
      res
        .status(201)
        .json({ message: "Updated Successfully", Hotel: updatedData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Update Data" });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is runnin on PORT ${PORT}`);
});
