const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
      ...rest, // 12 questions data will be saved here
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email, making sure to include all fields
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Prepare the user data (include the required fields)
    const userData = {
      _id: user._id,
      email: user.email,
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
      height: user.height
    };

    // Send response with token and full user data
    res.status(200).json({ token, user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
