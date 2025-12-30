import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({
  email: user.email,
  name: user.name,
  about: user.about,
  age: user.age,
  streak: user.streak
});


};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.userId);

  user.name = req.body.name ?? user.name;
  user.about = req.body.about ?? user.about;
  user.age = req.body.age ?? user.age;   // THIS LINE WAS MISSING

  await user.save();
  res.json({ msg: "Profile updated" });
};

