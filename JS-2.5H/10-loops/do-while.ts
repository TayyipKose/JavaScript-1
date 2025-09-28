// ========================= JS DO-WHILE DÖNGÜSÜ: SIFIRDAN ORTA+ SEVIYE REHBER =========================
// Amaç: do-while döngüsünü gerçek hayatta veri işleme, filtreleme ve kuyruk yönetimi için öğren
// Senaryo: Görev yönetim sistemi (ör. Todo App, iş kuyruğu)

// ===== BÖLÜM 1: DO-WHILE NEDİR? NASIL ÇALIŞIR? =====
// do-while: Önce kodu çalıştırır, sonra koşulu kontrol eder, koşul doğruysa devam eder
// Sözdizimi: do { ... } while (koşul);
// Önemli: En az bir kez çalışır, bu yüzden "önce yap, sonra kontrol et" döngüsü

let sayac = 1;
do {
    console.log(`Adım: ${sayac}`);
    sayac++;
} while (sayac <= 3);
// Çıktı: Adım: 1, Adım: 2, Adım: 3

// Örnek: Koşul yanlış olsa bile bir kez çalışır
sayac = 10;
do {
    console.log(`Tekrar: ${sayac}`);
} while (sayac < 5);
// Çıktı: Tekrar: 10
// 💡 İpucu: do-while, en az bir kez çalışması gereken durumlarda süper.

// ===== BÖLÜM 2: ARRAY’LERLE DO-WHILE KULLANIMI =====
// Örnek veri: Görev yönetim sistemi
const gorevler = [
    { id: "g1", ad: "Kod Yaz", tamam: false },
    { id: "g2", ad: "Test Et", tamam: true },
    { id: "g3", ad: "Doküman Yaz", tamam: false }
];

// Örnek 1: İlk tamamlanmamış görevi bul
let i = 0;
let tamamlanmamis = null;
do {
    if (!gorevler[i].tamam) {
        tamamlanmamis = gorevler[i];
    }
    i++;
} while (!tamamlanmamis && i < gorevler.length);
console.log("İlk tamamlanmamış:", tamamlanmamis); // { id: "g1", ad: "Kod Yaz", tamam: false }
// 💡 Mülakat: "Bunu while ile nasıl yapardın?" (while (i < gorevler.length && !tamamlanmamis))

// Örnek 2: Görevleri tamamla
i = 0;
do {
    if (!gorevler[i].tamam) {
        gorevler[i].tamam = true;
        console.log(`Tamamlandı: ${gorevler[i].ad}`);
    }
    i++;
} while (i < gorevler.length);
// Çıktı: Tamamlandı: Kod Yaz, Tamamlandı: Doküman Yaz
// 💡 Mülakat: "Bunu forEach ile yaparsan ne değişir?" (forEach daha kısa, ama do-while erken çıkış için esnek)

// ===== BÖLÜM 3: GERÇEK HAYAT - KUYUK YÖNETIMI =====
// Senaryo: İş kuyruğu (ör. mesaj işleme)
const kuyruk = ["Mesaj 1", "Mesaj 2", "Mesaj 3"];
const loglar = [];
do {
    const is = kuyruk.shift();
    if (is) loglar.push(`İşlendi: ${is}`);
} while (kuyruk.length > 0);
console.log("Loglar:", loglar);
// Çıktı: ["İşlendi: Mesaj 1", "İşlendi: Mesaj 2", "İşlendi: Mesaj 3"]
// 💡 İpucu: do-while, kuyruk işleme veya en az bir deneme gereken durumlarda ideal.

// ===== BÖLÜM 4: PERFORMANS VE OPTİMİZASYON =====
// Örnek: İlk yüksek öncelikli görevi bul
const oncelikliGorevler = [
    { ad: "Acil Kod", oncelik: 1 },
    { ad: "Toplantı", oncelik: 3 },
    { ad: "Rapor", oncelik: 2 }
];
i = 0;
let yuksekOncelik = null;
do {
    if (oncelikliGorevler[i].oncelik >= 3) {
        yuksekOncelik = oncelikliGorevler[i];
        break; // Bulunca döngüyü kır, performans artar
    }
    i++;
} while (i < oncelikliGorevler.length);
console.log("Yüksek öncelikli:", yuksekOncelik); // { ad: "Toplantı", oncelik: 3 }
// 💡 Mülakat: "do-while burada neden uygun?" (En az bir kontrol garanti, break ile optimize)

// ===== BÖLÜM 5: HATA YÖNETİMİ =====
// Örnek: Boş kuyruk kontrolü
const bosKuyruk = [];
do {
    const is = bosKuyruk.shift();
    if (!is) break; // Kuyruk boşsa çık
    console.log("Bu çalışmaz, kuyruk boş!");
} while (bosKuyruk.length > 0);
console.log("Boş kuyruk kontrolü geçti.");
// 💡 İpucu: null/undefined ve boş array kontrolü şart.

// ===== ÖZET VE MÜLAKAT İPUÇLARI =====
// 📌 do-while: Önce çalışır, sonra koşulu kontrol eder, en az bir kez çalışır.
// 📌 Kullanım Alanları:
//   - Array tarama (filtreleme, güncelleme)
//   - Kuyruk yönetimi (FIFO: İlk giren ilk çıkar)
//   - En az bir deneme gereken durumlar (ör. API retry)
// 📌 Dikkat:
//   - Sonsuz döngü riski: Koşulu iyi tasarla!
//   - Gereksiz do-while: Tek çalıştırma gerekmiyorsa while kullan.
// 📌 Mülakat Soruları:
//   1. "do-while ile while farkı?" (do-while en az bir kez çalışır)
//   2. "do-while ne zaman kullanılır?" (En az bir deneme gerektiğinde, kuyruk işlerken)
//   3. "Sonsuz döngü nasıl önlenir?" (Koşulu test et, break kullan)
//   4. "Gerçek projede do-while örneği?" (Kuyruk işleme, retry mekanizmaları)
