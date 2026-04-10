--> FIRST PART 
    - Create folders : frontend + backend
    - Django Rest Framework installation
    - PostgreSQL + .env Setup
    - React App Creation
    - Enable CORS between React and Django
    - Test API ---> React Communication

--> SECOND PART 
    - Create Model : category, Product, UserProfile, Order, Order Item
    - Use Django Admin to add sample data
    - Create DRF serializers fro product & Category
    - Expose /api/products/ and /api/categories/ endpoints
    - Tailwind CSS setup

--> Third PART 
    - Fetch /api/products/using useEffect + fetch
    - display the products in grid (image + name + price)
    - Add loading / error states
    - Tailwind styling

--> Forth PART 
    - Setup React Router DOM
    - Create ProductDetail.jsx Page
    - Fetch /api/products/:id
    - Display product image, description, price
    - Add to cart button (UI only)

--> Fifth PART 
    - Create Cart and Cartitem models.
    - Expose /api/cart/, /api/cart/add/, /api/cart/remove/
    - Use fetch() to sync React cart with API
    - All these at Backend side 

--> Sixth PART 
    - Add products to cart from detail page.
    - Use Context API for cart state.
    - Display cart items on cart.
    - Update quantity (+/-).
    - Remove items.
    - All these at frontend side.

--> Seventh PART 
    - Update Cart Quantity (+/-) for django.
    - Django API intregation.
    - FE implementation.

--> Eighth PART 
    - Create Checkout form (Address, phone payment method dropdown)
    - API endpoint to create.
    - React frontend form --> POST to /api/orders/create.
    - Show success message after placing order.


--> Ninth PART 
    - Django Rest Simple JWT setup.
    - /api/register/ and /api/token/ endpoints.
    - React login/signup pages + store JWT in local storage.
    - Protect cart & order routes fro logged-in users.