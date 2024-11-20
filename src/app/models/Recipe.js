import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    // minlength: [10, 'Description must be at least 10 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

export default Recipe;