// @ts-nocheck
// ========================= YIELD & GENERATOR: SIFIRDAN ORTA SEVİYE =========================//

/*
🔹 Mülakat için kritik:
- Generator, büyük veri setlerinde veya sürekli veri üreten işlemlerde memory-friendly çözüm sunar.
- yield → fonksiyonu duraklatır, değer döndürür.
- next() → sıradaki değeri alır ve fonksiyonu devam ettirir.
- done → generator tamamlandığında true döner.
- for-of → generator’ı otomatik iterasyona sokar, her seferinde next() çağırır.
- Gerçek hayatta async generator + API stream kombinasyonu sık sorulur.
*/

// ===== 1️⃣ Basit Generator Örneği =====
function* basitGenerator() {
    console.log("Generator başladı");

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

// ===== 2️⃣ Gerçek Hayat Örneği =====
interface Siparis {
    id: string;
    urun: string;
    tamam: boolean;
}

const siparisler: Siparis[] = [
    { id: "s1", urun: "Laptop", tamam: false },
    { id: "s2", urun: "Mouse", tamam: true },
    { id: "s3", urun: "Klavye", tamam: false }
];

function* bitmemisSiparisler(siparisler: Siparis[]) {
    for (const sip of siparisler) {
        if (!sip.tamam) yield sip; // sadece tamamlanmamış siparişleri üret
    }
}

const aktifSiparisler = bitmemisSiparisler(siparisler);

for (const sip of aktifSiparisler) {
    console.log("Aktif Sipariş:", sip);
    // Çıktı:
    // { id: "s1", urun: "Laptop", tamam: false }
    // { id: "s3", urun: "Klavye", tamam: false }
}

// ===== 3️⃣ Kritik Mülakat Notları =====
/*
1️⃣ Generator, büyük veri listelerinde belleği optimize eder → lazy evaluation.
2️⃣ yield → değer döndürür + fonksiyonu duraklatır.
3️⃣ next() → bir sonraki yield’i alır.
4️⃣ done → generator tamamlandığında true döner.
5️⃣ for-of → otomatik olarak next() çağırır → pratik kullanım.
6️⃣ Async generator + for-await-of → API stream veya event stream yönetiminde önemli.
7️⃣ Mülakat soruları:
   - "Generator ve normal fonksiyon farkı?" → lazy evaluation ve memory avantajı
   - "Yield ne işe yarar?" → duraklatma ve veri üretme
   - "for-of ile next() ilişkisi?" → for-of her seferinde next() çağırır
   - "Generator neden tercih edilir?" → büyük listelerde veya sürekli veri akışında performans ve kontrol sağlar
*/
