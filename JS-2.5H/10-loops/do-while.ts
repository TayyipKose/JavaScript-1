// @ts-nocheck
// ========================= TYPESCRIPT DO-WHILE DÖNGÜSÜ: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te do-while döngüsünü sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi için array’ler ve pratik senaryolar içerir.

// ===== BÖLÜM 1: DO-WHILE NEDİR VE NASIL ÇALIŞIR? =====
// Do-while, önce kodu çalıştırır, sonra koşulu kontrol eder, koşul doğruysa devam eder.
// Sözdizimi: do { ... } while (koşul);
// Arka Plan: En az bir kez çalışır, bu yüzden "önce yap, sonra kontrol et" döngüsüdür.

let sayac: number = 1;
do {
    console.log(`Sayı: ${sayac}`);
    sayac++;
} while (sayac <= 5);
// Çıktı: Sayı: 1, 2, 3, 4, 5

// Örnek: Koşul yanlış olsa bile bir kez çalışır
sayac = 10;
do {
    console.log(`Tekrar: ${sayac}`);
} while (sayac < 5);
// Çıktı: Tekrar: 10

// 📌 Neden Önemli? Do-while, en az bir kez çalışması gereken durumlarda kullanılır.
// 📌 Mülakat İpucu: “En az bir kez çalışması gerektiğinde do-while tercih ederim.”

// ===== BÖLÜM 2: ARRAY’LERLE DO-WHILE KULLANIMI =====
// Orta seviye geliştiriciler, do-while’ı veri işleme için kullanır.

interface Is {
    id: string;
    ad: string;
    durum: boolean;
}

const isler: Is[] = [
    { id: "i1", ad: "Veri Gir", durum: false },
    { id: "i2", ad: "Rapor Oluştur", durum: true },
    { id: "i3", ad: "Kontrol Et", durum: false }
];

// Örnek: İlk tamamlanmamış işi bulma
let i: number = 0;
let tamamlanmamis: Is | null = null;
do {
    if (!isler[i].durum) {
        tamamlanmamis = isler[i];
    }
    i++;
} while (!tamamlanmamis && i < isler.length);
console.log("Tamamlanmamış iş:", tamamlanmamis);
// Çıktı: { id: "i1", ad: "Veri Gir", durum: false }

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// Do-while ile kuyruk işleme (Gerçek Hayat: İş kuyruğu)
const kuyruk: string[] = ["görev 1", "görev 2"];
const loglar: string[] = [];
do {
    const gorev: string | undefined = kuyruk.shift();
    if (gorev) {
        loglar.push(`İşlenen: ${gorev}`);
    }
} while (kuyruk.length > 0);
console.log("Loglar:", loglar);
// Çıktı: ["İşlenen: görev 1", "İşlenen: görev 2"]

// 📌 Neden Önemli? Do-while, kuyruk veya en az bir kez denenmesi gereken işlemler için uygundur.

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. **Do-While Temelleri**: Önce çalışır, sonra koşulu kontrol eder.
// 2. **Array Kullanımı**: Veri tarama ve filtreleme için kullanılır.
// 3. **Gerçek Hayat**: Kuyruk veya deneme bazlı işlemler için ideal.
// 4. **Dikkat**: Sonsuz döngü riski; koşul dikkatle yazılmalı.

// MÜLAKAT SORULARI:
// - Do-while ile while farkı nedir? (Do-while en az bir kez çalışır.)
// - Do-while ne zaman kullanılır? (En az bir deneme gerektiğinde.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Koşulu yanlış yazmak (sonsuz döngü).
//   **Çözüm**: Koşulu test et, sayaç güncelle.
// - **Hata**: Gereksiz do-while kullanmak.
//   **Çözüm**: Tek çalıştırma garantisi gerekmiyorsa while kullan.

// PRATİK İPUÇLARI:
// - Kodu yaz: Array’den ilk tamamlanmamış işi do-while ile bul.
// - Mantığı açıkla: Neden do-while seçtin, belirt.
// - Pratik yap: Kuyruktan veri işleyen bir do-while kodu yaz.