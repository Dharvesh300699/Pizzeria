const pizzas = [
  {
    name: "Margherita",
    image: "/images/margherita.jpg",
    description:
      "A hugely popular margherita, with a deliciously tangy single cheese topping",
    category: "veg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 165 },
      { size: "large", price: 215 },
    ],
    pizzamania: false,
  },
  {
    name: "Double Cheese Margherita",
    image: "/images/double_cheese_margherita.jpg",
    description:
      "The ever-popular Margherita - loaded with extra cheese... oodies of it!",
    category: "veg",
    sizes: [
      { size: "regular", price: 115 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Farm House",
    image: "/images/farmhouse.jpg",
    description:
      "A pizza that goes ballistic on veggies! Overload of crisp capsicum, succulent mushrooms and fresh tomatoes",
    category: "veg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 160 },
      { size: "large", price: 240 },
    ],
    pizzamania: false,
  },
  {
    name: "Peppy Paneer",
    image: "/images/peppy_paneer.jpg",
    description:
      "Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!",
    category: "veg",
    sizes: [
      { size: "regular", price: 100 },
      { size: "medium", price: 140 },
      { size: "large", price: 225 },
    ],
    pizzamania: false,
  },
  {
    name: "Mexican Green Wave",
    image: "/images/mexican_green_wave.jpg",
    description:
      "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno",
    category: "veg",
    sizes: [
      { size: "regular", price: 110 },
      { size: "medium", price: 170 },
      { size: "large", price: 220 },
    ],
    pizzamania: false,
  },
  {
    name: "Deluxe Veggie",
    image: "/images/deluxe_veggie.jpg",
    description:
      "The onions, the capsicum, those delectable mushrooms - with paneer and golden corn to top it all.",
    category: "veg",
    sizes: [
      { size: "regular", price: 90 },
      { size: "medium", price: 155 },
      { size: "large", price: 210 },
    ],
    pizzamania: false,
  },
  {
    name: "Veg Extravaganza",
    image: "/images/veg_extravaganza.jpg",
    description:
      "Overload of golden corn, exotic black olives, crunchy onions, crisp capsicum, succulent mushrooms and jalapeno with extra cheese",
    category: "veg",
    sizes: [
      { size: "regular", price: 105 },
      { size: "medium", price: 150 },
      { size: "large", price: 200 },
    ],
    pizzamania: false,
  },
  {
    name: "Cheese & Corn",
    image: "/images/cheese_corn.jpg",
    description: "Cheese | Golden corn",
    category: "veg",
    sizes: [
      { size: "regular", price: 120 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Paneer Makhani",
    image: "/images/paneer_makhni.jpg",
    description: "Paneer and Capsicum on Makhani Sauce",
    category: "veg",
    sizes: [
      { size: "regular", price: 125 },
      { size: "medium", price: 180 },
      { size: "large", price: 250 },
    ],
    pizzamania: false,
  },
  {
    name: "Veggie Paradise",
    image: "/images/veggie_paradise.jpg",
    description: "Golden Corn, Black Olives, Capsicum & Red Paprika",
    category: "veg",
    sizes: [
      { size: "regular", price: 90 },
      { size: "medium", price: 160 },
      { size: "large", price: 215 },
    ],
    pizzamania: false,
  },
  {
    name: "Fresh Veggie",
    image: "/images/fresh_veggie.jpg",
    description: "Onion | Capsicum",
    category: "veg",
    sizes: [
      { size: "regular", price: 90 },
      { size: "medium", price: 160 },
      { size: "large", price: 225 },
    ],
    pizzamania: false,
  },
  {
    name: "Indi Tandoori Paneer",
    image: "/images/indian_tandoori_paneer.jpg",
    description:
      "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum I red paprika I mint mayo",
    category: "veg",
    sizes: [
      { size: "regular", price: 125 },
      { size: "medium", price: 195 },
      { size: "large", price: 240 },
    ],
    pizzamania: false,
  },
  {
    name: "Pepper Barbecue Chicken",
    image: "/images/pepper_barbecue.jpg",
    description: "Pepper Barbecue Chicken | Cheese",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 140 },
      { size: "medium", price: 195 },
      { size: "large", price: 265 },
    ],
    pizzamania: false,
  },
  {
    name: "Chicken Sausage",
    image: "/images/chicken_sausage.jpg",
    description: "Chicken Sausage | Cheese",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 135 },
      { size: "medium", price: 180 },
      { size: "large", price: 250 },
    ],
    pizzamania: false,
  },
  {
    name: "Chicken Golden Delight",
    image: "/images/chicken_golden_delight.jpg",
    description:
      "Mmm! Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Non Veg Supreme",
    image: "/images/non-veg_supreme.jpg",
    description:
      "Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Chicken Dominator",
    image: "/images/dominator.jpg",
    description:
      "Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Pepper Barbecue & Onion",
    image: "/images/pepper_barbecue_onion.jpg",
    description: "Pepper Barbecue Chicken | Onion",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Chicken Fiesta",
    image: "/images/chunky-chicken.png",
    description:
      "Grilled Chicken Rashers | Peri-Peri Chicken | Onion | Capsicum",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Indi Chicken Tikka",
    image: "/images/indian_chicken_tikka.jpg",
    description:
      "The wholesome flavour of tandoori masala with Chicken tikka I onion I red paprika I mint mayo",
    category: "nonveg",
    sizes: [
      { size: "regular", price: 95 },
      { size: "medium", price: 175 },
      { size: "large", price: 235 },
    ],
    pizzamania: false,
  },
  {
    name: "Tomato",
    image: "/images/pizza_mania_tomato.png",
    description:
      "Juicy tomato in a flavourful combination with cheese I tangy sauce",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Veg Loaded",
    image: "/images/veg_loaded.jpg",
    description:
      "Tomato | Grilled Mushroom |Jalapeno |Golden Corn | Beans in a fresh pan crust",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Cheesy",
    image: "/images/cheesy.jpg",
    description: "Orange Cheddar Cheese | Mozzarella",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Capsicum",
    image: "/images/capsicum.jpg",
    description: "Capsicum",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Onion",
    image: "/images/onion_veg.jpg",
    description: "Onion",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Golden Corn",
    image: "/images/golden_corn_veg.jpg",
    description: "Golden Corn",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Paneer & Onion",
    image: "/images/paneer_onion.jpg",
    description: "Creamy Paneer | Onion",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Cheese & Tomato",
    image: "/images/cheese_tomato.png",
    description: "A delectable combination of cheese and juicy tomato",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Non Veg Loaded",
    image: "/images/loaded.jpg",
    description:
      "Peri - Peri chicken | Pepper Barbecue | Chicken Sausage in a fresh pan crust",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
  {
    name: "Chicken Sausage",
    image: "/images/chicken_sausage_mania.jpg",
    description: "Chicken Sausage | Cheese",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
  {
    name: "Pepper Barbecue Chicken",
    image: "/images/pepper_barbecue_chicken.jpg",
    description: "Pepper Barbecue Chicken",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
];

export default pizzas;
