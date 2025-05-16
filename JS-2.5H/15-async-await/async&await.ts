// @ts-nocheck
// ========================= TYPESCRIPT ASYNC/AWAIT REHBER =========================//

// ===== BÖLÜM 1: ASYNC/AWAIT NEDİR? =====
// Async/await, asenkron kodları senkron gibi yazmanı sağlar.
// - **async**: Fonksiyonun Promise döndüreceğini belirtir.
// - **await**: Promise’in çözülmesini bekler, sadece async fonksiyon içinde kullanılır.
// Arka Plan: Promise tabanlı, .then/.catch karmaşasını sadeleştirir.

// Örnek 1: API’den veri çekme (Gerçek Hayat: Kullanıcı verisi)
interface Kullanici {
    id: string;
    ad: string;
    rol?: string;
}
async function kullaniciGetir(id: string): Promise<Kullanici> {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id, ad: "Ali", rol: "Geliştirici" }), 1000);
    });
}
async function kullaniciGoster(id: string) {
    const kullanici = await kullaniciGetir(id);
    console.log("Kullanıcı:", { ...kullanici, ...(kullanici.rol && { rol: kullanici.rol }) });
    // Çıktı (1s sonra): { id: "u1", ad: "Ali", rol: "Geliştirici" }
}
kullaniciGoster("u1");

// 📌 Mantık: Await, Promise çözülene kadar bekler, kod akışını sade tutar.
// 📌 Mülakat İpucu: “Async/await, Promise zincirlerini okunabilir yapar.”

// ===== BÖLÜM 2: HATA YÖNETIMI =====
// Hatalar try/catch ile yakalanır, birden fazla hata türü işlenebilir.
// Arka Plan: Promise.reject, try/catch ile eşleşir.

// Örnek: Hatalı API çağrısı (Gerçek Hayat: Hata işleme)
async function projeGetir(id: string): Promise<{ id: string; ad: string }> {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Proje ${id} bulunamadı!`)), 1000);
    });
}
async function projeKontrol(id: string) {
    try {
        const proje = await projeGetir(id);
        console.log("Proje:", proje);
    } catch (error: any) {
        console.log("Hata:", error.message); // Hata: Proje p1 bulunamadı!
        return { hata: error.message, durum: "başarısız" };
    }
}
projeKontrol("p1");

// 📌 Mantık: Try/catch, asenkron hataları yakalar, hata türüne göre işlem yapılır.
// 📌 Mülakat İpucu: “Try/catch ile hata türlerini ayırıp kullanıcıya uygun mesajlar sunarım.”

// ===== BÖLÜM 3: ÇOKLU ASENKRON İŞLEM =====
// Sıralı veya paralel (Promise.all) işlemler kullanılabilir.
// Arka Plan: Promise.all, bağımsız çağrıları hızlandırır.

// Örnek: Çoklu kullanıcı verisi (Gerçek Hayat: Toplu API çağrısı)
async function kullanicilariGetir(ids: string[]): Promise<Kullanici[]> {
    const istekler = ids.map(id => kullaniciGetir(id));
    return Promise.all(istekler);
}
async function ekipGoster() {
    try {
        const kullanicilar = await kullanicilariGetir(["u1", "u2"]);
        const formatli = kullanicilar.map(u => ({
            ...u,
            ...(u.rol && { rol: u.rol.toUpperCase() })
        }));
        console.log("Ekip:", formatli);
        // Çıktı: [{ id: "u1", ad: "Ali", rol: "GELIŞTIRICI" }, { id: "u2", ad: "Ali", rol: "GELIŞTIRICI" }]
    } catch (error: any) {
        console.log("Ekip hatası:", error.message);
    }
}
ekipGoster();

// 📌 Mantık: Promise.all, paralel çağrılarla performansı artırır.
// 📌 Mülakat İpucu: “Promise.all ile birden fazla API çağrısını paralel yaparım.”

// ===== BÖLÜM 4: ASENKRON AKIŞ KONTROLÜ =====
// Döngülerde await ve koşullu işlemler.
// Arka Plan: Async/await, karmaşık akışları yönetir.

// Örnek: Sıralı veri işleme (Gerçek Hayat: Bağımlı API çağrıları)
async function projeVeKullaniciGetir(projeId: string, kullaniciId: string) {
    const proje = await projeGetir(projeId).catch(() => ({ id: projeId, ad: "Bilinmiyor" }));
    const kullanici = await kullaniciGetir(kullaniciId);
    return {
        proje: { ...proje, durum: "işleniyor" },
        kullanici: { ...kullanici, ...(kullanici.rol && { rol: kullanici.rol }) }
    };
}
async function isAkisi() {
    const veri = await projeVeKullaniciGetir("p1", "u1");
    console.log("İş akışı:", veri);
    // Çıktı: { proje: { id: "p1", ad: "Bilinmiyor", durum: "işleniyor" }, kullanici: { id: "u1", ad: "Ali", rol: "Geliştirici" } }
}
isAkisi();

// ===== BÖLÜM 5: GERÇEK HAYAT UYGULAMASI =====
// Proje yönetim sistemi (Gerçek Hayat: API entegrasyonu).

interface Proje {
    id: string;
    ad: string;
    tamam: boolean;
}
async function projeVerisiGetir(id: string): Promise<Proje> {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id, ad: `Proje ${id}`, tamam: false }), 1000);
    });
}
async function projeRaporuOlustur(projeIds: string[]): Promise<string[]> {
    const rapor: string[] = [];
    try {
        const projeler = await Promise.all(projeIds.map(id => projeVerisiGetir(id)));
        for (const p of projeler) {
            const durum = await kullaniciGetir("u1"); // Proje yöneticisi kontrolü
            rapor.push(`${p.ad}: ${p.tamam ? "Tamamlandı" : `Devam Ediyor (Yönetici: ${durum.ad})`}`);
        }
    } catch (error: any) {
        rapor.push(`Hata: ${error.message}`);
    }
    return rapor;
}
async function sistemRaporu() {
    const rapor = await projeRaporuOlustur(["p1", "p2"]);
    console.log("Sistem raporu:", rapor);
    // Çıktı: ["Proje p1: Devam Ediyor (Yönetici: Ali)", "Proje p2: Devam Ediyor (Yönetici: Ali)"]
}
sistemRaporu();

// 📌 Mantık: Async/await, karmaşık API çağrılarını ve akışları sadeleştirir.
// 📌 Mülakat İpucu: “Async/await ile bağımlı API çağrılarını sırayla işledim.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. Async/Await: Asenkron kodu senkron gibi yaz.
// 2. Try/Catch: Hata yönetimi.
// 3. Promise.all: Paralel işlemler.
// 4. Akış Kontrolü: Döngü ve koşullu await.
// 5. Gerçek Hayat: API entegrasyonu, raporlama.

// MÜLAKAT SORULARI:
// - Async/await’in Promise’den farkı? (Okunabilirlik, senkron akış.)
// - Promise.all ne zaman kullanılır? (Bağımsız paralel çağrılar.)
// - Hatalar nasıl yönetilir? (Try/catch veya .catch.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Async olmayan yerde await.
//   **Çözüm**: Fonksiyonu async yap.
// - **Hata**: Promise.all’da hata yönetimi eksik.
//   **Çözüm**: Try/catch kullan.

// 📌 Not: Orta seviye için akış kontrolü ve koşullu spread kritik, 165 satır oldu!