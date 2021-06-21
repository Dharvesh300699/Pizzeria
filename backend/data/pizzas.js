const pizzas = [
  {
    name: "Margherita",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619966751/margherita_1619966749107.jpg",
    public_id: "margherita_1619966749107",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619956515/double_cheese_margherita_1619956513760.jpg",
    public_id: "double_cheese_margherita_1619956513760",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881174/farmhouse_1619881180722.jpg",
    public_id: "farmhouse_1619881180722",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881261/peppy_paneer_1619881269909.jpg",
    public_id: "peppy_paneer_1619881269909",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881348/mexican_green_wave_1619881361713.jpg",
    public_id: "mexican_green_wave_1619881361713",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881435/deluxe_veggie_1619881440650.jpg",
    public_id: "deluxe_veggie_1619881440650",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881507/veg_extravaganza_1619881513792.jpg",
    public_id: "veg_extravaganza_1619881513792",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881602/cheese_corn_1619881593956.jpg",
    public_id: "cheese_corn_1619881593956",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881661/paneer_makhni_1619881672101.jpg",
    public_id: "paneer_makhni_1619881672101",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881776/veggie_paradise_1619881779361.jpg",
    public_id: "veggie_paradise_1619881779361",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881836/fresh_veggie_1619881837887.jpg",
    public_id: "fresh_veggie_1619881837887",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881888/indian_tandoori_paneer_1619881892494.jpg",
    public_id: "indian_tandoori_paneer_1619881892494",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619881954/pepper_barbecue_chicken_1619881964004.jpg",
    public_id: "pepper_barbecue_chicken_1619881964004",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882030/chicken_sausage_1619882027993.jpg",
    public_id: "chicken_sausage_1619882027993",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882087/chicken_golden_delight_1619882094569.jpg",
    public_id: "chicken_golden_delight_1619882094569",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882152/non-veg_supreme_1619882154967.jpg",
    public_id: "non-veg_supreme_1619882154967",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882257/dominator_1619882260686.jpg",
    public_id: "dominator_1619882260686",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882324/pepper_barbecue_onion_1619882326437.jpg",
    public_id: "pepper_barbecue_onion_1619882326437",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882385/chunky_chicken_1619882388477.jpg",
    public_id: "chunky_chicken_1619882388477",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882444/indian_chicken_tikka_1619882448344.jpg",
    public_id: "indian_chicken_tikka_1619882448344",
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
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882508/pizza_mania_tomato_1619882510860.jpg",
    public_id: "pizza_mania_tomato_1619882510860",
    description:
      "Juicy tomato in a flavourful combination with cheese I tangy sauce",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Veg Loaded",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882638/veg_loaded_1619882629502.jpg",
    public_id: "veg_loaded_1619882629502",
    description:
      "Tomato | Grilled Mushroom |Jalapeno |Golden Corn | Beans in a fresh pan crust",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Cheesy",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882695/cheesy_1619882695702.jpg",
    public_id: "cheesy_1619882695702",
    description: "Orange Cheddar Cheese | Mozzarella",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Capsicum",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882753/capsicum_1619882755466.jpg",
    public_id: "capsicum_1619882755466",
    description: "Capsicum",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Onion",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882817/onion_veg_1619882820163.jpg",
    public_id: "onion_veg_1619882820163",
    description: "Onion",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Golden Corn",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882875/golden_corn_veg_1619882876964.jpg",
    public_id: "golden_corn_veg_1619882876964",
    description: "Golden Corn",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Paneer & Onion",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619882932/paneer_onion_1619882934789.jpg",
    public_id: "paneer_onion_1619882934789",
    description: "Creamy Paneer | Onion",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Cheese & Tomato",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619883001/cheese_tomato_1619883003576.jpg",
    public_id: "cheese_tomato_1619883003576",
    description: "A delectable combination of cheese and juicy tomato",
    category: "veg",
    sizes: [{ size: "regular", price: 100 }],
    pizzamania: true,
  },
  {
    name: "Non Veg Loaded",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619883071/loaded_1619883077689.jpg",
    public_id: "loaded_1619883077689",
    description:
      "Peri - Peri chicken | Pepper Barbecue | Chicken Sausage in a fresh pan crust",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
  {
    name: "Chicken Sausage",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619883134/chicken_sausage_mania_1619883132759.jpg",
    public_id: "chicken_sausage_mania_1619883132759",
    description: "Chicken Sausage | Cheese",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
  {
    name: "Pepper Barbecue Chicken",
    image:
      "https://res.cloudinary.com/dswp5qfpm/image/upload/v1619883192/pepper_barbecue_chicken_1619883196706.jpg",
    public_id: "pepper_barbecue_chicken_1619883196706",
    description: "Pepper Barbecue Chicken",
    category: "nonveg",
    sizes: [{ size: "regular", price: 150 }],
    pizzamania: true,
  },
]

module.exports = pizzas
