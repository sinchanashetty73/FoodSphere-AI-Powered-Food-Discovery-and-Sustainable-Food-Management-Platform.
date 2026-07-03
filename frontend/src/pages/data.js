

    const data = [
  {
    id: 1,
    name: "Sakura Restaurant",
    price: "$10",
    categories: ["get-together"],
    img: "https://i.pinimg.com/736x/98/13/fe/9813fe405e7881e89b4c03b68252bf29.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 2,
    name: "Zen Garden Bites",
    price: "$12",
    categories: ["romantic"],
    img: "https://i.pinimg.com/1200x/56/52/3e/56523e800ac1954ba7f99d3f96210f01.jpg",
    distance: "4 km away",
    about: "Perfect place for romantic dinners with peaceful interior design.",
    rating: 4.3,
    reviews: [
      { user: "Sneha", comment: "Lovely place", rating: 4 },
      { user: "Kiran", comment: "Good service", rating: 5 }
    ]
  },
  {
    id: 3,
    name: "Tokyo Taste",
    price: "$14",
    categories: ["party", "romantic"],
    img: "https://i.pinimg.com/736x/1d/2d/a2/1d2da2765f5696dc8e962578f397648f.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 4,
    name: "Miso Hungry",
    price: "$11",
    categories: ["get-together"],
    img: "https://i.pinimg.com/1200x/f9/ce/35/f9ce35df37ff5ecf8cd499e2d281adad.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 5,
    name: "Ramen Royale",
    price: "$15",
    categories: ["romantic"],
    img: "https://i.pinimg.com/1200x/55/44/19/5544190493a2ae61754815639c04f548.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 6,
    name: "Mizuki",
    price: "$15",
    categories: ["party"],
    img: "https://i.pinimg.com/1200x/46/7c/b8/467cb81481e3c6f0ceec4f94ede12692.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 7,
    name: "The Pearl of Japan",
    price: "$20",
    categories: ["party", "birthday"],
    img: "https://i.pinimg.com/736x/75/13/f8/7513f87dc6c914a47a8218f8d9f376b6.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 8,
    name: "Glorious Gyoza",
    price: "$10",
    categories: ["party"],
    img: "https://i.pinimg.com/736x/f1/d3/84/f1d38411ffe9e7192d60da76420d7757.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 9,
    name: "Mizuki Special",
    price: "$15",
    categories: ["get-together"],
    img: "https://i.pinimg.com/1200x/74/cd/3c/74cd3caed7f8cb0720bcdfebc0b8646c.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 10,
    name: "Ramen Royale Birthday",
    price: "$15",
    categories: ["birthday"],
    img: "https://i.pinimg.com/1200x/55/44/19/5544190493a2ae61754815639c04f548.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 11,
    name: "Niku-Azabu",
    price: "$18",
    categories: ["birthday", "get-together"],
    img: "https://i.pinimg.com/736x/ba/62/a3/ba62a336c687a4bf1c54fbf8c79ebcf0.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  },
  {
    id: 12,
    name: "Zen Cafe",
    price: "$22",
    categories: ["birthday", "romantic"],
    img: "https://i.pinimg.com/736x/96/a5/11/96a511585c3357e1d663402debda85c3.jpg",
    distance: "2.5 km away",
    about: "A beautiful Japanese restaurant with a calm dining atmosphere and authentic dishes.",
    rating: 4.5,
    reviews: [
      { user: "Anu", comment: "Very tasty food", rating: 5 },
      { user: "Rahul", comment: "Nice ambience", rating: 4 }
    ]
  }
];
export default data;
