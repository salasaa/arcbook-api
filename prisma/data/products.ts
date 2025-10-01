type Product = {
  slug: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  categorySlug: string;
  description?: string;
  imageUrl: string;
  inStock: boolean;
  publishYear: number;
};

export const dataProducts: Product[] = [
  {
    slug: "one-piece-vol-90",
    title: "One Piece Vol. 90",
    author: "Eiichiro Oda",
    price: 99000,
    originalPrice: 189000,
    categorySlug: "Comics",
    description:
      "The Straw Hat Pirates continue their adventures in the Wano Country arc, facing off against the powerful Beast Pirates and their leader, Kaido.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/83d11a05-8da3-4596-85e9-490b0d64d1ac/-/preview/429x640/",
    inStock: true,
    publishYear: 2021,
  },
  {
    slug: "one-piece-vol-82",
    title: "One Piece Vol. 82",
    author: "Eiichiro Oda",
    price: 65900,
    originalPrice: 89900,
    categorySlug: "Comics",
    description:
      "Whole Cake Island, in this arc, Luffy sneaks onto Big Mom's island to rescue Sanji.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/96e4881b-4d68-4857-9232-ce31ed7b191c/-/preview/579x900/",
    inStock: true,
    publishYear: 2017,
  },
];
