type Product = {
  slug: string;
  title: string;
  authorSlug: string;
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
    authorSlug: "eiichiro-oda",
    price: 99000,
    originalPrice: 189000,
    categorySlug: "comics",
    description:
      "The Straw Hat Pirates continue their adventures in the Wano Country arc, facing off against the powerful Beast Pirates and their leader, Kaido.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/83d11a05-8da3-4596-85e9-490b0d64d1ac/-/preview/500x800/",
    inStock: true,
    publishYear: 2021,
  },
  {
    slug: "one-piece-vol-82",
    title: "One Piece Vol. 82",
    authorSlug: "eiichiro-oda",
    price: 65900,
    originalPrice: 89900,
    categorySlug: "comics",
    description:
      "Whole Cake Island, in this arc, Luffy sneaks onto Big Mom's island to rescue Sanji.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/96e4881b-4d68-4857-9232-ce31ed7b191c/-/preview/500x800/",
    inStock: true,
    publishYear: 2017,
  },
  {
    slug: "generasi-kembali-ke-akar",
    title: "Generasi Kembali ke Akar",
    authorSlug: "dr-Muhammad-faisal",
    price: 99000,
    originalPrice: 99000,
    categorySlug: "fiction",
    description:
      "Buku Generasi kembali ke akar ini sangat layak untuk didiskusikan, karena diskusi tentang generasi terus berkembang bagaikan bola salju yang bergulir liar. Generasi milenial dimulai dari 1981 hingga 2000 an. Konon mereka memiliki karakteristik kreatif dan inovatif, rasa sosial yang tinggi, menyukai nilai-nilai kebebasan, dan senang dengan suatu hal yang instan. Istilah generasi milenial sudah akrab terdengar di Indonesia sejak lama.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/881f1261-3f8f-4429-80c9-2448cd639485/-/preview/500x800/",
    inStock: true,
    publishYear: 2021,
  },
  {
    slug: "the-art-of-living",
    title: "The Art of Living",
    authorSlug: "grant-snider",
    price: 93750,
    originalPrice: 125000,
    categorySlug: "fiction",
    description:
      "The Art of Living fokus pada warna-warni kehidupan yang penuh empati, relaksasi, rasa syukur, dan mindfulness. Inilah tema-tema yang Snider eksplorasi untuk kita yang membutuhkan sedikit refleksi, harapan, dan angin segar dalam menjalani hiruk pikuk kehidupan.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/27f3cbac-8575-4d17-bd2a-8f4359813e6b/-/preview/500x800/",
    inStock: true,
    publishYear: 2023,
  },
  {
    slug: "schadenfreude-mengapa-kita-senang-melihat-orang-lain-susah",
    title: "Schadenfreude: Mengapa Kita Senang Melihat Orang Lain Susah",
    authorSlug: "t-a-s-a",
    price: 63750,
    originalPrice: 85000,
    categorySlug: "fiction",
    description:
      "Dalam bahasa Ibrani. menikmati bencana orang lain disebut simcha la-ed. Sementara. dalam bahasa Jerman. Itu disebut schadenfreude—dari kata Schaden yang berarti kerusakan atau cedera dan freude yang berarti sukacita atau kenikmatan: sukacita atas kerusakan.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/b3833b26-7c50-4442-856b-5da2a50dd853/-/preview/500x800/",
    inStock: false,
    publishYear: 2022,
  },
  {
    slug: "beyond-belief-fact-or-fiction",
    title: "Beyond Belief: Fact or Fiction",
    authorSlug: "guru-gembul",
    price: 130000,
    originalPrice: 130000,
    categorySlug: "non-fiction",
    description:
      "Melalui buku Beyond Belief: Fact or Fiction ini, Pak Guru Gembul mengajak kita berbicara hal-hal yang bernuansa teori konspirasi dan supranatural secara lebih bertanggung jawab, baik dari sisi sumber rujukan, pengambilan kesimpulan, hingga konsekuensinya dalam kehidupan sehari-hari.",
    imageUrl:
      "https://3mqxc38j34.ucarecd.net/97836041-e613-4cd5-ba29-bbe76e905a45/-/preview/500x800/",
    inStock: true,
    publishYear: 2024,
  },
];
