//require('dotenv').config();
const accountSid = 'AC57c788fcf7819b829eea39f8e6afcfad'; //process.env.TWILIO_ACCOUNT_SID;
const authToken  = '2671ab97e71f67df2d7c9635d1dc3941';  //process.env.TWILIO_AUTH_TOKEN;
const client     = require('twilio')(accountSid, authToken);

const messageCustomer = (customer, restaurant, time, order_url) => {
  const message = `Hello ${(customer)}, your order from ${restaurant} should be ready in ${time} mins! You can check the ETA at ${order_url}.`

  client.messages.create({
    to: "+14168849710",
    from: "+16475030312",
    body: message
  }, (err, message) => {
    if (err) {
      // cb(err);
      return null;
    }
  });
}

const messageComplete = (customer, restaurant, order_url) => {
  const message = `Hello ${(customer)}, your order from ${restaurant} is now ready! You can verify at ${order_url}.`

  client.messages.create({
    to: "+14168849710",
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
    to: "+14168856638",
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
  complete: messageComplete,
  call: callRestaurant
};
