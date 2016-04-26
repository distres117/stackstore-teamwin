var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({ //Reviews will be embedded into products, so no need for a product reference
   content: {
       type:String,
       required: true
   },
   created: {
       type: Date,
       default: Date.now
   },
   author: {
       type: mongoose.Schema.Types.ObjectId
   },
   stars: {
     type: Number,
     min: 0,
     max: 5,
     default: 0
   }
});

//Returns the user who created this review
reviewSchema.methods.getAuthor = function(){
  return mongoose.model('User').findById(this.author);
};

mongoose.model('Review', reviewSchema);
