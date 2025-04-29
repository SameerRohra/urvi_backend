const User = require('../models/User');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      email,
      goals,
      periodRegularity,
      avgPeriodDuration,
      periodHistory,
      cycleIrregularities,
      birthControlMethod,
      healthConditions,
      cycleSymptoms,
      skinImpact,
      energyImpact,
      dietImpact,
      sleepQuality,
      hydrationHabit,
      exerciseLevel,
      weight,
      height
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        email,
        goals,
        periodRegularity,
        avgPeriodDuration,
        periodHistory,
        cycleIrregularities,
        birthControlMethod,
        healthConditions,
        cycleSymptoms,
        skinImpact,
        energyImpact,
        dietImpact,
        sleepQuality,
        hydrationHabit,
        exerciseLevel,
        weight,
        height
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
