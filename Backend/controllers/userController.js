const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendGreetMail } = require("../helper/mailServices");
const { JWT_SECRET } = require("../config");
const bookingDetails = require("../models/bookingDetails");

const register = async (req, res) => {
  try {
    const { name, email, mobile_number, password, gender, address } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobile_number: mobile_number }],
    })
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        msg: "User already exists with this email or mobile number",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile_number,
      gender,
      address,
    });
    const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      ameSite: "none",
    });
    if (email && name) {
      try {
        await sendGreetMail(email, name);
        console.log("Greeting email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send greeting email");
      }
    }
    console.log(user);
    return res.status(201).json({
      msg: "User created successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Please check the details you have entered or try again later",
    });
  }
};
const login = async (req, res) => {
  try {
    console.log("Received login request:", req.body);
    const { email, password } = req.body;
    for (const key in req.body) {
      if (!req.body[key] || req.body[key].trim() === "") {
        console.log(`Field ${key} is missing or empty`);
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with the provided email");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }
    const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
    });
    console.log("Login successful, returning token");
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ msg: "An error occurred during login" });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;
    const schemaFields = Object.keys(User.schema.paths);
    for (const key in update) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          msg: `Unknown field: ${key}`,
        });
      }
      if (!update[key] || update[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const updateData = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res.status(404).json({
        status: 404,
        msg: "User not found",
      });
    }

    res.json({
      status: 200,
      msg: "User updated successfully",
      updateData,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: 500,
      msg: "An error occurred while updating the user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await User.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "User deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const userWithBookings = await User.findById(userId).populate({
      path: "bookingDetails",
      model: "bookingDetails",
      select:
        "name email age mobile_number guest bookingDate bookingTime status customerNotes",
    });

    console.log(userWithBookings);

    if (!userWithBookings) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      status: 200,
      msg: "User bookings retrieved successfully",
      data: userWithBookings.bookingDetails,
    });
    console.log(userWithBookings.bookingDetails);
  } catch (err) {
    console.log("Error in getUserBookings:", err);
    res.status(500).json({
      msg: "An error occurred while retrieving bookings",
    });
  }
}
module.exports = { register, login, updateUser, deleteUser, getUserBookings };
