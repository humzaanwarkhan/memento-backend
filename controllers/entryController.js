import Entry from "../models/Entry.js";
import User from "../models/User.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const createEntry = async (req, res) => {

  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const exists = await Entry.findOne({
    user: req.userId,
    date: { $gte: start, $lte: end }
  });

  if (exists) return res.status(400).json({ msg: "Entry already exists today" });

  const { mood, text } = req.body;
  const encryptedText = encrypt(text); 

  const entry = await Entry.create({
    user: req.userId,
    date: new Date(),
    mood,
    text: encryptedText
  });


  const user = await User.findById(req.userId);

  // Yesterday window
  const yStart = new Date();
  yStart.setDate(yStart.getDate() - 1);
  yStart.setHours(0,0,0,0);

  const yEnd = new Date();
  yEnd.setDate(yEnd.getDate() - 1);
  yEnd.setHours(23,59,59,999);

  const hadYesterday = await Entry.findOne({
    user: req.userId,
    date: { $gte: yStart, $lte: yEnd }
  });

  if (hadYesterday) user.streak += 1;
  else user.streak = 1;

  await user.save();

  console.log("ENCRYPTION ACTIVE");
  res.status(201).json(entry);
};

export const updateEntry = async (req, res) => {
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const entry = await Entry.findOne({
    user: req.userId,
    date: { $gte: start, $lte: end }
  });

  if (!entry) return res.status(404).json({ msg: "No entry today" });

  if (req.body.text) entry.text = encrypt(req.body.text);
  if (req.body.mood) entry.mood = req.body.mood;

  await entry.save();
  res.json(entry);

};

export const getTodayEntry = async (req, res) => {
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const entry = await Entry.findOne({
    user: req.userId,
    date: { $gte: start, $lte: end }
  });

  if (!entry) return res.json(null);

  res.json({
    _id: entry._id,
    date: entry.date,
    mood: entry.mood,
    text: decrypt(entry.text)
  });
};

export const getAllEntries = async (req, res) => {
  const entries = await Entry.find({ user: req.userId }).sort({ date: -1 });

  const decrypted = entries.map(e => ({
    _id: e._id,
    date: e.date,
    mood: `Mood: ${e.mood}`,
    text: decrypt(e.text)
  }));

  res.json(decrypted);
};

export const getWeeklySummary = async (req, res) => {
  const moods = {
    happy: 2,
    calm: 1,
    neutral: 0,
    tired: -1,
    anxious: -2
  };

  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0,0,0,0);

  const entries = await Entry.find({
    user: req.userId,
    date: { $gte: start }
  });

  if (!entries.length) return res.json(null);

  let total = 0;
  let count = {};

  entries.forEach(e => {
    total += moods[e.mood];
    count[e.mood] = (count[e.mood] || 0) + 1;
  });

  const dominant = Object.keys(count).reduce((a,b) =>
    count[a] > count[b] ? a : b
  );

  res.json({
    averageMood: (total / entries.length).toFixed(2),
    dominantMood: dominant,
    entries: entries.length
  });
};



