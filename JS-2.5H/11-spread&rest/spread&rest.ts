// ========================= TYPESCRIPT SPREAD VE REST: ORTA SEVİYE =========================

// ===== SPREAD OPERATÖRÜ =====
// Array veya objeyi elemanlarına ayırmak veya kopyalamak için kullanılır

// Array birleştirme
const takim1: string[] = ["Ali", "Ayşe"];
const takim2: string[] = ["Mehmet", "Zeynep"];
const tumTakim: string[] = [...takim1, ...takim2, "Yeni Üye"];
console.log(tumTakim); // ["Ali", "Ayşe", "Mehmet", "Zeynep", "Yeni Üye"]

// Obje birleştirme
interface Ayarlar { [key: string]: string | boolean }
const varsayilan: Ayarlar = { tema: "açık", bildirim: true };
const kullaniciAyarlari: Ayarlar = { tema: "koyu", dil: "tr" };
const birlesikAyarlar: Ayarlar = { ...varsayilan, ...kullaniciAyarlari };
console.log(birlesikAyarlar); // { tema: "koyu", bildirim: true, dil: "tr" }

// Array kopyalama
const orijinal: number[] = [1, 2, 3];
const kopya: number[] = [...orijinal];
kopya.push(4);
console.log(orijinal, kopya); // [1,2,3] [1,2,3,4]

// Koşullu spread
const line = { current_account_id: "123" };
const payload = {
    ...(line.current_account_id && { current_account_id: line.current_account_id }),
    name: "Proje"
};
console.log(payload); // { current_account_id: "123", name: "Proje" }


// ===== REST OPERATÖRÜ =====
// Rest, bir nesne veya array’de kalan tüm elemanları bir araya toplar.
// Kullanım alanlarına göre net bir mantığı var:

// 1) Fonksiyonlarda → değişken sayıda argümanı tek bir array’de toplar
function toplam(...sayilar: number[]): number {
    return sayilar.reduce((t, s) => t + s, 0);
}
console.log(toplam(1, 2, 3, 4)); // 10

// 2) Objelerde → belli alanları ayır, geri kalanı tek bir nesneye koy
const kullanici = { id: "u1", ad: "Ali", puan: 90 };
const { id, ...kalan } = kullanici;
console.log(id, kalan); // "u1" { ad: "Ali", puan: 90 }

// 3) Array’lerde → belli elemanları al, geri kalanını bir array’de tut
const notlar: number[] = [85, 90, 75, 95];
const [ilk, ...digerNotlar] = notlar;
console.log(ilk, digerNotlar); // 85 [90, 75, 95]

// Özet mantık:
// “Rest → kalanları topla”
// Fonksiyonlarda array, objelerde nesne, array’lerde array olarak.

// Film arayüzü
interface Film {
    id: string;
    baslik: string;
    fiyat: number;
    tur: string;
}

// Başlangıçta kullanıcıya ait kiralık filmler
const kiralananFilmler: Film[] = [
    { id: "f1", baslik: "Inception", fiyat: 20, tur: "Bilim Kurgu" },
    { id: "f2", baslik: "The Godfather", fiyat: 25, tur: "Dram" },
];

// 1. SPREAD OPERATÖRÜ: Yeni film ekleme
// Spread ile mevcut diziyi bozmadan yeni bir film ekliyoruz
const yeniFilm: Film = { id: "f3", baslik: "The Matrix", fiyat: 18, tur: "Aksiyon" };
const guncelKiralananFilmler: Film[] = [...kiralananFilmler, yeniFilm];

console.log("Spread ile yeni film eklenmiş hali:", guncelKiralananFilmler);
// Çıktı: [
//   { id: "f1", baslik: "Inception", fiyat: 20, tur: "Bilim Kurgu" },
//   { id: "f2", baslik: "The Godfather", fiyat: 25, tur: "Dram" },
//   { id: "f3", baslik: "The Matrix", fiyat: 18, tur: "Aksiyon" }
// ]

// 2. SPREAD OPERATÖRÜ: Film listesini başka bir listeyle birleştirme
// Kullanıcının önerilen filmler listesi
const oneriFilmler: Film[] = [
    { id: "f4", baslik: "Interstellar", fiyat: 22, tur: "Bilim Kurgu" },
    { id: "f5", baslik: "Pulp Fiction", fiyat: 15, tur: "Suç" },
];

// İki listeyi birleştiriyoruz
const tumFilmler: Film[] = [...kiralananFilmler, ...oneriFilmler];

console.log("Tüm filmler (spread ile birleştirme):", tumFilmler);
// Çıktı: 5 filmden oluşan birleşik bir liste

// 3. REST OPERATÖRÜ: İlk filmi ayırıp geri kalanları toplama
const [ilkFilm, ...digerFilmler] = guncelKiralananFilmler;

console.log("İlk film:", ilkFilm);
console.log("Diğer filmler:", digerFilmler);
// Çıktı:
// İlk film: { id: "f1", baslik: "Inception", fiyat: 20, tur: "Bilim Kurgu" }
// Diğer filmler: [
//   { id: "f2", baslik: "The Godfather", fiyat: 25, tur: "Dram" },
//   { id: "f3", baslik: "The Matrix", fiyat: 18, tur: "Aksiyon" }
// ]

// 4. REST OPERATÖRÜ: Fonksiyon parametrelerinde kullanım
// Kullanıcının kiraladığı filmlerin toplam fiyatını hesaplayan bir fonksiyon
function toplamFiyatHesapla(...filmler: Film[]): number {
    return filmler.reduce((toplam, film) => toplam + film.fiyat, 0);
}

console.log("Tüm kiralanan filmlerin toplam fiyatı:", toplamFiyatHesapla(...guncelKiralananFilmler));
// Çıktı: 63 (20 + 25 + 18)

// 5. SPREAD OPERATÖRÜ: Bir filmin özelliklerini güncelleme
// Inception filminin fiyatını güncelleyelim
const guncelInception: Film = {
    ...kiralananFilmler[0], // Mevcut özellikleri al
    fiyat: 30, // Fiyatı güncelle
};

console.log("Güncellenmiş Inception:", guncelInception);
// Çıktı: { id: "f1", baslik: "Inception", fiyat: 30, tur: "Bilim Kurgu" }



// ===== ÖZET VE MÜLAKAT REHBERİ =====
// ÖĞRENİLENLER:
// 1. Spread: Array/objeleri kopyalar veya birleştirir.
// 2. Rest: Kalan elemanları toplar (parametre veya destructuring’de).
// 3. Gerçek Hayat: Veri birleştirme, ayrıştırma, esnek fonksiyonlar.

// MÜLAKAT SORULARI:
// - Spread ile rest farkı? (Spread yayar, rest toplar.)
// - Spread derin kopya yapar mı? (Hayır, sadece sığ kopya.)

// YAYGIN HATALAR VE ÇÖZÜMLER:
// - Hata: Spread ile derin kopya sanmak.
//   Çözüm: Derin kopya için JSON.parse(JSON.stringify()).
// - Hata: Rest’i yanlış yerde kullanmak.
//   Çözüm: Rest sadece son parametre veya destructuring’de kullanılır.

// PRATİK İPUÇLARI:
// - Spread: Hızlı array/obje birleştirme ve kopyalama.
// - Rest: Esnek fonksiyonlar ve veri ayrıştırma.
