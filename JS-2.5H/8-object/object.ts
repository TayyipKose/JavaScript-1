// @ts-nocheck
// ==============================================KONU-ANLATIMI=================================================//

// ========== TEMEL OBJE OLUŞTURMA ==========
// Literal syntax ile obje oluşturma
const product: any = {
    id: 1,
    name: 'Bilgisayar',
    price: 15000,
    stock: 10,

    // Metod tanımlama
    discount(percent) {
        this.price *= (1 - percent / 100);
        return `%${percent} indirim uygulandı. Yeni fiyat: ${this.price}₺`;
    }
};

// CRUD Operasyonları
// Create - Yeni özellik ekleme
product.category = 'Elektronik';

// Read - Değer okuma
console.log(product.name); // 'Bilgisayar'

// Update - Değer güncelleme
product.price = 16750;

// Delete - Özellik silme
delete product.stock;

// ========== SPREAD & REST OPERATÖRLERİ ==========

// Objeleri birleştirme (spread)
const updatedProduct = {
    ...product,               // Spread operatörü ile 'product' objesinin tüm özelliklerini 'updatedProduct' objesine alıyoruz
    warranty: '2 Yıl',        // Yeni bir özellik ekliyoruz: warranty
    price: 15549,             // 'price' özelliğini güncelliyoruz (mevcut özellik override ediliyor)
};

// Rest operatörü ile kalan özellikleri alma
const {id, ...productInfo} = updatedProduct;  // 'id' özelliğini alıyoruz, geri kalanları 'productInfo' objesinde topluyoruz
console.log(productInfo);  // 'productInfo' objesini yazdırıyoruz: {name: 'Bilgisayar', price: 15500, warranty: '2 Yıl'}


// ========== DESTRUCTURING ==========
// Objeden değer çıkarma
const {name: productName, price} = product;
console.log(productName, price); // 'Bilgisayar' 15500

// Nested objelerde destructuring:
// Destructuring, bir array ya da object içindeki verileri tek satırda değişkenlere ayırmanı sağlar.
const company = {
    name: 'Tech Corp',
    address: {
        city: 'İstanbul',
        district: 'Kadıköy'
    }
};
const {address: {city, district}} = company;
console.log(city); // 'İstanbul'

// ========== OBJE METOTLARI ==========
// Object.keys() - Nesnenin anahtarlarını dizi olarak verir.
const product = { id: 1, name: "Bilgisayar", price: 15000 };
console.log(Object.keys(product)); // ["id", "name", "price"]

// Object.values() - Nesnenin değerlerini dizi olarak döndürür.
console.log(Object.values(product)); // [1, "Bilgisayar", 15000]

// Object.entries() - Anahtar-değer çiftlerini dizi içinde dizi olarak verir.
console.log(Object.entries(product)); // [["id", 1], ["name", "Bilgisayar"], ["price", 15000]]

// Object.assign() - Nesneleri hedefe kopyalar, hedefi döndürür.
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
// target: kopyalanacak nesne, source: kopyalanan nesne. Aynı anahtar varsa son değer geçerli.

// Object.fromEntries() - Dizi içindeki anahtar-değer çiftlerinden nesne oluşturur.
const entries = [["a", 1], ["b", 2]];
console.log(Object.fromEntries(entries)); // { a: 1, b: 2 }

// Object.create() - Prototip ile nesne oluşturur.
const proto = { greet: () => "Merhaba" };
const obj = Object.create(proto);
console.log(obj.greet()); // "Merhaba"

// Object.defineProperty() - Özellik tanımlar ve kontrol eder.
const newObj = {};
Object.defineProperty(newObj, "key", {
    value: 42,
    writable: false // Değiştirilemez
});
newObj.key = 100; // Çalışmaz
console.log(newObj.key); // 42

// Object.hasOwnProperty() - Özelliğin nesneye ait olup olmadığını kontrol eder.
const checkObj = { a: 1 };
console.log(checkObj.hasOwnProperty("a")); // true
console.log(checkObj.hasOwnProperty("toString")); // false (prototipte)

// Object.is() - İki değerin tam eşitliğini kontrol eder.
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false

// Object.preventExtensions() - Yeni özellik eklenmesini engeller.
const lockedObj = { a: 1 };
Object.preventExtensions(lockedObj);
lockedObj.b = 2; // Eklenmez
lockedObj.a = 3; // Değişir
console.log(lockedObj); // { a: 3 }

// Object.getPrototypeOf() - Nesnenin prototipini döndürür.
const protoCheck = {};
console.log(Object.getPrototypeOf(protoCheck) === Object.prototype); // true

// ========== NESNE KİLİTLEME METOTLARI ==========
const config = {apiUrl: 'https://api.example.com'};

// Object.seal() - Yeni özellik eklenemez, mevcutlar değiştirilebilir
// 🌐 Frontend'de global config ayarları
const appConfig = {
    theme: "dark",
    language: "en"
};
Object.seal(appConfig);

// Mevcut olanı değiştirmek mümkün:
appConfig.theme = "light"; // ✔️

// Yeni özellik eklemek yasak:
appConfig.layout = "grid"; // ❌ YOK SAYILIR (strict moddaysan hata verir)

// Özellik silmek de yasak:
delete appConfig.language; // ❌ Çalışmaz

// Object.freeze() - Tamamen dondurma
// Bir butonun sabit stilleri
const buttonStyles = Object.freeze({
    color: "#fff",
    background: "#007bff",
    borderRadius: "5px"
});

// Değiştirmeye çalışalım
//buttonStyles.color = "#000";       // ❌ Değişmez
buttonStyles.shadow = "2px";       // ❌ Eklenmez
//delete buttonStyles.borderRadius;  // ❌ Silinmez

// ========== DİNAMİK ÖZELLİKLER ==========
// Computed property names
const dynamicKey = 'status_' + Date.now();
const order = {
    id: 5,
    [dynamicKey]: 'processing'
};
console.log(order); // {id:5, status_1623...: 'processing'}

// Dinamik özellik ekleme/silme
const propName = 'totalAmount';
order[propName] = 2500;
console.log(order.totalAmount); // 2500

// ========== DERİN NESNE MANİPÜLASYONU ==========
// Nested object update with spread
const user = {
    name: 'Ali',
    preferences: {
        theme: 'dark',
        notifications: true
    }
};

// Deep update
const updatedUser = {
    ...user,
    preferences: {
        ...user.preferences,
        theme: 'light'
    }
};

// ========== JSON İŞLEMLERİ ==========

// JavaScript objesini JSON string'ine çevirir
const productJSON = JSON.stringify(product);
console.log('JSON:', productJSON);
// Çıktı örneği: '{"name":"Kalem","price":10}'
// JSON.stringify() metodu, objenin metodlarını (fonksiyonlarını) dahil etmez.

// JSON string'ini tekrar bir JavaScript objesine çevirir
const parsedProduct = JSON.parse(productJSON);
console.log('Parsed:', parsedProduct);
// Çıktı örneği: { name: "Kalem", price: 10 }
// JSON.parse() metodu, string halindeki veriyi bir obje haline getirir.


// ==============================================ÖRNEKLER=================================================//

// ========== Örnek 1: PROTOKOL ve CLASS YAPISI ==========
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    applyDiscount(percent) {
        this.price *= (1 - percent / 100);
    }
}
const laptop = new Product('Dizüstü Bilgisayar', 20000);
laptop.applyDiscount(10);
console.log(laptop.price); // 18000



// ========== Örnek2: GERÇEK DÜNYA ÖRNEĞİ: SEPET YÖNETİMİ ==========
const cartSystem = {
    cart: [],
    products: {
        'P1': {name: 'Mouse', price: 250},
        'P2': {name: 'Klavye', price: 500}
    },

    addToCart(productId, quantity = 1) {
        if (!this.products[productId]) return 'Ürün bulunamadı';

        const item = {
            ...this.products[productId],
            quantity,
            total: this.products[productId].price * quantity
        };

        this.cart.push(item);
        return `Sepete eklendi: ${quantity}x ${item.name}`;
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
    },

    calculateTotal() {
        return this.cart.reduce((sum, item) => sum + item.total, 0);
    }
};

// Kullanım
cartSystem.addToCart('P1', 2);
cartSystem.addToCart('P2');
console.log('Toplam:', cartSystem.calculateTotal());
console.log('Sepet:', cartSystem.cart);





//Örnek3: Object ve Sipariş Sistemi
// 1️⃣ Menü Oluşturma (CREATE)
const cafeMenu = {
    kahve: 20,
    cay: 10,
    kek: 15,
    sandvic: 25
};
console.log("Menü:", cafeMenu);

// 2️⃣ Object Metodları (READ)
console.log("Ürünler:", Object.keys(cafeMenu));
console.log("Fiyatlar:", Object.values(cafeMenu));
console.log("Çiftler:", Object.entries(cafeMenu));

// 3️⃣ Spread & Rest Kullanımı
const {kek, cay, ...kalanlar} = cafeMenu;
console.log("Seçilen:", {kek, cay});
console.log("Kalanlar:", kalanlar);

// 4️⃣ Menü Kopyalama & Güncelleme (UPDATE)
const newMenu = {...cafeMenu, su: 5, kahve: 22};
console.log("Güncel Menü:", newMenu);

// 5️⃣ Ürün Silme (DELETE)
const silinmisMenu = {...cafeMenu};
delete silinmisMenu.sandvic;
console.log("Sandviçsiz Menü:", silinmisMenu);

// 6️⃣ JSON.stringify / parse
const str = JSON.stringify(cafeMenu);
const backToObj = JSON.parse(str);
console.log("JSON string:", str);
console.log("Geri obje:", backToObj);

// 7️⃣ Deep Copy
const nestedMenu = {icecekler: {kahve: 20}, yiyecekler: {kek: 15}};
const deepCopy = JSON.parse(JSON.stringify(nestedMenu));
deepCopy.icecekler.kahve = 30;
console.log("Orijinal:", nestedMenu);
console.log("Deep Copy:", deepCopy);

// 8️⃣ İndirimli Menü
const discountedMenu = Object.fromEntries(
    Object.entries(cafeMenu).map(([k, v]) => [k, v * 0.9])
);
console.log("İndirimli Menü:", discountedMenu);

// 9️⃣ Sipariş Sistemi
const cafeOrders = {
    musteri1: {items: {kahve: 2, kek: 1}, time: "10:00"},
    musteri2: {items: {cay: 3}, time: "10:05"}
};

// Siparişi formatla + fiyat hesapla
const formatOrder = (items) =>
    Object.entries(items).map(([k, v]) => `${k}: ${v} adet`).join(", ");
const calculateTotal = (items, menu) =>
    Object.entries(items).reduce((t, [k, v]) => t + (menu[k] || 0) * v, 0);

console.log("Müşteri 1 siparişi:", formatOrder(cafeOrders.musteri1.items));
console.log("Müşteri 1 toplam:", calculateTotal(cafeOrders.musteri1.items, cafeMenu));

// Yeni sipariş + tüm toplam
const allOrders = {
    ...cafeOrders,
    musteri3: {items: {sandvic: 1}, time: "10:10"}
};
const totalAll = Object.values(allOrders).reduce(
    (acc, o) => acc + calculateTotal(o.items, cafeMenu),
    0
);
console.log("Tüm Siparişler Toplamı:", totalAll);

// 🔟 Kitapçı Sistemi (Kısa Versiyon)
const bookCatalog = {
    kitap1: {title: "JS", price: 50, category: "Programlama", stock: 10},
    kitap2: {title: "Python", price: 40, category: "Programlama", stock: 5},
    kitap3: {title: "Tarih", price: 30, category: "Tarih", stock: 0},
    kitap4: {title: "Roman", price: 25, category: "Edebiyat", stock: 8}
};
const orders = {
    user1: {items: {kitap1: 2, kitap4: 1}},
    user2: {items: {kitap2: 1, kitap3: 1}}
};
const calculateBookTotal = (items, catalog) =>
    Object.entries(items).reduce((t, [id, qty]) => t + (catalog[id]?.price || 0) * qty, 0);
console.log("User1 toplam:", calculateBookTotal(orders.user1.items, bookCatalog));

// İndirim + kategori ayırma
const discountedCatalog = Object.fromEntries(
    Object.entries(bookCatalog).map(([id, b]) => [id, {...b, price: b.price * 0.8}])
);
const {kitap1, kitap2, ...digerdir} = discountedCatalog;
console.log("Programlama dışı kitap sayısı:", Object.keys(digerdir).length);
//digerdir → kitap1 ve kitap2 dışındaki kitaplar demek.
// Yani aslında: programlama dışı kitaplar.



