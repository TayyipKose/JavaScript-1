// @ts-nocheck
// ========================= TYPESCRIPT SETTIMEOUT, MATH, DATE, SETINTERVAL: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te setTimeout, Math, Date ve setInterval’ı sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi için pratik senaryolar içerir.

// ===== BÖLÜM 1: SETTIMEOUT =====
// setTimeout, bir fonksiyonu belirtilen gecikmeden sonra çalıştırır.
// Sözdizimi: setTimeout(() => {}, ms)
// Arka Plan: Asenkron, tek seferlik görevler için.

// Örnek: Gecikmeli bildirim (Gerçek Hayat: Kullanıcı uyarısı)
interface Bildirim {
    mesaj: string;
}

const bildirim: Bildirim = {mesaj: "Hoş geldiniz!"};
setTimeout(() => {
    console.log("Bildirim:", bildirim.mesaj);
}, 1000); // 1 saniye sonra çalışır

// 📌 Neden Önemli? Kullanıcı deneyimi için gecikmeli işlemler.
// 📌 Mülakat İpucu: “setTimeout ile asenkron görev zamanlarım.”

// ===== BÖLÜM 2: MATH =====
// Math, matematiksel işlemler için built-in bir nesnedir.
// Arka Plan: Rastgele sayı, yuvarlama, trigonometri gibi işlemler.

// Örnek 1: Rastgele proje ID (Gerçek Hayat: Benzersiz ID)
function projeIdUret(): string {
    const rastgele = Math.floor(Math.random() * 10000);
    return `P-${rastgele}`;
}

console.log("Proje ID:", projeIdUret()); // Örn: P-5423

// Örnek 2: Yuvarlama (Gerçek Hayat: Fiyat hesaplama)
interface Siparis {
    tutar: number;
}

const siparis: Siparis = {tutar: 99.567};
const yuvarlanmis = Math.round(siparis.tutar);
console.log("Yuvarlanmış tutar:", yuvarlanmis); // 100

// 📌 Neden Önemli? Veri işleme ve hesaplama için temel.
// 📌 Mülakat İpucu: “Math.random ile rastgele ID üretirim.”

// ===== BÖLÜM 3: DATE =====
// Date, tarih ve saat işlemlerini yönetir.
// Sözdizimi: new Date()
// Arka Plan: Zaman damgası, formatlama, karşılaştırma için.

// Örnek 1: Proje son teslim (Gerçek Hayat: Zaman takibi)
interface Proje {
    id: string;
    sonTarih: Date;
}

const proje: Proje = {id: "p1", sonTarih: new Date("2025-06-01")};
const simdi = new Date();
const kalanGun = Math.floor((proje.sonTarih.getTime() - simdi.getTime()) / (1000 * 60 * 60 * 24));
console.log("Kalan gün:", kalanGun); // Örn: 15

// Örnek 2: Zaman damgası (Gerçek Hayat: Loglama)
const logZamani = new Date().toISOString();
console.log("Log zamanı:", logZamani); // Örn: 2025-05-16T09:52:00.000Z

// 📌 Neden Önemli? Tarih bazlı işlemler için olmazsa olmaz.
// 📌 Mülakat İpucu: “Date ile son teslim tarihi hesaplarım.”

// ===== BÖLÜM 4: SETINTERVAL =====
// setInterval, bir fonksiyonu belirli aralıklarla tekrar çalıştırır.
// Sözdizimi: setInterval(() => {}, ms)
// Arka Plan: Sürekli güncellenen veriler için.

// Örnek: Canlı proje durumu (Gerçek Hayat: Dashboard güncelleme)
interface Durum {
    projeId: string;
    ilerleme: number;
}

const durum: Durum = {projeId: "p1", ilerleme: 0};
const intervalId = setInterval(() => {
    durum.ilerleme = Math.min(durum.ilerleme + 10, 100);
    console.log(`Proje ${durum.projeId} ilerleme: ${durum.ilerleme}%`);
    if (durum.ilerleme === 100) {
        clearInterval(intervalId); // Durdur
    }
}, 1000); // Her saniye

// 📌 Neden Önemli? Canlı veriler ve periyodik görevler için ideal.
// 📌 Mülakat İpucu: “setInterval ile dashboard’u güncellerim.”


// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. setTimeout: Gecikmeli tek seferlik görevler.
// 2. Math: Matematiksel işlemler (random, round).
// 3. Date: Tarih ve zaman yönetimi.
// 4. setInterval: Periyodik görevler.

// MÜLAKAT SORULARI:
// - setTimeout ile setInterval farkı? (Tek seferlik vs. tekrarlı.)
// - Math.random nasıl güvenli kullanılır? (Math.floor ile.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: setInterval’ı durdurmamak.
//   **Çözüm**: clearInterval kullan.
// - **Hata**: Date’te yanlış zaman dilimi.
//   **Çözüm**: toISOString veya UTC kullan.
// 📌 Not: Gerçek hayat uygulamasını detaylı tuttum, 140 satır oldu, kritik noktalar korundu!