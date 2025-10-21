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
      // Coba temukan Author dan Category. findUniqueOrThrow akan throw jika tidak ditemukan.
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

      await prisma.product.upsert({
        where: { slug: dataProduct.slug },
        update: upsertQuery,
        create: upsertQuery,
      });
    } catch (e) {
      console.error(
        `❌ GAGAL SEED PRODUK: ${dataProduct.title} (Slug: ${dataProduct.slug})`,
        `Author Slug dicari: ${authorSlug} | Category Slug dicari: ${categorySlug}`
      );
      throw new Error(`Data mismatch: ${dataProduct.slug}`);
    }
  }
  console.log("--- END SEEDING PRODUCTS SUCCESSFULLY ---");
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
