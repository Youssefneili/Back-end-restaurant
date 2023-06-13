const Admin = require("../models/adminModels");
const { v4: uuidv4 } = require("uuid");

const adminController = {
  createAdmin: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if name, email, or password is missing
      if (!name || !email || !password) {
        res.status(500).json({ error: "Failed" });
      } else {
        // Create a new Admin instance
        const admin = new Admin({
          id: uuidv4(),
          name,
          email,
          password,
        });

        // Save the admin to the database
        await admin.save();

        // Respond with success message
        res.status(200).json({
          code: 200,
          description: "Admin added successfully",
          success: true,
        });
      }
    } catch (err) {
      // Handle any errors that occurred during the process
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminController;
