// @ts-nocheck
// ========================= ASYNC/AWAIT SIFIRDAN ORTA SEVİYE =========================//

/*
JavaScript'te bazı işlemler hemen bitmez:
- API çağrısı
- Dosya okuma
- Timer
Bunlar "asenkron" işlemlerdir. Async/await bunları senkron gibi yazmamızı sağlar.
*/

// --- 1️⃣ Basit async/await mantığı ---
async function basitOrnek() {
    console.log("1: Başladı");

    // Promise ile simülasyon (1 saniye sonra sonuç)
    const sonuc = await new Promise<string>(resolve =>
        setTimeout(() => resolve("2: Sonuç geldi"), 1000)
    );

    console.log(sonuc);
    console.log("3: Bitti");
}
basitOrnek();

/*
Mantık:
- async fonksiyon → Promise döndürür
- await → Promise çözülene kadar bekler, kod akışı burada durur
*/

// --- 2️⃣ Hata yönetimi ---
async function hataOrnek() {
    try {
        const sonuc = await new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error("Oops! Hata oluştu")), 500)
        );
        console.log(sonuc); // çalışmaz
    } catch (e: any) {
        console.log("Hata yakalandı:", e.message);
    }
    console.log("Hata örneği bitti");
}
hataOrnek();

// --- 3️⃣ Sıralı (bağımlı) async işlemler ---
interface Kullanici { id: string; ad: string; rol?: string }
interface Proje { id: string; ad: string; tamam: boolean }

async function kullaniciGetir(id: string): Promise<Kullanici> {
    return new Promise(resolve => setTimeout(() => resolve({ id, ad: "Ali", rol: "Geliştirici" }), 500));
}

async function projeGetir(id: string): Promise<Proje> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === "p2") reject(new Error("Proje bulunamadı"));
            else resolve({ id, ad: `Proje ${id}`, tamam: Math.random() > 0.5 });
        }, 500);
    });
}

async function siraliAkis() {
    console.log("Sıralı akış başladı");

    const kullanici = await kullaniciGetir("u1"); // önce kullanıcı
    const proje = await projeGetir("p1");       // sonra proje

    console.log("Kullanıcı:", kullanici);
    console.log("Proje:", proje);

    console.log("Sıralı akış bitti");
}
siraliAkis();

// --- 4️⃣ Paralel (bağımsız) async işlemler ---
async function paralelAkis() {
    console.log("Paralel akış başladı");

    // Bağımsız işlemleri aynı anda başlat → Promise.all
    const [kullanici, proje] = await Promise.all([
        kullaniciGetir("u2"),
        projeGetir("p3").catch(() => ({ id: "p3", ad: "Bilinmiyor", tamam: false }))
    ]);

    console.log("Kullanıcı ve proje:", { kullanici, proje });
    console.log("Paralel akış bitti");
}
paralelAkis();

// --- 5️⃣ Koşullu spread ve rapor örneği ---
async function sistemRaporu(projeIds: string[]) {
    const rapor: any[] = [];

    for (const pId of projeIds) {
        try {
            // Önce proje → sıralı
            const proje = await projeGetir(pId).catch(() => ({ id: pId, ad: "Bilinmiyor", tamam: false }));

            // Sonra kullanıcı
            const kullanici = await kullaniciGetir("u1");

            // Koşullu spread → tamam ise durum ekle
            const projeBilgi = {
                ...proje,
                ...(proje.tamam && { durum: "Tamamlandı" }),
                yonetici: kullanici.ad
            };

            rapor.push(projeBilgi);
        } catch (e: any) {
            rapor.push({ projeId: pId, hata: e.message });
        }
    }

    return rapor;
}

// --- Çalıştır ---
(async () => {
    const rapor = await sistemRaporu(["p1", "p2", "p3"]);
    console.log("Sistem raporu:", rapor);
})();

/*
Özet Mantık:
1️⃣ async → fonksiyon Promise döndürür
2️⃣ await → Promise çözülene kadar bekler
3️⃣ try/catch → hataları yakalar
4️⃣ Sıralı akış → bağımlı işlemleri sırayla yap
5️⃣ Paralel akış → bağımsız işlemleri Promise.all ile hızlandır
6️⃣ Koşullu spread → sadece gerektiğinde key ekle
7️⃣ Kod okunaklı ve kontrol edilebilir
*/
