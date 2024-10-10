async function getRecommendation(message, products) {
    // Mock AI recommendation using keywords

  
    let recommendedProduct = products[0]; 
  
    if (message.toLowerCase().includes('python')) {
      recommendedProduct = products.find(p => p.name.includes('Python'));
    } else if (message.toLowerCase().includes('machine learning')) {
      recommendedProduct = products.find(p => p.name.includes('Machine Learning'));
    } else if (message.toLowerCase().includes('web development')) {
      recommendedProduct = products.find(p => p.name.includes('Web Development'));
    }
  
    return recommendedProduct;
  }
  
  module.exports = { getRecommendation };
  