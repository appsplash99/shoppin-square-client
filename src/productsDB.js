import faker from "faker";

faker.seed(123);

const productImages = [
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11067734/2019/12/10/34b589c2-80b9-4ad9-81ea-84333fbc46761575972548055-DILLINGER-Men-Tshirts-4071575972546110-1.jpg",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2378362/2018/6/9/270e0a7e-365b-4640-9433-b269c60bf3061528527188563-Moda-Rapido-Men-Maroon-Printed-Round-Neck-T-shirt-3811528527-1.jpg",
  "https://product.koovs.com/300x400/168653_ac396ada7f40470ba6a591f4a3b1dda9_image1_super_zoom.webp",
  "https://product.koovs.com/300x400/168027_b313eb8e925d495e98806c7189612152_image1_super_zoom.webp",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2170594/2018/5/19/24457960-64cd-461e-b6e0-1a5c4e9114821526717997313-Roadster-Men-Grey-Solid-Henley-Neck-T-shirt-5741526717995706-1.jpg",
  "https://product.koovs.com/300x400/166835_918064feb9a14665b4941b8d9cd1205e_image1_super_zoom.webp",
  "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7452058/2019/1/30/0b7be930-948c-4e5e-9419-da64232295941548845036379-DILLINGER-Men-Green--Black-Printed-Round-Neck-T-shirt-921548-1.jpg"
];

const productDiscounts = [20, 70, 50, 80, 60, 55];

const productBrands = ["Adidas", "Puma", "DMNX", "nike", "Roadster", "Fila"];

const productDescription = [
  "Men Navy Blue & Red Striped Round Neck T-shirt",
  "Abstract Print Training T-Shirt",
  "Men Grey Slub Effect Henley Neck T-shirt",
  "Men Green & Black Printed Round Neck T-shirt",
  "Longline Graphic Print Crew Neck Top"
];

export const PRODUCTSDATA = [...Array(20)].map((product) => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.random.arrayElement([...productDescription]),
    image: faker.random.arrayElement([...productImages]),
    price: faker.commerce.price(),
    material: faker.commerce.productMaterial(),
    brandName: faker.random.arrayElement([...productBrands]),
    discount: faker.random.arrayElement([...productDiscounts]),
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1.7, 2, 2.9, 3.5, 4, 4.3, 4.5, 5]),
    numberOfRatings: faker.datatype.number(),
    qty: 1,
    offer: faker.random.arrayElement([
      "Save 50",
      "70% bonanza",
      "Republic Day Sale"
    ]),
    idealFor: faker.random.arrayElement([
      "Men",
      "Women",
      "Girl",
      "Boy",
      "Senior"
    ]),
    level: faker.random.arrayElement([
      "beginner",
      "amateur",
      "intermediate",
      "advanced",
      "professional"
    ]),
    color: faker.commerce.color()
  };
});

// console.log(faker);
//
