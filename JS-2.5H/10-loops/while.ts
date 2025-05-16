// @ts-nocheck
// ========================= TYPESCRIPT WHILE DÖNGÜSÜ: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te while döngüsünü sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi için array’ler ve pratik senaryolar içerir.

// ===== BÖLÜM 1: WHILE NEDİR VE NASIL ÇALIŞIR? =====
// While, bir koşul doğru olduğu sürece çalışır.
// Sözdizimi: while (koşul) { ... }
// Arka Plan: Koşul kontrolü döngü başında yapılır, esnektir, ama sonsuz döngü riski vardır.

let sayac: number = 1;
while (sayac <= 5) {
    console.log(`Sayı: ${sayac}`);
    sayac++;
}
// Çıktı: Sayı: 1, 2, 3, 4, 5

// 📌 Neden Önemli? While, koşul tabanlı döngüler için idealdir, özellikle döngü sayısı bilinmediğinde.
// 📌 Mülakat İpucu: While’ın esnekliğini vurgula: “Döngü sayısı belirsizse while kullanırım.”

// ===== BÖLÜM 2: ARRAY’LERLE WHILE KULLANIMI =====
// Orta seviye geliştiriciler, while’ı veri işleme için kullanır.

interface Gorev {
    id: string;
    ad: string;
    tamam: boolean;
}

const gorevler: Gorev[] = [
    { id: "g1", ad: "Kod Yaz", tamam: false },
    { id: "g2", ad: "Test Et", tamam: true },
    { id: "g3", ad: "Doküman Yaz", tamam: false }
];

// Örnek 1: Görevleri işleme (Gerçek Hayat: Sıralı işlem)
let i: number = 0;
while (i < gorevler.length) {
    if (!gorevler[i].tamam) {
        gorevler[i].tamam = true; // Tamamlanmamış görevleri tamamla
    }
    i++;
}
console.log("Güncel görevler:", gorevler);
// Çıktı: [{ id: "g1", ad: "Kod Yaz", tamam: true }, ...]

// Örnek 2: İlk tamamlanmamış görevi bulma
i = 0;
let ilkTamamlanmamis: Gorev | null = null;
while (i < gorevler.length && !ilkTamamlanmamis) {
    if (!gorevler[i].tamam) {
        ilkTamamlanmamis = gorevler[i];
    }
    i++;
}
console.log("İlk tamamlanmamış:", ilkTamamlanmamis); // null (hepsi tamam)

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// While ile veri işleme (Gerçek Hayat: Kuyruk yönetimi)
const kuyruk: string[] = ["iş 1", "iş 2", "iş 3"];
const islenenler: string[] = [];
while (kuyruk.length > 0) {
    const is: string = kuyruk.shift()!; // İlk işi al
    islenenler.push(`İşlenen: ${is}`);
}
console.log("İşlenenler:", islenenler);
// Çıktı: ["İşlenen: iş 1", "İşlenen: iş 2", "İşlenen: iş 3"]

// 📌 Neden Önemli? While, kuyruk veya dinamik veri işleme için güçlüdür.
// 📌 Mülakat İpucu: While’ın kuyruk yönetiminde kullanımını örnek ver.

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. **While Temelleri**: Koşul doğruysa çalışır, esnektir.
// 2. **Array Kullanımı**: Veri işleme ve filtreleme için kullanılır.
// 3. **Gerçek Hayat**: Kuyruk yönetimi, dinamik işlemler için ideal.
// 4. **Dikkat**: Sonsuz döngü riski (sayac artışı unutulmamalı).

// MÜLAKAT SORULARI:
// - While ne zaman kullanılır? (Döngü sayısı bilinmediğinde.)
// - Sonsuz döngü nasıl önlenir? (Koşul ve sayaç kontrolü ile.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Sayaç artışı unutmak (sonsuz döngü).
//   **Çözüm**: Her zaman sayac++ veya koşul güncelle.

// PRATİK İPUÇLARI:
// - Kodu yaz: Bir array’den tamamlanmamış görevleri while ile bul.
// - Mantığı açıkla: While’ın neden uygun olduğunu belirt.
// - Pratik yap: Kuyruktan veri işleme kodu yaz.