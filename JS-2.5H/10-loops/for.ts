// @ts-nocheck
// ==================== TYPESCRIPT FOR DÖNGÜSÜ REHBERİ ====================

// TypeScript'te for döngüleri üç temel şekilde kullanılır:
// 1. Klasik for: Sayaç kullanılır, kontrol tamamen sende.
// 2. for...of: Array ve iterable elemanlarına direkt erişim.
// 3. for...in: Obje anahtarlarını dolaşmak için.

// ------------------------------------------------------
// 1. KLASİK FOR DÖNGÜSÜ
// Belirli sayıda veya koşula bağlı tekrarlamalar için.
// Sayaç kullanılır, örneğin 1'den 5'e kadar:

for (let i = 1; i <= 5; i++) {
  console.log(`Sayı: ${i}`);
}

// Array ile kullanım: Kullanıcı puanlarını 5 artırmak

const kullanicilar: any[] = [
  { id: "u1", ad: "Ali", puan: 85 },
  { id: "u2", ad: "Ayşe", puan: 90 },
  { id: "u3", ad: "Mehmet", puan: 75 }
];

for (let i = 0; i < kullanicilar.length; i++) {
  kullanicilar[i].puan += 5;
}
console.log("Güncel puanlar:", kullanicilar);

// ------------------------------------------------------
// 2. FOR...OF DÖNGÜSÜ
// Array veya iterable içindeki elemanlara direkt erişmek için.
// İndeksle uğraşmana gerek yok, kod daha temiz:

const sayilar = [10, 20, 30, 40];
for (const sayi of sayilar) {
  console.log(`Sayı: ${sayi}`);
}

// Gerçek hayat: Siparişlerin toplamını bulma

const siparisler: any[] = [
  { id: "s1", tutar: 100 },
  { id: "s2", tutar: 200 },
  { id: "s3", tutar: 150 }
];

let toplam = 0;
for (const siparis of siparisler) {
  toplam += siparis.tutar;
}
console.log("Toplam tutar:", toplam);

// ------------------------------------------------------
// 3. FOR...IN DÖNGÜSÜ
// Objenin anahtarlarını dolaşmak için.
// Dizilerde kullanmak önerilmez, obje için uygun.

const ayarlar: any = {
  tema: "koyu",
  bildirim: true,
  dil: "tr"
};

for (const anahtar in ayarlar) {
  console.log(`${anahtar}: ${ayarlar[anahtar]}`);
}

// ------------------------------------------------------
// 4. GERÇEK HAYAT UYGULAMASI
// Projeler array'inde, tamamlanmamış ve önceliği yüksek olanları seç:

const projeler: any[] = [
  { id: "p1", ad: "Web Sitesi", tamamlandi: false, oncelik: 3 },
  { id: "p2", ad: "Mobil App", tamamlandi: true, oncelik: 1 },
  { id: "p3", ad: "API Geliştirme", tamamlandi: false, oncelik: 2 }
];

// Klasik for ile filtreleme:
const onemliProjeler = [];
for (let i = 0; i < projeler.length; i++) {
  if (!projeler[i].tamamlandi && projeler[i].oncelik <= 2) {
    onemliProjeler.push(projeler[i]);
  }
}
console.log("Önemli projeler:", onemliProjeler);

// for...of ile özet oluşturma:
const ozetler = [];
for (const proje of projeler) {
  const durum = proje.tamamlandi ? "Tamamlandı" : "Devam Ediyor";
  ozetler.push(`${proje.ad}: Öncelik ${proje.oncelik}, ${durum}`);
}
console.log("Proje özetleri:", ozetler);

// for...in ile obje özelliklerini sayma (dizi üzerinde for...in önerilmez)
const ozellikSayaci: any = {};
for (const proje of projeler) {
  for (const ozellik in proje) {
    ozellikSayaci[ozellik] = (ozellikSayaci[ozellik] || 0) + 1;
  }
}
console.log("Özellik sayıları:", ozellikSayaci);



// ==================== İÇ İÇE FOR DÖNGÜSÜ ÖRNEĞİ ====================

// Diyelim ki elimizde birden fazla kullanıcının notları var.
// Her kullanıcının farklı derslerden aldığı puanlar var ve biz
// tüm puanları tek tek kontrol edip 50'nin altındakileri raporlayacağız.

const kullaniciListesi: any[] = [
  { ad: "Ali", notlar: [70, 85, 40] },
  { ad: "Ayşe", notlar: [90, 45, 80] },
  { ad: "Mehmet", notlar: [55, 65, 30] }
];

// Amaç: Her kullanıcının 50'nin altındaki notlarını tespit etmek

for (let i = 0; i < kullaniciListesi.length; i++) {
  const kullanici = kullaniciListesi[i];
  
  for (let j = 0; j < kullanici.notlar.length; j++) {
    const not = kullanici.notlar[j];
    
    if (not < 50) {
      console.log(`${kullanici.ad} kullanıcısının ${j + 1}. notu düşük: ${not}`);
    }
  }
}

/* Çıktı:
Ali kullanıcısının 3. notu düşük: 40
Ayşe kullanıcısının 2. notu düşük: 45
Mehmet kullanıcısının 3. notu düşük: 30
*/

// Açıklama:
// Dıştaki for, kullanıcıları geziyor.
// İçteki for, her kullanıcının notlarını tek tek kontrol ediyor.
// Böylece her kullanıcı için detaylı not analizi yapılabiliyor.

// İç içe döngüleri özellikle çok boyutlu verilerde ve matrislerde kullanırız.
// Mülakatlarda iç içe döngü sorulursa böyle gerçekçi bir senaryo anlatmak çok etkili olur.

// ------------------------------------------------------
// NOTLAR:
// - Dizilerde elemanlara erişmek için for...of tercih et.
// - Obje anahtarları için for...in kullan.
// - Klasik for en esnek, özellikle indeks veya ters dönmek gerekirse.
// - for...in dizide kullanma, prototip zincirindeki ekstra anahtarlar sorun yaratabilir.

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