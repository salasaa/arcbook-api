import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

import { dataProducts } from "./data/products";
import { dataCategories } from "./data/categories";
import { dataAuthors } from "./data/authors";

async function seedCategories() {
  await prisma.category.createMany({
    data: dataCategories.map((category) => ({
      name: category.name,
      slug: category.slug.toLowerCase(),
    })),
    skipDuplicates: true,
  });
}

async function seedAuthors() {
  await prisma.author.createMany({
    data: dataAuthors.map((author) => ({
      name: author.name,
      slug: author.slug.toLocaleLowerCase(),
    })),
    skipDuplicates: true,
  });
}

async function seedProducts() {
  for (const dataProduct of dataProducts) {
    const { categorySlug, authorSlug, ...productBase } = dataProduct;

    try {
      const author = await prisma.author.findUniqueOrThrow({
        where: { slug: authorSlug.toLocaleLowerCase() },
      });
      const category = await prisma.category.findUniqueOrThrow({
        where: { slug: categorySlug.toLocaleLowerCase() },
      });

      const upsertQuery = {
        ...productBase,
        authorId: author.id,
        categoryId: category.id,
      };

      const product = await prisma.product.upsert({
        where: { slug: dataProduct.slug },
        update: upsertQuery,
        create: upsertQuery,
      });

      console.info(`✅ Seeded Product: ${product.title}`);
    } catch (e) {
      console.error(
        `❌ Failed Seeding Product: ${dataProduct.title} (Slug: ${dataProduct.slug})`,
        `Author Slug search: ${authorSlug} | Category Slug search: ${categorySlug}`
      );
      throw new Error(`Data mismatch: ${dataProduct.slug}`);
    }
  }
}

async function main() {
  await seedAuthors();
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
