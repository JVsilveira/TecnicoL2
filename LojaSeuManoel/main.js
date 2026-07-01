import readline from "readline";
import { Box, Product, pack } from "./packing.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

const boxes = [
  new Box(30, 40, 80, "Caixa 1"),
  new Box(80, 50, 40, "Caixa 2"),
  new Box(50, 80, 60, "Caixa 3"),
];

async function main() {
  const products = [];

  const quantity = Number(await ask("Quantos produtos deseja cadastrar? "));

  for (let i = 0; i < quantity; i++) {
    console.log(`\nProduto ${i + 1}`);

    const item = await ask("Nome do produto: ");
    const height = Number(await ask("Altura: "));
    const width = Number(await ask("Largura: "));
    const len = Number(await ask("Comprimento: "));

    products.push(new Product(height, width, len, item));
  }

  const result = pack(products, boxes);

  console.log("\nResultado:");
  console.log("---------------------");
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

  rl.close();
}

main();
