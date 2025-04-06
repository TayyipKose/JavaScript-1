// @ts-nocheck

// 🎯 Bu dosya, JavaScript array metodlarını anlamak ve middle seviye bir geliştirici gibi kullanmak için bir rehberdir.
// Her metod için: 1) Basit açıklama, 2) Temel örnek, 3) Daha ileri seviye bir kullanım örneği bulacaksın.

// 1️⃣ filter() - Bir koşula uyan elemanları yeni bir array olarak döndürür
// Temel Örnek: Çift sayıları filtreleme
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Çift sayılar:", evenNumbers); // Çıktı: [2, 4, 6, 8]

// İleri Seviye: Bir kullanıcı listesinde yaşı 25’ten büyük olanları bulma
const users = [
    {id: 1, name: "Ali", age: 25},
    {id: 2, name: "Ayşe", age: 30},
    {id: 3, name: "Mehmet", age: 35}
];
const newuserList = users.filter(user => user.age > 25);
console.log("Yaşı 25’ten büyük olanlar:", newuserList);
// Çıktı: [{ id: 2, name: "Ayşe", age: 30 }, { id: 3, name: "Mehmet", age: 35 }]

// 2️⃣ map() - Her elemanı dönüştürüp yeni bir array döndürür
// Temel Örnek: Sayıları iki katına çıkarma
const doubled = numbers.map(num => num * 2);
console.log("İki katına çıkan sayılar:", doubled); // Çıktı: [2, 4, 6, 8, 10, 12, 14, 16, 18]

// İleri Seviye: Kullanıcı isimlerini büyük harfe çevirme
const upperCaseNames = users.map(user => user.name.toUpperCase());
console.log("Büyük harfli isimler:", upperCaseNames); // Çıktı: ["ALI", "AYŞE", "MEHMET"]

// 3️⃣ reduce() - Array’i tek bir değere indirger (toplama, çarpma gibi)
// Temel Örnek: Sayıların toplamını bulma
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Toplam:", sum); // Çıktı: 45

// İleri Seviye: Kullanıcı yaşlarının ortalamasını hesaplama
const averageAge = users.reduce((acc, user) => acc + user.age, 0) / users.length;
console.log("Yaş ortalaması:", averageAge); // Çıktı: 30

// 4️⃣ flat() - İç içe array’leri düzleştirir
// Temel Örnek: Basit bir iç içe array’i düzleştirme
const nestedArray = [1, [2, 3], [4, 5], 6];
const flattened = nestedArray.flat();
console.log("Düzleştirilmiş array:", flattened); // Çıktı: [1, 2, 3, 4, 5, 6]

// İleri Seviye: Daha derin bir array’i düzleştirme (flat(2) ile 2 seviye)
const deepNested = [1, [2, [3, 4]], [5, [6]]];
const deepFlattened = deepNested.flat(2);
console.log("Derin düzleştirme:", deepFlattened); // Çıktı: [1, 2, 3, 4, 5, 6]

// 5️⃣ flatMap() - map() yapar, sonra flat() uygular
// Temel Örnek: Her sayıyı kendisi ve iki katıyla eşleştirme
const nestedNumbers = [1, 2, 3];
const mappedAndFlattened = nestedNumbers.flatMap(num => [num, num * 2]);
console.log("Map ve flat birleşimi:", mappedAndFlattened); // Çıktı: [1, 2, 2, 4, 3, 6]

// İleri Seviye: Kullanıcıların isim ve yaşlarını ayrı ayrı listeleme
const userDetails = users.flatMap(user => [user.name, user.age]);
console.log("Kullanıcı detayları:", userDetails); // Çıktı: ["Ali", 25, "Ayşe", 30, "Mehmet", 35]

// 6️⃣ concat() - Array’leri birleştirir
// Temel Örnek: İki array’i birleştirme
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenated = array1.concat(array2);
console.log("Birleştirilmiş array:", concatenated); // Çıktı: [1, 2, 3, 4, 5, 6]

// İleri Seviye: Birden fazla array’i birleştirme
const array3 = [7, 8, 9];
const allArrays = array1.concat(array2, array3, [10]);
console.log("Çoklu birleştirme:", allArrays); // Çıktı: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 7️⃣ find() - Koşula uyan ilk elemanı bulur
// Temel Örnek: Yaşı 30’dan büyük ilk kullanıcıyı bulma
const userOver30 = users.find(user => user.age > 30);
console.log("30’dan büyük ilk kullanıcı:", userOver30);
// Çıktı: { id: 3, name: "Mehmet", age: 35 }

// İleri Seviye: Belirli bir isme sahip kullanıcıyı bulma
const findAyse = users.find(user => user.name === "Ayşe");
console.log("Ayşe’yi bul:", findAyse); // Çıktı: { id: 2, name: "Ayşe", age: 30 }

// 8️⃣ findIndex() - Koşula uyan ilk elemanın indeksini bulur
// Temel Örnek: Ayşe’nin indeksini bulma
const ayseIndex = users.findIndex(user => user.name === "Ayşe");
console.log("Ayşe’nin indeksi:", ayseIndex); // Çıktı: 1

// İleri Seviye: Yaşı 25 olan ilk kullanıcının indeksini bulma
const age25Index = users.findIndex(user => user.age === 25);
console.log("Yaşı 25 olanın indeksi:", age25Index); // Çıktı: 0

// 9️⃣ some() - En az bir eleman koşula uyuyorsa true döner
// Temel Örnek: Yaşı 30’dan küçük kullanıcı var mı?
const hasYoung = users.some(user => user.age < 30);
console.log("Genç kullanıcı var mı?:", hasYoung); // Çıktı: true

// İleri Seviye: İsimlerden biri “M” ile başlıyor mu?
const startsWithM = users.some(user => user.name.startsWith("M"));
console.log("M ile başlayan var mı?:", startsWithM); // Çıktı: true

// 🔟 every() - Tüm elemanlar koşula uyuyorsa true döner
// Temel Örnek: Hepsi yetişkin mi?
const allAdults = users.every(user => user.age >= 18);
console.log("Hepsi yetişkin mi?:", allAdults); // Çıktı: true

// İleri Seviye: Hepsinin ismi 3 harften uzun mu?
const allLongNames = users.every(user => user.name.length > 3);
console.log("Hepsinin ismi uzun mu?:", allLongNames); // Çıktı: false (Ali 3 harf)


//--------------------------------------------------------------Örnekler--------------------------------------------------------------//
// ÖRNEK 1: Gerçek Hayatta Kombinasyon Örneği
// Senaryo: Bir e-ticaret sitesinde ürünleri filtreleyip, fiyatlarını güncelleyip, toplam tutarı hesaplayalım
const products = [
    {name: "Laptop", price: 1000, category: "Elektronik"},
    {name: "Mouse", price: 20, category: "Elektronik"},
    {name: "T-shirt", price: 15, category: "Giyim"},
    {name: "Klavye", price: 50, category: "Elektronik"}
];

// 1. Elektronik kategorisindeki ürünleri filtrele (filter)
// 2. Fiyatlarını %10 artır (map)
// 3. Toplam fiyatı hesapla (reduce)
const updatedElectronicsTotal = products
    .filter(product => product.category === "Elektronik")
    .map(product => ({
        ...product,
        price: product.price * 1.10 // %10 zam
    }))
    .reduce((total, product) => total + product.price, 0);

console.log("Zamlı elektronik ürünlerin toplam fiyatı:", updatedElectronicsTotal);
// Çıktı: 1170 (1000 * 1.1 + 20 * 1.1 + 50 * 1.1)

// // ÖRNEK 2: Ekstra Öğretici Örnek: 4 Metod Kombinasyonu
// Senaryo: Kullanıcıların isimlerini büyük harfe çevir, yaşlarını iki katına çıkar,
// 60’tan büyük olanları filtrele ve isimlerini birleştir
const complexResult = users
    .map(user => ({name: user.name.toUpperCase(), age: user.age * 2}))
    .filter(user => user.age > 60)
    .reduce((acc, user) => acc + user.name + ", ", "") // reduce, kullanıcı isimlerini birleştirip aralarına ", " ekleyerek tek bir string haline getiriyor
    .slice(0, -2); // Son virgül ve boşluğu kaldır

console.log("60’tan büyük yaşlı isimler:", complexResult);
// Çıktı: "AYŞE, MEHMET" (30*2=60 ve 35*2=70)

//=>// ÖRNEK 3: Senaryo Sorusu ve Çözümü
/*Senaryo
Array 1: Bir e-ticaret sitesindeki ürünler (ürün adı, fiyat, kategori, stok durumu).
Array 2: Kullanıcıların sepetindeki ürünler (ürün adı, miktar, kullanıcı ID’si).
Amaç:
    * Stokta olan ürünleri filtrele.
    * Sepetteki ürünleri kullanıcı ID’sine göre filtrele (örneğin sadece ID 1 olanlar).
    * İki array’i birleştir, fiyatları güncelle (örneğin %15 indirim), toplam tutarı hesapla ve sonuçları formatla.*/


// 🎯 Ekstrem Örnek: İki farklı array’i filtreleyip birleştirme ve işleme
// İki array’den veri çekip, middle seviye bir geliştirici gibi metodları kombinleyerek sonuç üretelim.



// 1. Ürünler array’i (E-ticaret stok listesi)
const products = [
    {name: "Laptop", price: 1000, category: "Elektronik", inStock: true},
    {name: "Mouse", price: 20, category: "Elektronik", inStock: false},
    {name: "T-shirt", price: 15, category: "Giyim", inStock: true},
    {name: "Klavye", price: 50, category: "Elektronik", inStock: true}
];

// 2. Sepet array’i (Kullanıcıların sepetindeki ürünler)
const cart = [
    {productName: "Laptop", quantity: 1, userId: 1},
    {productName: "Mouse", quantity: 2, userId: 2},
    {productName: "T-shirt", quantity: 3, userId: 1},
    {productName: "Klavye", quantity: 1, userId: 1}
];

// 🎯 Ekstrem Kombinasyon:
// 1. Stokta olan ürünleri filtrele (filter)
// 2. Sepetteki ürünleri sadece userId=1 için filtrele (filter)
// 3. İki array’i eşleştirip birleştir (flatMap)
// 4. Fiyatlara %15 indirim uygula (map)
// 5. Toplam tutarı hesapla (reduce)
// 6. Ürün isimlerini birleştir (reduce + slice)

const result = products
    .filter(product => product.inStock) // Stokta olan ürünleri al
    .flatMap(product =>
        cart
            .filter(item => item.userId === 1 && item.productName === product.name) // userId=1 ve ürün eşleşenleri al
            .map(item => ({
                name: product.name,
                originalPrice: product.price,
                discountedPrice: product.price * 0.85, // %15 indirim
                quantity: item.quantity,
                total: product.price * 0.85 * item.quantity // Toplam tutar
            }))
    )
    .reduce(
        (acc, item) => ({
            items: acc.items + `${item.name} (${item.quantity}x), `,
            totalCost: acc.totalCost + item.total
        }),
        {items: "", totalCost: 0} // Başlangıç: obje ile iki veri biriktiriyoruz
    );

// Sonuç string’inden son virgül ve boşluğu kaldır
const finalResult = {
    items: result.items.slice(0, -2),
    totalCost: result.totalCost.toFixed(2) // 2 ondalık basamak
};

console.log("Sonuç:", finalResult);
// Çıktı: {
//   items: "Laptop (1x), T-shirt (3x), Klavye (1x)",
//   totalCost: "892.50" // (1000 * 0.85 * 1) + (15 * 0.85 * 3) + (50 * 0.85 * 1)
// }

// 🎓 Adım Adım Ne Oldu?
// 1. filter: Stokta olmayan "Mouse" elendi.
// 2. flatMap: Sepetteki userId=1 olan ürünleri ürünlerle eşleştirdi, iç içe yapıyı düzleştirdi.
// 3. map: Her eşleşen ürüne indirim uyguladı ve yeni obje oluşturdu.
// 4. reduce: Hem isimleri birleştirdi hem toplam tutarı hesapladı.
// 5. slice: Son ", " kısmını temizledi.




/* Metot Özetleri

* filter(): Array’deki elemanları bir koşula göre süzer ve uyanları yeni bir array olarak döndürür.
(Örnek: users.filter(user => user.age > 25) yaşı 25’ten büyük kullanıcıları alır.)

* map(): Array’in her elemanını dönüştürür ve yeni bir array olarak döndürür.
(Örnek: numbers.map(num => num * 2) her sayıyı iki katına çıkarır.)

* reduce(): Array’in tüm elemanlarını birleştirip tek bir değere indirger.
(Örnek: numbers.reduce((acc, curr) => acc + curr, 0) sayıları toplar.)

* flat(): İç içe array’leri düzleştirip tek seviye bir array haline getirir.
(Örnek: [1, [2, 3]].flat() sonucu [1, 2, 3] olur.)

* flatMap(): Her elemanı dönüştürüp (map) ardından iç içe yapıyı düzleştirir (flat).
(Örnek: nestedNumbers.flatMap(num => [num, num * 2]) her sayıyı çiftleriyle listeler.)

*concat(): Birden fazla array’i birleştirip tek bir array döndürür.
(Örnek: array1.concat(array2) iki array’i birleştirir.)

*find(): Koşula uyan ilk elemanı bulur ve döndürür.
(Örnek: users.find(user => user.age > 30) yaşı 30’dan büyük ilk kullanıcıyı bulur.)

*findIndex(): Koşula uyan ilk elemanın indeksini bulur ve döndürür.
(Örnek: users.findIndex(user => user.name === "Ayşe") Ayşe’nin indeksini verir.)

*some(): En az bir eleman koşula uyuyorsa true döndürür.
(Örnek: users.some(user => user.age < 30) genç kullanıcı var mı diye kontrol eder.)

*every(): Tüm elemanlar koşula uyuyorsa true döndürür.
(Örnek: users.every(user => user.age >= 18) herkes yetişkin mi diye bakar.)

*slice(): Array veya string’den belirli bir bölümü kesip alır (array’i değiştirmez).
(Örnek: "AYŞE, MEHMET, ".slice(0, -2) son virgül ve boşluğu kaldırır.)

*/