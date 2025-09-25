// @ts-nocheck
// ========================= ASYNC/AWAIT: SIFIRDAN ORTA SEVİYE REHBER =========================//

/*
JavaScript'te bazı işlemler hemen bitmez:
- API çağrısı
- Dosya okuma
- Timer
Bunlar "asenkron" işlemlerdir. Async/await, bu işlemleri senkron gibi yazmamızı sağlar.
*/

// ===== 1️⃣ Temel Mantık =====
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
🔑 Kritikler:
- async fonksiyon → Promise döndürür.
- await → Promise çözülene kadar bekler, kod akışı burada durur.
- await sadece async fonksiyon içinde çalışır.
- Eğer await edilmezse Promise direkt döner.
*/

// ===== 2️⃣ Hata Yönetimi =====
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

/*
🔑 Kritikler:
- try/catch → asenkron hataları yakalar.
- await edilen Promise reject olursa catch bloğu çalışır.
- Hata yönetimi mülakatlarda **kritik** sorulur.
*/

// ===== 3️⃣ Sıralı Async İşlemler (Bağımlı) =====
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

/*
🔑 Kritikler:
- await sıralı kullanıldığında işlemler birbiri bitmeden diğerine geçmez → yavaş olabilir.
- Bağımlı işlemler için ideal (birinin sonucuna diğer işlem ihtiyaç duyuyor).
*/

// ===== 4️⃣ Paralel Async İşlemler (Bağımsız) =====
async function paralelAkis() {
    console.log("Paralel akış başladı");

    const [kullanici, proje] = await Promise.all([
        kullaniciGetir("u2"),
        projeGetir("p3").catch(() => ({ id: "p3", ad: "Bilinmiyor", tamam: false }))
    ]);

    console.log("Kullanıcı ve proje:", { kullanici, proje });
    console.log("Paralel akış bitti");
}
paralelAkis();

/*
🔑 Kritikler:
- Promise.all → bağımsız işlemleri aynı anda başlatır → hız kazandırır.
- reject olan bir Promise'i catch ile yakalamak önemli, yoksa tüm Promise.all fail olur.
- Mülakat sorusu: "Sıralı mı paralel mi? Neden?" → bağımlı/senaryo mantığı açıklanmalı.
*/

// ===== 5️⃣ Koşullu Spread ve Rapor Örneği =====
async function sistemRaporu(projeIds: string[]) {
    const rapor: any[] = [];

    for (const pId of projeIds) {
        try {
            const proje = await projeGetir(pId).catch(() => ({ id: pId, ad: "Bilinmiyor", tamam: false }));
            const kullanici = await kullaniciGetir("u1");

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

(async () => {
    const rapor = await sistemRaporu(["p1", "p2", "p3"]);
    console.log("Sistem raporu:", rapor);
})();

/*
========================= MÜLAKAT NOTLARI =========================
1️⃣ async fonksiyon = her zaman Promise döndürür.
2️⃣ await = Promise çözülene kadar bekler, sadece async içinde çalışır.
3️⃣ try/catch = async hataları yakalamak için kritik.
4️⃣ Sıralı akış = bağımlı işlemler için, yavaş ama güvenli.
5️⃣ Paralel akış = bağımsız işlemler için hızlı, Promise.all kullan.
6️⃣ Hata yönetimi = reject olan Promise'leri catch ile handle et.
7️⃣ Kod okunaklı olmalı → karmaşık callback yerine async/await.
8️⃣ Mülakat sorusu ipucu:
   - "await neden kullanılır?" → senkron gibi kod yazmak, hata yönetimi.
   - "Sıralı ve paralel farkı?" → performans ve bağımlılık mantığı.
   - "Promise.all ile hata yakalamak?" → reject tek Promise tüm Promise.all’ı bozabilir.
*/
