const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/productModel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/technoprobatchfirst';

const produceItems = (category, subcategory, count, baseName, basePrice, startId) => {
  const verifiedIds = {
    'men': [
      '1490114538077-0a7f8cb49891',
      '1539102980248-7123893a47b5',
      '1552374196-1ab2a1c593e8',
      '1480455624313-e29b44bbfde1',
      '1506794778202-cad84cf45f1d'
    ],
    'women': [
      '1483985988355-763728e1935b',
      '1496747611176-843222e1e57c',
      '1539133400262-6718d04f2f0b',
      '1503342217505-b0a15ec3261c',
      '1525507119028-ed4c629a60a3'
    ],
    'kids': [
      '1519278401344-9f4aee4917cc',
      '1622290291468-a28f7a7dc6a8',
      '1503454537195-1dcabb73ffb9',
      '1513950353085-c351c7274060',
      '1566453848086-de06ec229214'
    ]
  };

  const keywords = {
    'men-T-Shirts': 'shirt',
    'men-Bottoms': 'pants',
    'men-Shoes': 'footwear',
    'men-Accessories': 'accessory',
    'men-Outerwear': 'jacket',
    'men-Activewear': 'fitness',
    'women-T-Shirts': 'top',
    'women-Bottoms': 'skirt',
    'women-Shoes': 'heels',
    'women-Accessories': 'handbag',
    'women-Outerwear': 'coat',
    'women-Activewear': 'yoga',
    'women-Dresses': 'dress',
    'kids-Clothing': 'outfit',
    'kids-Shoes': 'sneakers',
    'kids-Accessories': 'toy'
  };

  const idList = verifiedIds[category] || verifiedIds.men;
  const query = keywords[`${category}-${subcategory}`] || subcategory;

  return Array.from({ length: count }, (_, i) => {
    const photoId = idList[i % idList.length];
    return {
      name: `${baseName} ${subcategory} ${startId + i}`,
      price: Math.floor(basePrice + (i * 105)),
      discountPercentage: 10 + (i % 5)*2,
      category: category,
      subcategory: subcategory,
      stock: 50 + i,
      description: `Premium quality ${subcategory} for ${category}. Durable and stylish.`,
      image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=80&sig=${startId + i}&${query}`
    };
  });
};

const seedProducts = [
  // MEN - 5 each
  ...produceItems('men', 'T-Shirts', 6, 'Men Essential', 799, 100),
  ...produceItems('men', 'Bottoms', 6, 'Men Classic', 1499, 110),
  ...produceItems('men', 'Shoes', 6, 'Men Sport', 2999, 120),
  ...produceItems('men', 'Accessories', 6, 'Men Luxe', 499, 130),
  ...produceItems('men', 'Outerwear', 6, 'Men Winter', 2499, 140),
  ...produceItems('men', 'Activewear', 6, 'Men Performance', 1299, 150),

  // WOMEN - 5 each
  ...produceItems('women', 'T-Shirts', 6, 'Women Chic', 699, 200),
  ...produceItems('women', 'Bottoms', 6, 'Women Slim', 1299, 210),
  ...produceItems('women', 'Shoes', 6, 'Women Elegant', 2199, 220),
  ...produceItems('women', 'Accessories', 6, 'Women Glam', 399, 230),
  ...produceItems('women', 'Outerwear', 6, 'Women Formal', 2299, 240),
  ...produceItems('women', 'Activewear', 6, 'Women Flow', 1099, 250),
  ...produceItems('women', 'Dresses', 6, 'Women Party', 1999, 260),

  // KIDS - 5 each
  ...produceItems('kids', 'Clothing', 10, 'Kids Fun', 499, 300),
  ...produceItems('kids', 'Shoes', 6, 'Kids Comfort', 1199, 310),
  ...produceItems('kids', 'Accessories', 6, 'Kids Cool', 299, 320),
];

// Specific overrides for better images (optional but good for 'acha' look)
const curatedImages = {
    'men-T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    'men-Bottoms': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
    'men-Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    'women-Dresses': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
    'kids-Clothing': 'https://images.unsplash.com/photo-1519278401344-9f4aee4917cc'
};

seedProducts.forEach(p => {
    const key = `${p.category}-${p.subcategory}`;
    if(curatedImages[key]) {
        // Just randomize the id and extra params
        p.image = `${curatedImages[key]}?auto=format&fit=crop&w=500&q=60&random=${Math.random()}`;
    }
});

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(seedProducts);
    console.log(`Successfully seeded ${seedProducts.length} products (Full Volume)`);
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
