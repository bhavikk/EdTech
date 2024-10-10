// seedProducts.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/edtech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: 'Intro to Python',
    description: 'Learn the basics of Python programming.',
    price: 99.99,
    image: '/images/intro-to-python.jpeg',  // Path to image
    rating: 4.5,
  },
  {
    name: 'Advanced Machine Learning',
    description: 'Master machine learning algorithms.',
    price: 199.99,
    image: '/images/ml-course.webp',  // Path to image
    rating: 4.8,
  },
  {
    name: 'Web Development Bootcamp',
    description: 'Become a full-stack web developer.',
    price: 149.99,
    image: '/images/web-dev-course.webp',  // Path to image
    rating: 4.7,
  },
];

Product.insertMany(products)
  .then(() => {
    console.log('Products seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Failed to seed products:', err);
  });
