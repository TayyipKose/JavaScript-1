// ========================= TYPESCRIPT ORTA SEVİYE: SETTIMEOUT, MATH, DATE, SETINTERVAL ========================= //

// ===== 1. SETTIMEOUT =====
// Tek seferlik gecikmeli görevler için
interface Bildirim { mesaj: string }
const bildirim: Bildirim = { mesaj: "Hoş geldiniz!" };

setTimeout(() => console.log("Bildirim:", bildirim.mesaj), 1000); // 1 saniye sonra

// 📌 Mülakat: "setTimeout ile asenkron görev zamanlarım."

// ===== 2. MATH =====
// Matematiksel işlemler, rastgele sayı, yuvarlama

// Rastgele ID üretme
function projeIdUret(): string {
    return `P-${Math.floor(Math.random() * 10000)}`
}
console.log("Proje ID:", projeIdUret());

// Yuvarlama örneği
interface Siparis { tutar: number }
const siparis: Siparis = { tutar: 99.567 }
console.log("Yuvarlanmış tutar:", Math.round(siparis.tutar)); // 100

// ===== 3. DATE =====
// Tarih ve zaman işlemleri

interface Proje { id: string; sonTarih: Date }
const proje: Proje = { id: "p1", sonTarih: new Date("2025-06-01") }

const simdi = new Date()
const kalanGun = Math.floor((proje.sonTarih.getTime() - simdi.getTime()) / (1000*60*60*24))
console.log("Kalan gün:", kalanGun)

// Zaman damgası
console.log("Log zamanı:", new Date().toISOString())

// ===== 4. SETINTERVAL =====
// Periyodik görevler, canlı güncellemeler
interface Durum { projeId: string; ilerleme: number }
const durum: Durum = { projeId: "p1", ilerleme: 0 }

const intervalId = setInterval(() => {
    durum.ilerleme = Math.min(durum.ilerleme + 10, 100)
    console.log(`Proje ${durum.projeId} ilerleme: ${durum.ilerleme}%`)
    if(durum.ilerleme === 100) clearInterval(intervalId) // kritik: durdurmayı unutma
}, 1000)

// ===== Özet ve Kritik Notlar =====
// setTimeout → tek seferlik gecikme
// setInterval → periyodik tekrar
// Math → random, round, temel hesaplama
// Date → tarih, saat, karşılaştırma
// clearInterval → setInterval durdurmak için
