As a customer, I'd like to select a menu item because I'd like to consume it.

Given that I'm viewing the menu
When I select an item
Then that item gets added to my cart AND the cart icon reflects one more item in it.

------------

As a customer, I want to view my cart, because I want to know my order info.

Given that I'm viewing the menu
When I select the cart icon
Then my cart items are displayed.

------------

As a customer, I want to edit my cart, because I've changed my mind...

Given that I'm viewing the cart,
When I modify an item (change item number, or delete)
Then my cart displays those changes.

------------

As a customer, I'd like to complete my order, because I'm ready to get it.

Given that I'm viewing the cart,
When I select 'Checkout'
Then my order is processed (sent to server) and I can see an order confirmation.

------------

As a customer, I'd like to know when my food will be ready, because time is of the essence.

Given that I received an SMS notification
When I visit the confirmation page again (or refresh)
Then I see the exact time until my order is ready.

------------

As a restaurant, I'd like to fulfill an order, because that's what my business is for

Given that received a phone call
When I visit order page
Then I see all active orders AND can update ETA.