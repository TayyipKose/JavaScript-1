// @ts-nocheck
// ========================= TYPESCRIPT SPREAD VE REST: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te spread (...) ve rest (...) operatörlerini sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi için array’ler, objeler ve pratik senaryolar içerir.

// ===== BÖLÜM 1: SPREAD OPERATÖRÜ NEDİR? =====
// Spread (...), bir array veya objeyi elemanlarına ayırır veya kopyalar.
// Sözdizimi: [...array] veya {...obje}
// Arka Plan: Sığ kopya oluşturur, birleştirme ve kopyalama için kullanılır.

// Örnek 1: Array birleştirme (Gerçek Hayat: Liste birleştirme)
const takim1: string[] = ["Ali", "Ayşe"];
const takim2: string[] = ["Mehmet", "Zeynep"];
const tumTakim: string[] = [...takim1, ...takim2, "Yeni Üye"];
console.log("Tüm takım:", tumTakim);
// Çıktı: ["Ali", "Ayşe", "Mehmet", "Zeynep", "Yeni Üye"]

// Örnek 2: Obje birleştirme (Gerçek Hayat: Varsayılan ayarlar)
interface Ayarlar {
    [key: string]: string | boolean;
}
const varsayilan: Ayarlar = { tema: "açık", bildirim: true };
const kullaniciAyarlari: Ayarlar = { tema: "koyu", dil: "tr" };
const birlesikAyarlar: Ayarlar = { ...varsayilan, ...kullaniciAyarlari };
console.log("Birleşik ayarlar:", birlesikAyarlar);
// Çıktı: { tema: "koyu", bildirim: true, dil: "tr" }

// Örnek 3: Array kopyalama (Gerçek Hayat: Veri koruma)
const orijinal: number[] = [1, 2, 3];
const kopya: number[] = [...orijinal];
kopya.push(4);
console.log("Orijinal:", orijinal, "Kopya:", kopya);
// Çıktı: Orijinal: [1, 2, 3], Kopya: [1, 2, 3, 4]

//  Neden Önemli? Spread, veri birleştirme ve kopyalama için hızlı ve okunabilir.
//  Mülakat İpucu: “Spread ile sığ kopya oluşturur, birleştirmelerde kullanırım.”


//📌Örnek 3 spread operatörü ile kontrol (conditional spread)
/*
commitSave() fonksiyonunda payload hazırladığımızı varsayalım:
...(line.current_account_id && { current_account_id: line.current_account_id }),
 */

// ===== BÖLÜM 2: REST OPERATÖRÜ NEDİR? =====
// Rest (...), kalan elemanları toplar (fonksiyon parametreleri veya destructuring’de).
// Sözdizimi: function(...rest: T[]) veya const {a, ...rest} = obje
// Arka Plan: Değişken sayıda argüman veya kalan özellikleri toplar.

// Örnek 1: Fonksiyonda rest (Gerçek Hayat: Esnek parametreler)
function toplam(...sayilar: number[]): number {
    return sayilar.reduce((acc, curr) => acc + curr, 0);
}
console.log("Toplam:", toplam(1, 2, 3, 4)); // 10
console.log("Toplam:", toplam(5, 10)); // 15

// Örnek 2: Destructuring ile rest (Gerçek Hayat: Veri ayrıştırma)
interface Kullanici {
    id: string;
    ad: string;
    puan: number;
}
const kullanici: Kullanici = { id: "u1", ad: "Ali", puan: 90 };
const { id, ...kalan } = kullanici;
console.log("ID:", id, "Kalan:", kalan);
// Çıktı: ID: u1, Kalan: { ad: "Ali", puan: 90 }

// Örnek 3: Array destructuring ile rest
const notlar: number[] = [85, 90, 75, 95];
const [ilk, ...digerNotlar] = notlar;
console.log("İlk:", ilk, "Diğer:", digerNotlar);
// Çıktı: İlk: 85, Diğer: [90, 75, 95]

// 📌 Neden Önemli? Rest, esnek veri toplama ve ayrıştırma için güçlü.
// 📌 Mülakat İpucu: “Rest ile değişken sayıda parametre toplarım.”

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// Spread ve rest ile veri işleme (Gerçek Hayat: Proje yönetimi).

interface Proje {
    id: string;
    tamam: boolean;
    detaylar: { ad: string; oncelik: number };
}
const projeler: Proje[] = [
    { id: "p1", tamam: false, detaylar: { ad: "Web", oncelik: 3 } },
    { id: "p2", tamam: true, detaylar: { ad: "App", oncelik: 1 } }
];

// Örnek 1: Spread ile projeleri birleştirme
const ekProje: Proje = { id: "p3", tamam: false, detaylar: { ad: "API", oncelik: 2 } };
const tumProjeler: Proje[] = [...projeler, ekProje];
console.log("Tüm projeler:", tumProjeler.length); // 3

// Örnek 2: Rest ile proje detaylarını ayrıştırma
function projeRaporu({ id, ...detay }: Proje): string {
    return `Proje ${id}: ${detay.detaylar.ad}, Öncelik ${detay.detaylar.oncelik}`;
}
tumProjeler.forEach(p => console.log(projeRaporu(p)));
// Çıktı: Proje p1: Web, Öncelik 3
//        Proje p2: App, Öncelik 1
//        Proje p3: API, Öncelik 2

// 📌 Neden Önemli? Spread ve rest, veri birleştirme ve ayrıştırmada sık kullanılır.
// 📌 Mülakat İpucu: “Spread ile veri kopyaladım, rest ile parametre topladım.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. Spread: Array/obje kopyalar, birleştirir.
// 2. Rest: Kalan elemanları toplar (parametre, destructuring).
// 3. Gerçek Hayat: Veri birleştirme, ayrıştırma, esnek fonksiyonlar.

// MÜLAKAT SORULARI:
// - Spread ile rest farkı? (Spread ayırır, rest toplar.)
// - Spread derin kopya yapar mı? (Hayır, sığ kopya.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Spread ile derin kopya sanmak.
//   **Çözüm**: Derin kopya için JSON.parse(JSON.stringify()).
// - **Hata**: Rest’i yanlış yerde kullanmak.
//   **Çözüm**: Rest sadece son parametre veya destructuring’de.

// PRATİK İPUÇLARI:
// - Spread ile array birleştir.
// - Rest ile esnek fonksiyon yaz.
// - Destructuring ile veri ayrıştır.