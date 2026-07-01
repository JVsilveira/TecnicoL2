import { Box, Product, pack } from "./packing.js";

const boxes = [
  new Box(30, 40, 80, "Caixa 1"),
  new Box(80, 50, 40, "Caixa 2"),
  new Box(50, 80, 60, "Caixa 3"),
];

const products = [
  new Product(40, 10, 25, "PS5"),
  new Product(40, 30, 30, "Volante"),
  new Product(15, 20, 10, "Joystick"),
  new Product(10, 30, 10, "FIFA 22"),
  new Product(30, 15, 10, "Call of Duty - Cold War"),
];

const products2 = [
  new Product(10, 15, 30, "Produto 2A"),
  new Product(20, 10, 20, "Produto 2B"),
];
const products3 = [
  new Product(10, 10, 10),
  new Product(20, 20, 20),
  new Product(30, 10, 10),
];

const result = pack(products, boxes);
const result2 = pack(products2, boxes);
const result3 = pack(products3, boxes);

console.log(
  "Menor caixa possível:",
  `${result.boxNecessary.height} x ${result.boxNecessary.width} x ${result.boxNecessary.len}`,
);

if (result.idealBox) {
  console.log(
    "Caixa ideal:",
    result.idealBox.type,
    `${result.idealBox.height} x ${result.idealBox.width} x ${result.idealBox.len}`,
  );
} else {
  console.log("Nenhuma caixa disponível comporta os produtos.");
}

if (result2.idealBox) {
  console.log(
    `Caixa ideal para outro conjunto de dados 10x15x30 e 20x10x20:`,
    result2.idealBox.type,
    `${result2.idealBox.height} x ${result2.idealBox.width} x ${result2.idealBox.len}`,
  );
} else {
  console.log("Nenhuma caixa disponível comporta os produtos");
}

if (result3.idealBox) {
  console.log(
    `Caixa ideal para outro conjunto de dados 10x10x10, 20x20x20 e 30x10x10:`,
    result3.idealBox.type,
    `${result3.idealBox.height} x ${result3.idealBox.width} x ${result3.idealBox.len}`,
  );
} else {
  console.log("Nenhuma caixa disponível comporta os produtos.");
}
