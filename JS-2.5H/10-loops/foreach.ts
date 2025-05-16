// @ts-nocheck
// ========================= TYPESCRIPT FOREACH DÖNGÜSÜ: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te forEach döngüsünü sade ve pratik şekilde öğretir.
// Orta seviye TS geliştiricisi için array’ler ve objelerle örnekler içerir.

// ===== BÖLÜM 1: FOREACH NEDİR? =====
// forEach, array’in her elemanı için bir fonksiyon çalıştırır.
// Sözdizimi: array.forEach((eleman, indeks) => { ... })
// Arka Plan: Array metodu, dönüş değeri yoktur (undefined).

const sayilar: number[] = [10, 20, 30];
sayilar.forEach((sayi: number, indeks: number) => {
    console.log(`Indeks ${indeks}: ${sayi}`);
});
// Çıktı: Indeks 0: 10, Indeks 1: 20, Indeks 2: 30

// 📌 Neden Önemli? forEach, array işleme için modern ve okunabilir.
// 📌 Mülakat İpucu: “Yan etkiler için forEach kullanıyorum.”

// ===== BÖLÜM 2: ARRAY’LERLE FOREACH =====
// Veri güncelleme ve raporlama için kullanılır.

interface Kullanici {
    id: string;
    ad: string;
    puan: number;
}

const kullanicilar: Kullanici[] = [
    { id: "u1", ad: "Ali", puan: 85 },
    { id: "u2", ad: "Ayşe", puan: 90 }
];

// Örnek 1: Puan güncelleme
kullanicilar.forEach((k: Kullanici) => {
    k.puan += 5;
});
console.log("Puanlar:", kullanicilar);
// Çıktı: [{ id: "u1", ad: "Ali", puan: 90 }, { id: "u2", ad: "Ayşe", puan: 95 }]

// Örnek 2: Rapor oluşturma
const rapor: string[] = [];
kullanicilar.forEach((k: Kullanici) => {
    rapor.push(`${k.ad}: ${k.puan}`);
});
console.log("Rapor:", rapor);
// Çıktı: ["Ali: 90", "Ayşe: 95"]

// ===== BÖLÜM 3: OBJELERLE FOREACH =====
// Object.entries ile objeleri işler.

interface Ayarlar {
    [key: string]: string | boolean;
}

const ayarlar: Ayarlar = { tema: "koyu", bildirim: true };
Object.entries(ayarlar).forEach(([key, val]: [string, string | boolean]) => {
    console.log(`${key}: ${val}`);
});
// Çıktı: tema: koyu, bildirim: true

// ===== BÖLÜM 4: GERÇEK HAYAT UYGULAMASI =====
// Görev yönetimi ve analiz.

interface Gorev {
    tamam: boolean;
    oncelik: number;
}

const gorevler: Gorev[] = [
    { tamam: false, oncelik: 3 },
    { tamam: true, oncelik: 1 }
];

// Örnek: Görev güncelleme
gorevler.forEach((g: Gorev) => {
    if (g.oncelik <= 2 && !g.tamam) g.tamam = true;
});
console.log("Görevler:", gorevler);
// Çıktı: [{ tamam: false, oncelik: 3 }, { tamam: true, oncelik: 1 }]

// ===== BÖLÜM 5: SINIRLAR =====
// forEach’in dönüş değeri yoktur, break kullanılamaz.

const sayilar2: number[] = [1, 2, 3];
sayilar2.forEach((sayi: number) => {
    if (sayi === 2) return;
    console.log(`Sayı: ${sayi}`);
});
// Çıktı: Sayı: 1, Sayı: 3

// 📌 Neden Önemli? forEach, yan etkiler için tasarlandı.
// 📌 Mülakat İpucu: “Break için for...of, yeni array için map kullanırım.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. forEach: Array elemanlarını işler.
// 2. Array: Güncelleme ve raporlama için ideal.
// 3. Obje: Object.entries ile kullanılır.
// 4. Sınırlar: Break ve dönüş yok.

// MÜLAKAT SORULARI:
// - forEach ile for...of farkı? (forEach array metodu, for...of break destekler.)
// - forEach’in dönüş değeri? (Undefined.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Break kullanmak.
//   **Çözüm**: for...of kullan.
// - **Hata**: Yeni array beklemek.
//   **Çözüm**: Map kullan.

// PRATİK İPUÇLARI:
// - Array’den rapor oluştur.
// - Obje özelliklerini logla.