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
    description: 'Learn the basics of Python programming, covering fundamental syntax, data types, control structures, and simple algorithms. This course is perfect for beginners who want to dive into coding with Python.',
    price: 99.99,
    image: '/images/intro-to-python.jpeg',  // Path to image
    rating: 4.5,
  },
  {
    name: 'Advanced Machine Learning',
    description: 'Master machine learning algorithms including supervised and unsupervised learning. You will dive deep into models like SVMs, decision trees, neural networks, and ensemble learning methods.',
    price: 199.99,
    image: '/images/ml-course.webp',  // Path to image
    rating: 4.8,
  },
  {
    name: 'Web Development Bootcamp',
    description: 'Become a full-stack web developer by learning the latest web development technologies such as HTML, CSS, JavaScript, React, Node.js, and Express. Build real-world web applications by the end of the course.',
    price: 149.99,
    image: '/images/web-dev-course.webp',  // Path to image
    rating: 4.7,
  },
  {
    name: 'Data Science with Python',
    description: 'This comprehensive course will teach you how to use Python for Data Science. Learn about data manipulation using Pandas, data visualization with Matplotlib and Seaborn, and machine learning with Scikit-learn.',
    price: 129.99,
    image: '/images/data-science-course.jpeg',  // Path to image
    rating: 4.6,
  },
  {
    name: 'Cloud Computing with AWS',
    description: 'Get hands-on experience with Amazon Web Services (AWS), the most popular cloud platform. Learn to manage AWS services, set up cloud infrastructure, and deploy scalable applications.',
    price: 249.99,
    image: '/images/aws-course.webp',  // Path to image
    rating: 4.9,
  },
  {
    name: 'Cybersecurity Essentials',
    description: 'Learn the fundamentals of cybersecurity, including network security, encryption, ethical hacking, and securing systems from attacks. This course will prepare you for industry certifications like CompTIA Security+.',
    price: 199.99,
    image: '/images/cybersecurity-course.jpeg',  // Path to image
    rating: 4.7,
  },
  {
    name: 'Introduction to Artificial Intelligence',
    description: 'Understand the basic concepts of Artificial Intelligence, including search algorithms, decision making, and problem-solving. This course will give you a foundational understanding of how AI is applied in various fields.',
    price: 199.99,
    image: '/images/ai-course.jpeg',  // Path to image
    rating: 4.8,
  },
  {
    name: 'Natural Language Processing with Python',
    description: 'Explore the fascinating field of Natural Language Processing (NLP). This course covers text preprocessing, sentiment analysis, and building NLP models using libraries like NLTK, Spacy, and Hugging Face Transformers.',
    price: 179.99,
    image: '/images/nlp-course.webp',  // Path to image
    rating: 4.8,
  },
  {
    name: 'React Native Mobile App Development',
    description: 'Learn to build cross-platform mobile applications using React Native. This course will guide you through designing and developing mobile apps for iOS and Android with a single codebase.',
    price: 149.99,
    image: '/images/react-native-course.webp',  // Path to image
    rating: 4.6,
  },
  {
    name: 'DevOps with Docker and Kubernetes',
    description: 'Master the essential tools in the DevOps pipeline—Docker, Kubernetes, Jenkins, and CI/CD processes. Learn to automate deployments, manage containerized applications, and scale services using Kubernetes.',
    price: 199.99,
    image: '/images/devops-course.jpeg',  // Path to image
    rating: 4.9,
  },
  {
    name: 'Blockchain Development for Beginners',
    description: 'An introduction to blockchain technology and smart contracts development. Learn how to create decentralized applications (DApps) using Ethereum and Solidity, and explore blockchain use cases across industries.',
    price: 219.99,
    image: '/images/blockchain-course.webp',  // Path to image
    rating: 4.7,
  },
  {
    name: 'Data Structures and Algorithms in Java',
    description: 'Master data structures and algorithms using Java. This course covers arrays, linked lists, stacks, queues, trees, graphs, sorting algorithms, and dynamic programming. Ideal for preparing for technical interviews.',
    price: 109.99,
    image: '/images/dsa-java-course.jpeg',  // Path to image
    rating: 4.5,
  },
  {
    name: 'Big Data with Hadoop and Spark',
    description: 'Learn the fundamentals of Big Data with Hadoop and Spark. Understand distributed computing, data storage with HDFS, and real-time data processing with Apache Spark for large-scale data analytics.',
    price: 259.99,
    image: '/images/bigdata-course.webp',  // Path to image
    rating: 4.9,
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
