class Dimension {
  constructor(height, width, len) {
    this.height = height;
    this.width = width;
    this.len = len;
  }

  rotation() {
    return [
      new Dimension(this.height, this.width, this.len),
      new Dimension(this.height, this.len, this.width),
      new Dimension(this.width, this.height, this.len),
      new Dimension(this.width, this.len, this.height),
      new Dimension(this.len, this.height, this.width),
      new Dimension(this.len, this.width, this.height),
    ];
  }

  volume() {
    return this.height * this.width * this.len;
  }
}

class Box extends Dimension {
  constructor(height, width, len, type = "") {
    super(height, width, len);
    this.type = type;
  }
}

class Product extends Dimension {
  constructor(height, width, len, item = "") {
    super(height, width, len);
    this.item = item;
  }
}

function lowestRotationByLength(product) {
  return product.rotation().sort((a, b) => a.len - b.len)[0];
}

function smallestPossibleBox(products) {
  let boxHeight = 0;
  let boxWidth = 0;
  let boxLength = 0;

  for (const product of products) {
    const rotatedProduct = lowestRotationByLength(product);

    boxHeight = Math.max(boxHeight, rotatedProduct.height);
    boxWidth = Math.max(boxWidth, rotatedProduct.width);
    boxLength += rotatedProduct.len;
  }

  return new Box(boxHeight, boxWidth, boxLength);
}

function boxHolds(boxNecessary, boxAvailable) {
  return boxAvailable.rotation().some((rotation) => {
    return (
      boxNecessary.height <= rotation.height &&
      boxNecessary.width <= rotation.width &&
      boxNecessary.len <= rotation.len
    );
  });
}

function pack(products, boxes) {
  const boxNecessary = smallestPossibleBox(products);

  const boxesThatFit = boxes.filter((box) =>
    boxHolds(boxNecessary, box),
  );

  boxesThatFit.sort((a, b) => a.volume() - b.volume());

  return {
    boxNecessary: boxNecessary,
    idealBox: boxesThatFit[0] || null,
  };
}

export {
  Dimension,
  Box,
  Product,
  lowestRotationByLength,
  smallestPossibleBox,
  boxHolds,
  pack,
};
