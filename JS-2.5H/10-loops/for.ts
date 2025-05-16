// @ts-nocheck
// ============================================== TYPESCRIPT FOR DÖNGÜSÜ: ORTA SEVIYE REHBER ==============================================//

// Bu rehber, TypeScript'te for döngüsünü (klasik for, for...of, for...in) sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi olacak şekilde array'ler, objeler ve pratik senaryolar içerir.
// Her bölüm, mantığı ve arka planı açıklayarak korkunu yener ve döngülerle özgürce çalışmanı sağlar.

// ========== BÖLÜM 1: KLASIK FOR DÖNGÜSÜ ==========
// Klasik for döngüsü, bir sayaç (genellikle 'i') kullanarak belirli bir koşula kadar çalışır.
// Sözdizimi: for (başlatma; koşul; artış) { ... }
// Arka Plan: En esnek döngüdür, çünkü sayaç ve koşulu tamamen sen kontrol edersin.

// Basit Örnek: 1'den 5'e kadar sayıları yazdırma
for (let i: number = 1; i <= 5; i++) {
    console.log(`Sayı: ${i}`);
}
// Çıktı: Sayı: 1, Sayı: 2, Sayı: 3, Sayı: 4, Sayı: 5

// Array ile Kullanım: Kullanıcı verilerini işleme (Gerçek Hayat Senaryosu)
// Orta seviye bir geliştirici, array'lerle döngüleri sık kullanır.
interface Kullanici {
    id: string;
    ad: string;
    puan: number;
}

const kullanicilar: Kullanici[] = [
    { id: "u1", ad: "Ali", puan: 85 },
    { id: "u2", ad: "Ayşe", puan: 90 },
    { id: "u3", ad: "Mehmet", puan: 75 }
];

// Örnek 1: Kullanıcıların puanlarını artırma
for (let i: number = 0; i < kullanicilar.length; i++) {
    kullanicilar[i].puan += 5; // Herkese 5 puan ekle
}
console.log("Güncel puanlar:", kullanicilar);
// Çıktı: [{ id: "u1", ad: "Ali", puan: 90 }, { id: "u2", ad: "Ayşe", puan: 95 }, { id: "u3", ad: "Mehmet", puan: 80 }]

// Örnek 2: Sadece puanı 80'in altında olanları bulma
const dusukPuanlilar: Kullanici[] = [];
for (let i: number = 0; i < kullanicilar.length; i++) {
    if (kullanicilar[i].puan < 80) {
        dusukPuanlilar.push(kullanicilar[i]);
    }
}
console.log("Düşük puanlılar:", dusukPuanlilar);
// Çıktı: [] (Şu an kimse 80'in altında değil)

// Örnek 3: Ters yönde döngü (Gerçek Hayat: Logları tersten işleme)
for (let i: number = kullanicilar.length - 1; i >= 0; i--) {
    console.log(`Kullanıcı ${kullanicilar[i].ad} işlendi`);
}
// Çıktı: Kullanıcı Mehmet işlendi, Kullanıcı Ayşe işlendi, Kullanıcı Ali işlendi

// 📌 Neden Önemli? Klasik for, array indeksleriyle çalışmak ve karmaşık mantıklar kurmak için idealdir.
// 📌 Arka Plan: Sayaç (i) ile döngüyü tam kontrol edersin. i++ yerine i += 2 gibi esnek artışlar da kullanabilirsin.
// 📌 Mülakat İpucu: Klasik for'un esnekliğini vurgula; örneğin, "İndeks gerektiğinde veya özel artışlar için klasik for kullanıyorum."

// ========== BÖLÜM 2: FOR...OF DÖNGÜSÜ ==========
// for...of, bir iterable (örn. array, string) üzerindeki elemanlara doğrudan erişir.
// Sözdizimi: for (const eleman of iterable) { ... }
// Arka Plan: Indekslere gerek kalmadan elemanları sırayla işler, daha okunabilir.

const sayilar: number[] = [10, 20, 30, 40];

// Örnek 1: Array elemanlarını yazdırma
for (const sayi of sayilar) {
    console.log(`Sayı: ${sayi}`);
}
// Çıktı: Sayı: 10, Sayı: 20, Sayı: 30, Sayı: 40

// Gerçek Hayat Senaryosu: Sipariş toplamlarını hesaplama
interface Siparis {
    id: string;
    tutar: number;
}

const siparisler: Siparis[] = [
    { id: "s1", tutar: 100 },
    { id: "s2", tutar: 200 },
    { id: "s3", tutar: 150 }
];

// Örnek 2: Toplam tutarı hesaplama
let toplamTutar: number = 0;
for (const siparis of siparisler) {
    toplamTutar += siparis.tutar;
}
console.log("Toplam tutar:", toplamTutar); // 450

// Örnek 3: String üzerinde for...of (Veri İşleme: Metin analizi)
const metin: string = "TypeScript";
for (const harf of metin) {
    console.log(`Harf: ${harf}`);
}
// Çıktı: T, y, p, e, S, c, r, i, p, t

// Örnek 4: Filtrelenmiş veri oluşturma
const buyukSiparisler: Siparis[] = [];
for (const siparis of siparisler) {
    if (siparis.tutar > 150) {
        buyukSiparisler.push(siparis);
    }
}
console.log("Büyük siparişler:", buyukSiparisler);
// Çıktı: [{ id: "s2", tutar: 200 }]

// 📌 Neden Önemli? for...of, array veya string gibi iterable'larla çalışırken temiz ve hızlı kod yazmanı sağlar.
// 📌 Arka Plan: Indeksle uğraşmadan elemanlara odaklanırsın. Map, Set gibi yapılarla da çalışır.
// 📌 Mülakat İpucu: for...of'un okunabilirliğini vurgula; örneğin, "Elemanlara doğrudan erişmek için for...of tercih ederim."

// ========== BÖLÜM 3: FOR...IN DÖNGÜSÜ ==========
// for...in, bir objenin enumerable (sayılabilir) özelliklerinin anahtarlarını döner.
// Sözdizimi: for (const anahtar in obje) { ... }
// Arka Plan: Genellikle objelerle çalışır, ama array'lerde de kullanılabilir (indeks döner).

interface Ayarlar {
    [key: string]: string | boolean;
}

const ayarlar: Ayarlar = {
    tema: "koyu",
    bildirim: true,
    dil: "tr"
};

// Örnek 1: Obje özelliklerini yazdırma
for (const anahtar in ayarlar) {
    console.log(`Anahtar: ${anahtar}, Değer: ${ayarlar[anahtar]}`);
}
// Çıktı: Anahtar: tema, Değer: koyu
//        Anahtar: bildirim, Değer: true
//        Anahtar: dil, Değer: tr

// Gerçek Hayat Senaryosu: Ayarları doğrulama
const hataliAyarlar: string[] = [];
for (const anahtar in ayarlar) {
    if (ayarlar[anahtar] === undefined || ayarlar[anahtar] === null) {
        hataliAyarlar.push(anahtar);
    }
}
console.log("Hatalı ayarlar:", hataliAyarlar); // []

// Örnek 2: Array ile for...in (Dikkatli Kullan!)
const array: number[] = [5, 10, 15];
for (const indeks in array) {
    console.log(`Indeks: ${indeks}, Değer: ${array[indeks]}`);
}
// Çıktı: Indeks: 0, Değer: 5
//        Indeks: 1, Değer: 10
//        Indeks: 2, Değer: 15

// 📌 Neden Önemli? for...in, obje özelliklerini işlemek için kullanışlıdır, ama array'lerde dikkatli ol (for...of daha uygun).
// 📌 Arka Plan: Objenin anahtarlarını döner, prototip zincirindeki özellikleri de alabilir (nadiren sorun olur).
// 📌 Mülakat İpucu: for...in'in objeler için ideal olduğunu, array'lerde for...of'u tercih ettiğini belirt.

// ========== BÖLÜM 4: GERÇEK HAYAT UYGULAMASI: VERİ İŞLEME SİSTEMİ ==========
// Orta seviye bir TS geliştiricisi, döngüleri veri işleme, filtreleme ve dönüştürme için kullanır.

interface Proje {
    id: string;
    ad: string;
    tamamlandi: boolean;
    oncelik: number;
}

const projeler: Proje[] = [
    { id: "p1", ad: "Web Sitesi", tamamlandi: false, oncelik: 3 },
    { id: "p2", ad: "Mobil App", tamamlandi: true, oncelik: 1 },
    { id: "p3", ad: "API Geliştirme", tamamlandi: false, oncelik: 2 }
];

// Örnek 1: Klasik for - Önemli projeleri sıralama
const onemliProjeler: Proje[] = [];
for (let i: number = 0; i < projeler.length; i++) {
    if (projeler[i].oncelik <= 2 && !projeler[i].tamamlandi) {
        onemliProjeler.push(projeler[i]);
    }
}
console.log("Önemli projeler:", onemliProjeler);
// Çıktı: [{ id: "p3", ad: "API Geliştirme", tamamlandi: false, oncelik: 2 }]

// Örnek 2: for...of - Proje özetleri oluşturma
const projeOzetleri: string[] = [];
for (const proje of projeler) {
    const durum: string = proje.tamamlandi ? "Tamamlandı" : "Devam Ediyor";
    projeOzetleri.push(`${proje.ad}: Öncelik ${proje.oncelik}, ${durum}`);
}
console.log("Proje özetleri:", projeOzetleri);
// Çıktı: ["Web Sitesi: Öncelik 3, Devam Ediyor", "Mobil App: Öncelik 1, Tamamlandı", "API Geliştirme: Öncelik 2, Devam Ediyor"]

// Örnek 3: for...in - Proje özelliklerini toplama
const ozellikSayaci: { [key: string]: number } = {};
for (const proje in projeler) {
    for (const ozellik in projeler[proje]) {
        ozellikSayaci[ozellik] = (ozellikSayaci[ozellik] || 0) + 1;
    }
}
console.log("Özellik sayıları:", ozellikSayaci);
// Çıktı: { id: 3, ad: 3, tamamlandi: 3, oncelik: 3 }

// 📌 Neden Önemli? Bu örnek, döngülerin veri işleme, filtreleme ve analiz gibi gerçek dünya görevlerinde nasıl kullanıldığını gösterir.
// 📌 Mülakat İpucu: Döngülerle veri işleme örneği ver; örneğin, "Bir projede, array’deki verileri filtrelemek için for...of kullandım."

// ========== NOTLAR VE MÜLAKAT İPUÇLARI ==========
// ÖĞRENİLEN KAVRAMLAR
// --------------------
// 1. **Klasik for**: Indeksle çalışır, esnektir, karmaşık mantıklar için idealdir.
// 2. **for...of**: Iterable’larla (array, string) çalışır, okunabilir ve hızlıdır.
// 3. **for...in**: Obje anahtarlarını döner, array’lerde dikkatli kullanılmalı.
// 4. **Gerçek Hayat Kullanımı**: Döngüler, veri filtreleme, dönüştürme ve analizde sık kullanılır.

// YAYGIN MÜLAKAT SORULARI
// -----------------------
// - Klasik for ile for...of arasındaki fark nedir? (Klasik for indeksle çalışır, for...of elemanlara doğrudan erişir.)
// - for...in neden array’lerde tercih edilmez? (Indeksler string döner, prototip özellikleri alınabilir.)
// - Döngü performansını nasıl optimize edersiniz? (Gereksiz işlemlerden kaçının, erken çıkış için break kullanın.)
// - Gerçek bir projede döngü nasıl kullandınız? (Veri filtreleme veya dönüştürme örneği ver.)

// YAYGIN HATALAR VE ÇÖZÜMLER
// --------------------------
// - **Hata**: Klasik for’da yanlış sınır (i <= array.length yerine i < array.length).
//   **Çözüm**: i < array.length kullan, son indeksi aşmamak için.
// - **Hata**: for...in’i array’lerde kullanmak.
//   **Çözüm**: Array’ler için for...of veya klasik for tercih et.
// - **Hata**: Döngüde gereksiz işlem yapmak (örn. her döngüde uzun hesaplama).
//   **Çözüm**: Sabit hesaplamaları döngü dışına taşı.