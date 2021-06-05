const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    slug: {type: String},
    content: {type: String, trim: true, require: true},
    media: {type: String, trim: true, required: true},
    thumbnail: {type: String, trim: true},
    post_status: {
      type: String,
      default: 'draft',
      enum: ['draft', 'live', 'deleted'],
    },
    media_status: {
      type: String,
      default: 'processing',
      enum: ['completed', 'processing'],
    },
    deleted_at: {type: Date, default: undefined},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Post', PostSchema);
