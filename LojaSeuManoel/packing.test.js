import { describe, it, expect } from "vitest";

import {
  Dimension,
  Box,
  Product,
  lowestRotationByLength,
  smallestPossibleBox,
  boxHolds,
  pack,
} from "./packing.js";

describe("Classe Dimensao", () => {
  it("deve calcular o volume corretamente", () => {
    const product = new Product(2, 3, 4);

    expect(product.volume()).toBe(24);
  });

  it("deve gerar 6 rotações", () => {
    const product = new Product(10, 20, 30);

    expect(product.rotation()).toHaveLength(6);
  });
});

describe("lowestRotationByLength", () => {
  it("deve escolher a menor dimensão como comprimento", () => {
    const product = new Product(40, 10, 25);

    const rotation = lowestRotationByLength(product);

    expect(rotation.len).toBe(10);
  });
});

describe("smallestPossibleBox", () => {
  it("deve calcular corretamente a menor caixa necessária", () => {
    const products = [new Product(10, 10, 10), new Product(20, 20, 20)];

    const box = smallestPossibleBox(products);

    expect(box.height).toBe(20);
    expect(box.width).toBe(20);
    expect(box.len).toBe(30);
  });
});

describe("boxHolds", () => {
  it("deve retornar true quando a caixa comporta os produtos", () => {
    const necessary = new Box(20, 20, 20);
    const avaliable = new Box(30, 30, 30);

    expect(boxHolds(necessary, avaliable)).toBe(true);
  });

  it("deve retornar false quando a caixa não comporta", () => {
    const necessary = new Box(60, 60, 60);
    const avaliable = new Box(30, 30, 30);

    expect(boxHolds(necessary, avaliable)).toBe(false);
  });
});

describe("pack", () => {
  it("deve escolher a menor caixa disponível", () => {
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

    const result = pack(products, boxes);

    expect(result.idealBox.type).toBe("Caixa 1");
  });

  it("deve empacotar corretamente os produtos 10x15x30 e 20x10x20", () => {
    const boxes = [
      new Box(30, 40, 80, "Caixa 1"),
      new Box(80, 50, 40, "Caixa 2"),
      new Box(50, 80, 60, "Caixa 3"),
    ];

    const products = [
      new Product(10, 15, 30, "Produto 2A"),
      new Product(20, 10, 20, "Produto 2B"),
    ];

    const result = pack(products, boxes);

    expect(result.boxNecessary.height).toBe(20);
    expect(result.boxNecessary.width).toBe(30);
    expect(result.boxNecessary.len).toBe(20);

    expect(result.idealBox.type).toBe("Caixa 1");
  });

  it("deve empacotar corretamente os produtos 10x10x10, 20x20x20 e 30x10x10", () => {
    const boxes = [
      new Box(30, 40, 80, "Caixa 1"),
      new Box(80, 50, 40, "Caixa 2"),
      new Box(50, 80, 60, "Caixa 3"),
    ];

    const products = [
      new Product(10, 10, 10, "Produto 3A"),
      new Product(20, 20, 20, "Produto 3B"),
      new Product(30, 10, 10, "Produto 3C"),
    ];

    const result = pack(products, boxes);

    expect(result.idealBox.type).toBe("Caixa 1");
  });

  it("deve retornar null quando nenhuma caixa servir", () => {
    const boxes = [new Box(30, 40, 80, "Caixa 1")];

    const products = [new Product(200, 200, 200)];

    const result = pack(products, boxes);

    expect(result.idealBox).toBeNull();
  });
});
