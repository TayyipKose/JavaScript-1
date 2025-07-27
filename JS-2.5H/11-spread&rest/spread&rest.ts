// @ts-nocheck
// ========================= TYPESCRIPT SPREAD VE REST: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te spread (...) ve rest (...) operatörlerini sade, akıcı ve gerçek hayatta kullanılabilir şekilde açıklar.
// Orta seviye TS geliştiricileri için array’ler, objeler ve pratik senaryolar içerir.

// ===== BÖLÜM 1: SPREAD OPERATÖRÜ NEDİR? =====
// Spread (...), bir array veya objeyi elemanlarına ayırır ya da kopyalar.
// Kullanım: [...array] veya {...obje}
// Amaç: Sığ kopya oluşturmak, birleştirmek veya veri yaymak.

// Örnek 1: Array birleştirme (Gerçek Hayat: Takım listesi oluşturma)
const takim1: string[] = ["Ali", "Ayşe"];
const takim2: string[] = ["Mehmet", "Zeynep"];
const tumTakim: string[] = [...takim1, ...takim2, "Yeni Üye"];
console.log("Tüm takım:", tumTakim);
// Çıktı: ["Ali", "Ayşe", "Mehmet", "Zeynep", "Yeni Üye"]

// Örnek 2: Obje birleştirme (Gerçek Hayat: Kullanıcı ayarları)
interface Ayarlar {
[key: string]: string | boolean;
}
const varsayilan: Ayarlar = { tema: "açık", bildirim: true };
const kullaniciAyarlari: Ayarlar = { tema: "koyu", dil: "tr" };
const birlesikAyarlar: Ayarlar = { ...varsayilan, ...kullaniciAyarlari };
console.log("Birleşik ayarlar:", birlesikAyarlar);
// Çıktı: { tema: "koyu", bildirim: true, dil: "tr" }

// Örnek 3: Array kopyalama (Gerçek Hayat: Veriyi koruma)
const orijinal: number[] = [1, 2, 3];
const kopya: number[] = [...orijinal];
kopya.push(4);
console.log("Orijinal:", orijinal, "Kopya:", kopya);
// Çıktı: Orijinal: [1, 2, 3], Kopya: [1, 2, 3, 4]

// 📌 Koşullu Spread (Gerçek Hayat: Dinamik veri ekleme)
const line = { current_account_id: "123" };
const payload = {
...(line.current_account_id && { current_account_id: line.current_account_id }),
name: "Proje"
};
console.log("Payload:", payload);
// Çıktı: { current_account_id: "123", name: "Proje" }

// 💡 Neden Kullanalım? Spread, veri kopyalamayı ve birleştirmeyi kolaylaştırır.
// 💡 Mülakat İpucu: “Spread ile sığ kopya yaparım, birleştirmelerde kullanırım.”

// ===== BÖLÜM 2: REST OPERATÖRÜ NEDİR? =====
// Rest (...), kalan elemanları toplar (fonksiyon parametreleri veya destructuring’de).
// Kullanım: function(...rest: T[]) veya const {a, ...rest} = obje
// Amaç: Esnek veri toplama ve ayrıştırma.

// Örnek 1: Fonksiyonda rest (Gerçek Hayat: Değişken sayıda parametre)
function toplam(...sayilar: number[]): number {
return sayilar.reduce((toplam, sayi) => toplam + sayi, 0);
}
console.log("Toplam:", toplam(1, 2, 3, 4)); // Çıktı: 10
console.log("Toplam:", toplam(5, 10)); // Çıktı: 15

// Örnek 2: Destructuring ile rest (Gerçek Hayat: Veri ayrıştırma)
const kullanici = { id: "u1", ad: "Ali", puan: 90 };
const { id, ...kalan } = kullanici;
console.log("ID:", id, "Kalan:", kalan);
// Çıktı: ID: u1, Kalan: { ad: "Ali", puan: 90 }

// Örnek 3: Array destructuring ile rest
const notlar: number[] = [85, 90, 75, 95];
const [ilk, ...digerNotlar] = notlar;
console.log("İlk:", ilk, "Diğer:", digerNotlar);
// Çıktı: İlk: 85, Diğer: [90, 75, 95]

// 💡 Neden Kullanalım? Rest, esnek veri toplama ve ayrıştırma için idealdir.
// 💡 Mülakat İpucu: “Rest ile değişken sayıda argüman toplarım.”

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// Spread ve rest ile proje yönetimi senaryosu.

interface Proje {
id: string;
tamam: boolean;
detaylar: { ad: string; oncelik: number };
}

const projeler: Proje[] = [
{ id: "p1", tamam: false, detaylar: { ad: "Web", oncelik: 3 } },
{ id: "p2", tamam: true, detaylar: { ad: "App", oncelik: 1 } }
];

// Örnek 1: Spread ile proje ekleme
const ekProje: Proje = { id: "p3", tamam: false, detaylar: { ad: "API", oncelik: 2 } };
const tumProjeler: Proje[] = [...projeler, ekProje];
console.log("Toplam proje sayısı:", tumProjeler.length); // Çıktı: 3

// Örnek 2: Rest ile proje detaylarını ayrıştırma
function projeRaporu({ id, ...detay }: Proje): string {
    return `Proje ${id}: ${detay.detaylar.ad}, Öncelik ${detay.detaylar.oncelik}`;
}
tumProjeler.forEach(p => console.log(projeRaporu(p)));

// Çıktı:
// Proje p1: Web, Öncelik 3
// Proje p2: App, Öncelik 1
// Proje p3: API, Öncelik 2

// 💡 Neden Önemli? Spread ve rest, veri işleme süreçlerini hızlandırır.
// 💡 Mülakat İpucu: “Spread ile kopya, rest ile esnek ayrıştırma yaparım.”

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
// - Her ikisi: Temiz, okunabilir kod için vazgeçilmez.