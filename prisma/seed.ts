import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

import { dataProducts } from "./data/products";

import { dataCategories } from "./data/categories";

async function seedCategories() {
  await prisma.category.createMany({
    data: dataCategories.map((category) => ({
      name: category.name,
      slug: category.slug.toLowerCase(),
    })),
    skipDuplicates: true,
  });
}

async function seedProducts() {
  for (const dataProduct of dataProducts) {
    const { categorySlug, ...product } = dataProduct;

    const upsertQuery = {
      ...product,
      description: product.description ?? "No description",
      category: { connect: { slug: categorySlug.toLowerCase() } },
    };

    await prisma.product.upsert({
      where: { slug: dataProduct.slug },
      update: upsertQuery,
      create: upsertQuery,
    });
  }
}

async function main() {
  await seedCategories();
  await seedProducts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
