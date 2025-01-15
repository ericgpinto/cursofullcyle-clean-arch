import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product 1", 264.46);

const input = {
  id: product.id,
  name: "Product 2",
  price: 126,
};

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a customer", async () => {
    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    await productRepository.create(product);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
