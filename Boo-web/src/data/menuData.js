// =============================================
//  BOO Menu Data — بيانات المنيو
//  عدّل الأسعار والأسماء من هنا فقط.
//  image: اسم ملف الصورة داخل src/assets/menu  (أو null = بدون صورة)
// =============================================

// يجمع كل الصور من مجلد menu تلقائياً (Vite)
const imageFiles = import.meta.glob('../assets/menu/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

// getImage('guava.jpg') → رابط الصورة الجاهز، أو null إذا ما لقاها
export function getImage(fileName) {
  if (!fileName) return null
  return imageFiles[`../assets/menu/${fileName}`] ?? null
}

export const CURRENCY = 'SAR'

export const menuData = [
  // ───────────────────────── HOT COFFEE ─────────────────────────
  {
    id: 'hot-coffee',
    en: 'Hot Coffee',
    ar: 'المشروبات الساخنة',
    groups: [
      {
        en: 'Drip Coffee',
        ar: 'القهوة المقطرة',
        items: [
          { en: 'Ethiopian V60', ar: 'V60 إثيوبي', price: 19, image: 'atheobi v60.jpg' },
          { en: 'Yemeni V60', ar: 'V60 يمني', price: 19, image: 'yamen v60.jpg' },
          { en: 'Colombian V60', ar: 'V60 كولومبي', price: 19, image: 'colombi v60.jpg' },
          { en: 'Ugandan V60', ar: 'V60 أوغندي', price: 19, image: 'oghendi v60.jpg' },
          { en: 'Indonesian V60', ar: 'V60 إندونيسي', price: 19, image: 'Indonesie v60.jpg' },
          { en: 'Coffee of the Day', ar: 'قهوة اليوم', price: 10, image: null },
          { en: 'Siphon Coffee', ar: 'قهوة السايفون', price: 15, image: null },
          { en: 'Boo V60', ar: 'V60 بو', price: 22, image: null },
        ],
      },
      {
        en: 'Espresso Bar',
        ar: 'القهوة الساخنة',
        items: [
          { en: 'Espresso', ar: 'إسبريسو', price: 11, image: null },
          { en: 'Americano', ar: 'أمريكانو', price: 16, image: null },
          { en: 'Cappuccino', ar: 'كابتشينو', price: 16, image: null },
          { en: 'Spanish Latte', ar: 'سبانش لاتيه', price: 16, image: null },
          { en: 'Latte', ar: 'لاتيه', price: 16, image: null },
          { en: 'Cortado', ar: 'كورتادو', price: 14, image: null },
          { en: 'Macchiato', ar: 'ميكاتو', price: 12, image: null },
          { en: 'Mocha', ar: 'موكا', price: 16, image: null },
          { en: 'Turkish Coffee', ar: 'قهوة تركي', price: 15, image: null },
          { en: 'Saudi Coffee · Cup', ar: 'قهوة سعودي - كوب', price: 6, image: null },
          { en: 'Saudi Coffee · Dallah', ar: 'قهوة سعودي - دلة', price: 28, image: 'arabic coffee.jpg' },
        ],
      },
      {
        en: 'Hot Drinks',
        ar: 'مشروبات ساخنة',
        items: [
          { en: 'Hot Chocolate', ar: 'هوت شوكلت', price: 16, image: null },
          { en: 'Hot Lotus', ar: 'هوت لوتس', price: 19, image: null },
          { en: 'Hot Oreo', ar: 'هوت أوريو', price: 19, image: null },
          { en: 'Hot Pistachio', ar: 'هوت بستاشيو', price: 19, image: null },
          { en: 'Hot Cider', ar: 'هوت سايدر', price: 16, image: null },
          { en: 'Orange Cider', ar: 'أورنج سايدر', price: 16, image: null },
          { en: 'Tea · Paper Cup', ar: 'شاي كوب ورق', price: 5, image: null },
          { en: 'Tea · Glass Cup', ar: 'شاي كوب قزاز', price: 8, image: null },
          { en: 'Tea Pot', ar: 'براد شاي', price: 25, image: null },
          { en: 'Sahlab', ar: 'سحلب', price: 18, image: null },
          { en: 'Karak Tea', ar: 'شاي كرك', price: 8, image: null },
        ],
      },
    ],
  },

  // ───────────────────────── ICED DRINKS ─────────────────────────
  {
    id: 'iced-drinks',
    en: 'Iced Drinks',
    ar: 'المشروبات الباردة',
    groups: [
      {
        en: 'Iced Coffee',
        ar: 'القهوة الباردة',
        items: [
          { en: 'Iced Americano', ar: 'أمريكانو بارد', price: 16, image: 'ice amrecano.jpg' },
          { en: 'Iced Latte', ar: 'لاتيه بارد', price: 16, image: 'ice latte.jpg' },
          { en: 'Iced Mocha', ar: 'موكا بارد', price: 18, image: 'ice mocha.jpg' },
          { en: 'Iced Spanish Latte', ar: 'سبانش لاتيه بارد', price: 16, image: null },
          { en: 'Crunchy White Mocha', ar: 'كرنشي وايت موكا', price: 19, image: null },
          { en: 'Frappuccino', ar: 'فرابتشينو', price: 19, image: null },
          { en: 'Affogato', ar: 'أفوجادو', price: 15, image: null },
          { en: 'Iced Caramel Macchiato', ar: 'آيس كراميل ميكاتو', price: 19, image: null },
          { en: 'Freddo', ar: 'الفريدو', price: 11, image: null },
        ],
      },
      {
        en: 'Matcha',
        ar: 'الماتشا',
        items: [
          { en: 'Classic Matcha', ar: 'ماتشا كلاسيك', price: 16, image: 'matcha.jpg' },
          { en: 'Vanilla Matcha', ar: 'ماتشا فانيلا', price: 18, image: null },
          { en: 'Lavender Matcha', ar: 'ماتشا لافندر', price: 18, image: null },
          { en: 'Caramel Matcha', ar: 'ماتشا كراميل', price: 18, image: null },
          { en: 'White Mocha Matcha', ar: 'ماتشا وايت موكا', price: 18, image: null },
          { en: 'Royal Matcha', ar: 'رويال ماتشا', price: 19, image: null },
        ],
      },
      {
        en: 'Milkshakes',
        ar: 'الميلك شيك',
        items: [
          { en: 'Oreo Milkshake', ar: 'ميلك شيك أوريو', price: 21, image: null },
          { en: 'Crunchy Kinder', ar: 'كرنشي كندر', price: 21, image: null },
          { en: 'Pistachio Milkshake', ar: 'ميلك شيك بستاشيو', price: 21, image: null },
          { en: 'Coffee Milkshake', ar: 'ميلك شيك كوفي', price: 21, image: null },
        ],
      },
    ],
  },

  // ───────────────────────── REFRESHERS ─────────────────────────
  {
    id: 'refreshers',
    en: 'Refreshers',
    ar: 'المشروبات المنعشة',
    groups: [
      {
        en: 'Iced Tea & Refreshers',
        ar: 'المشروبات المنعشة',
        items: [
          { en: 'Passion Fruit Iced Tea', ar: 'آيس تي باشن فروت', price: 18, image: 'passion fruit.jpg' },
          { en: 'Peach Passion Iced Tea', ar: 'آيس تي خوخ وباشن', price: 18, image: 'peach n pf.jpg' },
          { en: 'Peach Iced Tea', ar: 'آيس تي خوخ', price: 18, image: 'pf.jpg' },
          { en: 'Karak Iced Tea', ar: 'آيس تي كرك', price: 16, image: null },
          { en: 'Hibiscus', ar: 'كركديه', price: 15, image: null },
          { en: 'Strawberry Lemonade', ar: 'ليمون فراولة', price: 15, image: null },
          { en: 'Pink Lemon Tea', ar: 'بينك ليمون تي', price: 19, image: null },
        ],
      },
      {
        en: 'Fresh Juices',
        ar: 'العصيرات الطبيعية',
        items: [
          { en: 'Strawberry', ar: 'فراولة', price: 19, image: 'strawberry j.jpg' },
          { en: 'Watermelon', ar: 'حبحب', price: 19, image: 'watermelon.jpg' },
          { en: 'Pineapple Orange', ar: 'أناناس برتقال', price: 19, image: 'pineapple.jpg' },
          { en: 'Guava', ar: 'جوافة', price: 19, image: 'guava.jpg' },
          { en: 'Mango', ar: 'مانجو', price: 19, image: null },
          { en: 'Cantaloupe & Milk', ar: 'شمام بالحليب', price: 19, image: null },
          { en: 'Lemon Mint', ar: 'ليمون نعناع', price: 19, image: null },
          { en: 'Cocktail', ar: 'كوكتيل', price: 21, image: null },
        ],
      },
      {
        en: 'Mojito',
        ar: 'الموهيتو',
        items: [
          { en: '7UP Flavored', ar: 'سفن نكهة', price: 18, image: null },
          { en: 'Mojito Mix', ar: 'موهيتو مكس', price: 19, image: null },
          { en: 'Boo Mojito', ar: 'موهيتو بو', price: 19, image: null },
          { en: 'Code Red Mojito', ar: 'موهيتو كودرد', price: 19, image: null },
          { en: 'Red Bull Flavored', ar: 'رد بول نكهة', price: 27, image: null },
          { en: 'Red Bull Classic', ar: 'رد بول سادة', price: 20, image: null },
          { en: 'Code Red · 7UP Plain', ar: 'كودرد - سفن سادة', price: 15, image: null },
        ],
      },
    ],
  },

  // ───────────────────────── SWEETS ─────────────────────────
  {
    id: 'sweets',
    en: 'Sweets',
    ar: 'الحلويات',
    groups: [
      {
        en: 'Desserts',
        ar: 'الحلويات',
        items: [
          { en: 'French Toast', ar: 'فرنش توست', price: 23, image: 'french toast.jpg' },
          { en: 'Choco Cheese', ar: 'شوكو تشيز', price: 19, image: 'choco cheese cake.jpg' },
          { en: 'Pudding', ar: 'بودنق', price: 25, image: 'strawberrypudding.jpg' },
          { en: 'Pecan Cake', ar: 'حلا البيكان', price: 21, image: 'pecan cake.jpg' },
          { en: 'Saj Cookies', ar: 'كوكيز صاج', price: 23, image: null },
          { en: 'Boo French Toast', ar: 'فرنش توست بو', price: 27, image: null },
          { en: 'Madrid Cheesecake', ar: 'تشيز كيك مدريد', price: 21, image: null },
          { en: 'Madrid Tiramisu Cheese', ar: 'تشيز مدريد تيراميسو', price: 21, image: null },
        ],
      },
      {
        en: 'Snacks',
        ar: 'مأكولات خفيفة',
        items: [{ en: 'French Fries', ar: 'بطاطس مقلية', price: 15, image: null }],
      },
    ],
  },

  // ───────────── المعسلات (مخفية من الموقع — غيّر hidden إلى false لإظهارها) ─────────────
  {
    id: 'shisha',
    en: 'Shisha',
    ar: 'المعسلات',
    hidden: true,
    groups: [
      {
        en: 'Shisha',
        ar: 'المعسلات',
        items: [
          { en: 'Double Apple (Fakher · Mix · Nakhla)', ar: 'تفاحتين (فاخر - مكس - نخلة)', price: 40, image: null },
          { en: 'Grape Berry', ar: 'عنب توت', price: 40, image: null },
          { en: 'Grape Mint', ar: 'عنب نعناع', price: 40, image: null },
          { en: 'Lemon Mint', ar: 'ليمون نعناع', price: 40, image: null },
          { en: 'Mastic', ar: 'مستكة', price: 40, image: null },
          { en: 'Blueberry', ar: 'بلوبيري', price: 40, image: null },
        ],
      },
    ],
  },
]
