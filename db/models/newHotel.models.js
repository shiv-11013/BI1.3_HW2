const mongoose = require("mongoose");

const newHotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Mid-Range", "Resort", "Inn"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: [String],
      default: [],
    },
    website: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: String,
      required: true,
    },
    checkOutTime: {
      type: String,
      required: true,
    },
    amenities: {
      type: [String], //array
      enum: [
        "Laundry",
        "Room Service",
        "Horse riding",
        "Boating",
        "Kids Play Area",
        "Bar",
        "Beach Access",
        "Free Breakfast",
        "Fishing Trips",
        "Pet-Friendly Rooms",
        "Terrace Bar",
        "Mountain Hiking Trails",
      ],
    },
    // priceRange: {
    //   type: String,
    //   enum: ["$$$ (31-60)", "$$$$ (61+)", "$$$ (41-60)", "$$$$ (61-100)"],
    //   required: true,
    // },
    reservationsNeeded: {
      type: Boolean,
      default: false,
    },
    isParkingAvailable: {
      type: Boolean,
      default: false,
    },
    isWifiAvailable: {
      type: Boolean,
      default: false,
    },
    isPoolAvailable: {
      type: Boolean,
      default: false,
    },
    isSpaAvailable: {
      type: Boolean,
      default: false,
    },
    isRestaurantAvailable: {
      type: Boolean,
      default: false,
    },
    photos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const NewHotel = mongoose.model("NewHotel", newHotelSchema);

module.exports = NewHotel;
