GET '/'
if customer logged in, redirect to '/user/menu'
if restaurant logged in, redirect to '/admin'
else display home page with login and register buttons

-----CUSTOMER------

GET '/user/menu'
displays menu if customer logged in

POST '/user/cart'
when adding to cart from menu

GET '/user/cart'
displays items in cart page

PUT '/user/cart/:itemID'
if editing number of items

DELETE '/user/cart/:itemID'
if delete pressed on item

POST '/user/order'
when 'Checkout' is clicked

GET '/user/:orderID'
when 'Checkout' is clicked


---RESTAURANT-----

GET '/admin'
display orders - active and past below

POST '/admin/:orderID'
when ETA is changed
