const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    console.log(req.body);  // Log to check data coming in

    const { email, password, fullName, dateOfBirth, ...rest } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      fullName,
      email,
      dateOfBirth, // Added date of birth
      password: hashedPassword,
      ...rest, // Save other data as needed
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const userData = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth, // Added date of birth
      goals: user.goals,
      periodRegularity: user.periodRegularity,
      avgPeriodDuration: user.avgPeriodDuration,
      periodHistory: user.periodHistory,
      cycleIrregularities: user.cycleIrregularities,
      birthControlMethod: user.birthControlMethod,
      healthConditions: user.healthConditions,
      cycleSymptoms: user.cycleSymptoms,
      skinImpact: user.skinImpact,
      energyImpact: user.energyImpact,
      dietImpact: user.dietImpact,
      sleepQuality: user.sleepQuality,
      hydrationHabit: user.hydrationHabit,
      exerciseLevel: user.exerciseLevel,
      weight: user.weight,
      height: user.height,
    };

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};