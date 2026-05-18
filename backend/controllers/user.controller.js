const User= require('../models/User')

const bcrypt = require('bcryptjs');


exports.getUserInfo = async (req, res) => {
  try {
  const UserInfo = await User.findById(req.params.id).select('-password');
    res.status(200).json(UserInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = {};

    if (name)  updateData.name  = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }


    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Done update info', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};