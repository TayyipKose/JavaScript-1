// @ts-nocheck
// ========================= YIELD & GENERATOR ÖĞRETİCİ BLOK =========================//

// 1️⃣ YIELD NEDİR?
// yield, bir generator fonksiyonunda veri üretmek ve fonksiyonu geçici olarak durdurmak için kullanılır.
// Fonksiyon duraklar ve bir sonraki next() çağrıldığında kaldığı yerden devam eder.

// 2️⃣ GENERATOR NEDİR?
// Generator, sırayla veri üretebilen bir fonksiyondur. Başına * koyulur: function*
// next() çağrısıyla sıradaki değeri üretir.

function* basitGenerator() {   // * fonksiyonu generator yapar
    console.log("Generator başladı");

    // yield ile veri veriyoruz, fonksiyon duraklıyor
    yield "Adım 1: Merhaba";
    yield "Adım 2: Dünya";
    yield "Adım 3: Bitiyor";

    console.log("Generator bitti");
}

const gen = basitGenerator();

console.log(gen.next()); // { value: "Adım 1: Merhaba", done: false }
console.log(gen.next()); // { value: "Adım 2: Dünya", done: false }
console.log(gen.next()); // { value: "Adım 3: Bitiyor", done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Mantık:
// 1️⃣ yield: Fonksiyonu duraklatır ve değer döndürür
// 2️⃣ next(): Generator’dan sıradaki değeri alır ve fonksiyonu devam ettirir
// 3️⃣ done = true: Generator tamamlandı, artık veri yok
// 4️⃣ Bellek dostu: Büyük listelerde veya API verilerinde kullanışlı

// -----------------------------------------------------------

// 3️⃣ YIELD GERÇEK HAYAT ÖRNEĞİ
interface Siparis {
    id: string;
    urun: string;
    tamam: boolean
}

const siparisler: Siparis[] = [
    {id: "s1", urun: "Laptop", tamam: false},
    {id: "s2", urun: "Mouse", tamam: true},
    {id: "s3", urun: "Klavye", tamam: false}
];

// Generator ile sadece bitmemiş siparişleri sırayla almak
function* bitmemisSiparisler(siparisler: Siparis[]) {
    for (const sip of siparisler) {
        if (!sip.tamam) yield sip;  // tamamlanmamış siparişi üret
    }
}

const aktifSiparisler = bitmemisSiparisler(siparisler);

for (const sip of aktifSiparisler) {
    console.log("Aktif Sipariş:", sip);
    // Çıktı:
    // { id: "s1", urun: "Laptop", tamam: false }
    // { id: "s3", urun: "Klavye", tamam: false }
}

// Mantık:
// - Generator her next() çağrıldığında bir sonraki bitmemiş siparişi verir
// - yield sadece bir değer döndürür ve fonksiyonu duraklatır
// - for-of generator’ı otomatik next() çağırır
// - Bellek dostu ve kontrollü veri işleme sağlar

// -----------------------------------------------------------

// ✅ Özet:
// - yield = veri üret + durakla
// - function* = Generator fonksiyonu, function* ile tanımlanır ve yield ile adım adım değer üretir; next() ile sıradaki değere geçer.
// - next() = sıradaki yield değerini al
// - done = true ise generator bitti
// - for-of = generator’dan kolayca değer al
