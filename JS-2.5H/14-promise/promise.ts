// @ts-nocheck
// ========================= TYPESCRIPT PROMISE: ORTA-İLERI SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te Promise’leri orta seviye bir geliştirici için derinlemesine öğretir.
// Mülakat için mantık, arka plan, akış, ileri teknikler ve gerçek hayat senaryoları içerir.

// ===== BÖLÜM 1: PROMISE NEDİR? =====
// Promise, asenkron bir işlemin sonucunu temsil eder (resolve: başarı, reject: hata).
// Sözdizimi: new Promise((resolve, reject) => {})
// Arka Plan: Event loop ve microtask queue ile çalışır, zincirleme yönetilir.

// Örnek 1: Basit Promise (Gerçek Hayat: API çağrısı)
function kullaniciGetir(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id ? resolve({ id, ad: "Ali" }) : reject(new Error("Geçersiz ID"));
        }, 1000);
    });
}
kullaniciGetir("u1")
    .then(u => console.log("Kullanıcı:", { ...u, rol: "Geliştirici" }))
    .catch(err => console.error("Hata:", err.message))
    .finally(() => console.log("İşlem tamamlandı."));
// Çıktı: Kullanıcı: { id: "u1", ad: "Ali", rol: "Geliştirici" }, İşlem tamamlandı.

// 📌 Mantık: Promise, asenkron sonucu microtask queue ile işler.
// 📌 Mülakat İpucu: “Promise’ler, event loop’un microtask’larında çalışır.”

// ===== BÖLÜM 2: ZINCIRLEME VE HATA YÖNETIMI =====
// Then zincirleri dönüş değerleriyle devam eder, hatalar catch ile yakalanır.
// Arka Plan: Her then, yeni bir Promise döner.

// Örnek: Veri dönüşümü (Gerçek Hayat: Profil güncelleme)
function profilGetir(k: any): Promise<any> {
    return new Promise(resolve => {
        setTimeout(() => resolve({ ...k, rol: "Admin" }), 1000);
    });
}
kullaniciGetir("u1")
    .then(u => profilGetir(u))
    .then(p => console.log("Profil:", { ...p, ...(p.rol && { rol: p.rol.toUpperCase() }) }))
    .catch(err => console.error("Zincir hatası:", err.message));
// Çıktı: Profil: { id: "u1", ad: "Ali", rol: "ADMIN" }

// 📌 Mantık: Zincirleme, veri akışını sıralı yönetir, hata zincir sonuna kadar yakalanır.
// 📌 Mülakat İpucu: “Then zincirleriyle veri dönüşümünü sıralı yaparım.”

// ===== BÖLÜM 3: PROMISE.ALL VE PARALEL İŞLEMLER =====
// Promise.all, birden fazla Promise’i paralel çalıştırır, biri hata verirse reddedilir.
// Arka Plan: Performans için kritik.

// Örnek: Toplu kullanıcı (Gerçek Hayat: Çoklu API çağrısı)
function kullanicilariGetir(ids: any[]): Promise<any[]> {
    const istekler = ids.map((id: any) => kullaniciGetir(id));
    return Promise.all(istekler);
}
kullanicilariGetir(["u1", "u2"])
    .then(users => console.log("Kullanıcılar:", users.map((u: any) => ({ ...u, aktif: true }))))
    .catch(err => console.error("Toplu hata:", err.message));
// Çıktı: Kullanıcılar: [{ id: "u1", ad: "Ali", aktif: true }, { id: "u2", ad: "Ali", aktif: true }]

// 📌 Mantık: Promise.all, paralel çağrıları hızlandırır, hata hemen catch’e düşer.
// 📌 Mülakat İpucu: “Promise.all ile API çağrılarını optimize ederim.”

// ===== BÖLÜM 4: PROMISE.RACE VE İLERI TEKNIKLER =====
// Promise.race, ilk tamamlanan Promise’in sonucunu döner.
// Arka Plan: Zaman aşımı veya yarış senaryoları için.

// Örnek: İlk cevap veren API (Gerçek Hayat: Hızlı yanıt)
function yavasAPI(): Promise<any> {
    return new Promise(resolve => setTimeout(() => resolve("Yavaş cevap"), 2000));
}
function hizliAPI(): Promise<any> {
    return new Promise(resolve => setTimeout(() => resolve("Hızlı cevap"), 1000));
}
Promise.race([hizliAPI(), yavasAPI()])
    .then(cevap => console.log("İlk cevap:", cevap))
    .catch(err => console.error("Hata:", err.message));
// Çıktı: İlk cevap: Hızlı cevap

// Örnek: Zaman aşımı (Gerçek Hayat: API sınırlama)
function zamanAsimi(ms: number): Promise<never> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Zaman aşımı!")), ms));
}
Promise.race([kullaniciGetir("u1"), zamanAsimi(500)])
    .then(u => console.log("Hızlı kullanıcı:", u))
    .catch(err => console.error("Zaman aşımı hatası:", err.message));
// Çıktı: Zaman aşımı hatası: Zaman aşımı! (500ms < 1000ms)

// ===== BÖLÜM 5: GERÇEK HAYAT UYGULAMASI =====
// E-ticaret stok ve sipariş yönetimi (Gerçek Hayat: API entegrasyonu).

function stokGetir(urunId: any): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const stoklar = { "001": 10, "002": 0, "003": 5 };
            urunId in stoklar
                ? stoklar[urunId] > 0
                    ? resolve(stoklar[urunId])
                    : reject(new Error("Stok yok!"))
                : reject(new Error("Ürün bulunamadı!"));
        }, 1500);
    });
}
function siparisVer(urunId: any, adet: any): Promise<any> {
    return stokGetir(urunId)
        .then(stok => {
            if (stok >= adet) {
                return { mesaj: `${adet} adet sipariş alındı`, durum: "başarılı" };
            }
            throw new Error(`Yetersiz stok: ${stok} adet var`);
        })
        .then(result => ({ ...result, urunId, zaman: new Date().toISOString() }));
}
siparisVer("001", 3)
    .then(r => console.log("Sipariş:", r))
    .catch(err => console.error("Sipariş hatası:", err.message))
    .finally(() => console.log("Sipariş tamamlandı."));
// Çıktı: Sipariş: { mesaj: "3 adet sipariş alındı", durum: "başarılı", urunId: "001", zaman: "..." }, Sipariş tamamlandı.

// 📌 Mantık: Promise’ler, API çağrılarını ve zincirlemeyi yönetir.
// 📌 Mülakat İpucu: “Promise.race ile zaman aşımı kontrolü yaptım.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. Promise: Asenkron işlem yönetimi.
// 2. Then/Catch: Zincirleme ve hata yakalama.
// 3. Promise.all: Paralel işlemler.
// 4. Promise.race: İlk tamamlanan veya zaman aşımı.
// 5. Gerçek Hayat: API, stok, sipariş.

// MÜLAKAT SORULARI:
// - Promise.all ile Promise.race farkı? (All hepsini bekler, race ilkini alır.)
// - Microtask queue nedir? (Promise’ler callback’lerden önce çalışır.)


// 📌 Not: Promise.race ve koşullu spread kritik, 165 satır oldu!