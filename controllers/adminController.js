const Admin = require('../models/adminModels');

const adminController = {
  createAdmin: async (req, res) => {
    try {
      const { name, email, idToken } = req.body;

      if (!name || !email || !idToken) {
        return res.status(400).json({ error: "Name, email, and idToken are required" });
      }

      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({ error: "Admin with this email already exists" });
      }

      const admin = new Admin({
        name,
        email,
        googleId: idToken, //  idToken is the Google ID token
      });

      await admin.save();

      return res.status(200).json({
        code: 200,
        description: "Admin added successfully",
        success: true,
        admin,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Internal server error";
      if (error.message) {
        errorMessage = error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  },
  googleCallback: async (req, res) => {
    try {
      // Get the authorization code from the request query parameters
      const { code } = req.query;

      // Exchange the authorization code for an access token
      const { tokens } = await oauth2Client.getToken(code);

      // Set the access token in the OAuth2 client
      oauth2Client.setCredentials(tokens);

      // Use the access token to fetch user information from the Google API
      const { data } = await google.people({ version: "v1", auth: oauth2Client }).people.get({
        resourceName: "people/me",
        personFields: "names,emailAddresses",
      });

      // Extract the user's name and email address from the response
      const name = data.names?.[0]?.displayName;
      const email = data.emailAddresses?.[0]?.value;

      // TODO: Perform any additional actions with the user information
      // For example, create a new admin account with the name and email

      // Redirect the user to a success page or the admin dashboard
      res.redirect("/admin/success");
    } catch (error) {
      // Handle any errors that occur during the callback process
      console.error("Google callback error:", error);
      res.redirect("/admin/error");
    }
  },
};

module.exports = adminController;
