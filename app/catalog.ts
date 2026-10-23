export type Product = {
  id: string;
  name: string;
  english: string;
  origin: string;
  kind: "نرم" | "نیمه‌خشک" | "خشک";
  note: string;
  price: number;
  photo: string;
  tile: string;
  tag: string;
};

// Illustrative products and toman prices for the storefront design prototype.
export const products: Product[] = [
  { id: "mazafati", name: "خرمای مضافتی", english: "MAZAFATI", origin: "بم، کرمان", kind: "نرم", note: "نرم و لطیف، با شیرینی دلنشین؛ همراه همیشگی یک فنجان چای.", price: 145000, photo: "/images/dates-products.png", tile: "0% 0%", tag: "برای کنار چای" },
  { id: "piarom", name: "خرمای پیارم", english: "PIAROM", origin: "حاجی‌آباد، هرمزگان", kind: "نیمه‌خشک", note: "کشیده و خوش‌طعم، با بافت نیمه‌خشک و طعمی شبیه کارامل.", price: 285000, photo: "/images/dates-products.png", tile: "100% 100%", tag: "طعم کاراملی" },
  { id: "medjool", name: "خرمای مجول", english: "MEDJOOL", origin: "جنوب ایران", kind: "نرم", note: "درشت و گوشتی، با شیرینی غنی؛ انتخابی برای لحظه‌های خاص.", price: 320000, photo: "/images/dates-products.png", tile: "0% 100%", tag: "درشت و گوشتی" },
  { id: "zahedi", name: "خرمای زاهدی", english: "ZAHEDI", origin: "دشتستان، بوشهر", kind: "خشک", note: "طلایی و خوش‌خوراک، با بافت خشک‌تر و شیرینی ملایم.", price: 95000, photo: "/images/dates-products.png", tile: "100% 0%", tag: "شیرینی ملایم" },
  { id: "rabbi", name: "خرمای ربی", english: "RABBI", origin: "سیستان و بلوچستان", kind: "نیمه‌خشک", note: "کشیده و خوش‌رنگ، با بافت نیمه‌خشک؛ یک میان‌وعدهٔ ساده و خوش‌طعم.", price: 125000, photo: "/images/dates-more.png", tile: "0% 0%", tag: "برای میان‌وعده" },
  { id: "khasoei", name: "خرمای خاصویی", english: "KHASOEI", origin: "جم، بوشهر", kind: "نرم", note: "ریز و شیرین، با بافتی لطیف؛ دانه‌های کوچک برای دورهمی‌های صمیمی.", price: 175000, photo: "/images/dates-more.png", tile: "100% 0%", tag: "ریز و دوست‌داشتنی" },
  { id: "kabkab", name: "خرمای کبکاب", english: "KABKAB", origin: "دشتستان، بوشهر", kind: "نرم", note: "نرم و گوشتی، با رنگ قهوه‌ای گرم؛ همراهی خوش‌طعم برای صبحانه.", price: 115000, photo: "/images/dates-more.png", tile: "0% 100%", tag: "همراه صبحانه" },
  { id: "sayer", name: "خرمای استعمران", english: "SAYER", origin: "خوزستان", kind: "نیمه‌خشک", note: "خوش‌خوراک و نیمه‌خشک؛ برای وقتی که یک خوراکی ساده کنار دستت می‌خواهی.", price: 105000, photo: "/images/dates-more.png", tile: "100% 100%", tag: "انتخاب هر روز" },
];

export type CartItem = { product: Product; weight: number; quantity: number };
export const number = (value: number) => value.toLocaleString("fa-IR");
export const priceFor = (product: Product, weight: number) => product.price * weight / 500;
export const normalize = (value: string) => value.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, "").trim();
