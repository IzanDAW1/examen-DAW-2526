import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,    
    required: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "referees",
  }
});

export default mongoose.model('Matches', matchSchema);
