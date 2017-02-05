require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);

const messageCustomer = (customer, order, restaurant, order_url) => {
  const message = `Hello ${(customer)}, your order of ${order} from ${restaurant} is being prepared! You can check the ETA at ${order_url}.`

  client.messages.create({
    to: "+16475506537",
    from: "+16475030312",
    body: message
  }, (err, message) => {
    if (err) {
      // cb(err);
      return null;
    }
  });
}



const callRestaurant = (customer, order, restaurant) => {
  client.calls.create({
    url: `https://handler.twilio.com/twiml/EHd82de43b7027cda1add178f95628fc42?restaurant=${encodeURI(restaurant)}&customer=${encodeURI(customer)}&order=${encodeURI(order)}`,
    to: "+16475506537",
    from: "+16475030312"
  }, function(err, call) {
    if (err) {
      // cb(err);
      return null;
    }
  });
}


module.exports = {
  message: messageCustomer,
  call: callRestaurant
};
