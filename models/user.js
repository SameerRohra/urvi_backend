const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },  // Added date of birth field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  goals: { type: String },
  periodRegularity: { type: String },
  avgPeriodDuration: { type: Number },
  periodHistory: { type: [Date] },
  cycleIrregularities: { type: String },
  birthControlMethod: { type: String },
  healthConditions: { type: String },
  cycleSymptoms: { type: String },
  skinImpact: { type: String },
  energyImpact: { type: String },
  dietImpact: { type: String },
  sleepQuality: { type: String },
  hydrationHabit: { type: String },
  exerciseLevel: { type: String },
  weight: { type: Number },
  height: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);