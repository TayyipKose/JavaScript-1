// ========================= JS WHILE DÖNGÜSÜ: SIFIRDAN ORTA+ SEVIYE REHBER =========================
// Amaç: while döngüsünü gerçek hayatta veri işleme, filtreleme ve kuyruk yönetimi için kullanmayı öğren
// Senaryo: Görev yönetim sistemi (ör. Todo App, kuyruk işleme)

// ===== BÖLÜM 1: WHILE NEDİR? NASIL ÇALIŞIR? =====
// while: Bir koşul doğru olduğu sürece kodu tekrarlar
// Sözdizimi: while (koşul) { ... }
// Önemli: Koşul yanlış olana kadar çalışır, sonsuz döngüye dikkat!

let sayac = 1;
while (sayac <= 3) {
    console.log(`Adım: ${sayac}`);
    sayac++; // Sayacı artırmazsan sonsuz döngü olur!
}
// Çıktı: Adım: 1, Adım: 2, Adım: 3
// 💡 İpucu: while, döngü sayısı bilinmediğinde veya koşula bağlı işlemlerde süper.

// ===== BÖLÜM 2: ARRAY’LERLE WHILE KULLANIMI =====
// Örnek veri: Görev yönetim sistemi
const gorevler = [
    { id: "g1", ad: "Kod Yaz", tamam: false },
    { id: "g2", ad: "Test Et", tamam: true },
    { id: "g3", ad: "Doküman Yaz", tamam: false }
];

// Örnek 1: Tamamlanmamış görevleri işaretle
let i = 0;
while (i < gorevler.length) {
    if (!gorevler[i].tamam) {
        gorevler[i].tamam = true; // Tamamlanmamışları tamamla
        console.log(`Tamamlandı: ${gorevler[i].ad}`);
    }
    i++;
}
// Çıktı: Tamamlandı: Kod Yaz, Tamamlandı: Doküman Yaz
// 💡 Mülakat: "Bunu for ile nasıl yapardın?" (for (let i = 0; i < gorevler.length; i++))

// Örnek 2: İlk tamamlanmamış görevi bul
i = 0;
let ilkTamamlanmamis = null;
while (i < gorevler.length && !ilkTamamlanmamis) {
    if (!gorevler[i].tamam) {
        ilkTamamlanmamis = gorevler[i];
    }
    i++;
}
console.log("İlk tamamlanmamış:", ilkTamamlanmamis); // null (hepsi tamam)
// 💡 Mülakat: "Bunu find ile yaparsan ne değişir?" (find daha kısa, ama while erken çıkış için esnek)

// ===== BÖLÜM 3: GERÇEK HAYAT - KUYUK YÖNETIMI =====
// Senaryo: İş kuyruğu (ör. mesaj işleme, görev sırası)
const kuyruk = ["Mesaj 1", "Mesaj 2", "Mesaj 3"];
const islenenler = [];
while (kuyruk.length > 0) {
    const is = kuyruk.shift(); // İlk işi al
    islenenler.push(`İşlendi: ${is}`);
}
console.log("İşlenenler:", islenenler);
// Çıktı: ["İşlendi: Mesaj 1", "İşlendi: Mesaj 2", "İşlendi: Mesaj 3"]
// 💡 İpucu: while, kuyruk veya dinamik veri işlemek için ideal.

// ===== BÖLÜM 4: PERFORMANS VE OPTİMİZASYON =====
// Örnek: İlk yüksek öncelikli görevi bul (erken çıkış)
const oncelikliGorevler = [
    { ad: "Acil Kod", oncelik: 1 },
    { ad: "Toplantı", oncelik: 3 },
    { ad: "Rapor", oncelik: 2 }
];
i = 0;
let yuksekOncelik = null;
while (i < oncelikliGorevler.length) {
    if (oncelikliGorevler[i].oncelik >= 3) {
        yuksekOncelik = oncelikliGorevler[i];
        break; // Bulunca döngüyü kır, performans artar
    }
    i++;
}
console.log("Yüksek öncelikli:", yuksekOncelik); // { ad: "Toplantı", oncelik: 3 }
// 💡 Mülakat: "break neden önemli?" (Gereksiz döngüleri önler, O(n) süresini azaltır)

// ===== BÖLÜM 5: HATA YÖNETİMİ =====
// Örnek: Boş array veya null kontrolü
const bosKuyruk = [];
while (bosKuyruk.length > 0) {
    console.log("Bu çalışmaz, kuyruk boş!");
}
console.log("Boş kuyruk kontrolü geçti.");
// 💡 İpucu: Her zaman array uzunluğunu veya null/undefined kontrol et.

// ===== ÖZET VE MÜLAKAT İPUÇLARI =====
// 📌 while: Koşul doğru olduğu sürece çalışır, döngü sayısı bilinmediğinde ideal.
// 📌 Kullanım Alanları:
//   - Array işleme (filtreleme, güncelleme)
//   - Kuyruk yönetimi (FIFO: İlk giren ilk çıkar)
//   - Erken çıkış (break ile performans)
// 📌 Dikkat:
//   - Sonsuz döngü riski: Sayacı unutma!
//   - Koşulu iyi tasarla: Yanlış koşul = hata
// 📌 Mülakat Soruları:
//   1. "while ne zaman tercih edilir?" (Döngü sayısı belirsizse, kuyruk işlerken)
//   2. "while ile for farkı?" (while koşul odaklı, for indeks odaklı)
//   3. "Sonsuz döngü nasıl önlenir?" (Sayacı artır, koşulu güncelle)
//   4. "Gerçek projede while örneği?" (Kuyruk işleme, veri akışı, retry mekanizmaları)
// 📌 Pratik İpuçları:
//   - Kendi kodunu yaz: 10 görevlik array’de tamamlanmamışları while ile bul.
//   - Performansı test et: break ile/break olmadan süreleri console.time ile ölç.
//   - Alternatifleri öğren: while yerine find veya filter kullan, farkları analiz et.
