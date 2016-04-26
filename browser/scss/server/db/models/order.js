var mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId},
    quantity: Number,
    price: Number
});

var orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['created','pending', 'placed', 'canceled', 'closed'],
        default: 'created'
    },
    items: [itemSchema],
    address: String,
    name: String

});
//Get subtotal for order
orderSchema.methods.subtotal = function(){
  return this.items.reduce(function(acc, item){
    return acc + (item.price * item.quantity);
  }, 0);
};

//adds item to cart - takes a product and {quantity}
orderSchema.methods.addItem = function(product, orderDetails){
    var item = this.model('LineItem')({
        product: product._id,
        quantity: orderDetails ? orderDetails.quantity : 1,
        price: product.price

    });
    this.items.push(item);
    return this.save();
};

//remove item from order
orderSchema.methods.removeItem = function(product){
  var item = this.items.filter(function(item){
    return item.product === product._id;
  })[0];
  this.items.remove(item);
  return this.save();
};
//update quantity of item
orderSchema.methods.updateQuantity = function(itemIdx, quantity){
  var item = this.items[itemIdx];
  item.quantity = quantity;
  return this.save();
};

//returns full product object - argument is the index of the item
orderSchema.methods.getProductFromItem = function(itemIdx){
  var productId = this.items[itemIdx].product;
  return this.model('Product').findById(productId);

};

//called when an order has been placed
orderSchema.methods.commit = function(){
  return new Promise(function(resolve,reject){
    if (this.status === 'pending'){ //status is 'pending' if order has been added to a user
      this.status = 'placed';
      this.save()
      .then(function(order){
        resolve(order);
      });
    }
    reject("Order has no associated user");
  });
};

mongoose.model('LineItem', itemSchema);
mongoose.model('Order', orderSchema);
