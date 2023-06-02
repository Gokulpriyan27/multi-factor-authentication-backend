const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return !this.githubId && !this.facebookId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  image:{
    type:String,
    required:true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
