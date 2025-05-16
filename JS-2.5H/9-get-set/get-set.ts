// @ts-nocheck
// ============================================== TYPESCRIPT GETTER & SETTER: ORTA SEVİYE REHBER ==============================================//

// Bu rehber, TypeScript'te getter ve setter kullanımını sade, temiz ve anlaşılır şekilde açıklıyor.
// Orta seviye mülakat bilgisi için tasarlandı. Her bölüm bir kavramı öğretir, örneklerle pekiştirir.

// ========== BÖLÜM 1: GETTER NEDİR? ==========
// Getter, bir özelliğin değerini güvenli ve kontrollü şekilde okumak için kullanılır.
// Normal bir özellik gibi erişilir, ama arka planda bir fonksiyon çalışır.

interface Veri {
    id: string;
    deger: string;
}

class VeriYonetimi {
    private _veriler: Veri[] = []; // Private: Dışarıdan doğrudan erişilemez

    // Getter: Verilerin kopyasını döner, orijinal korunur
    get veriler(): Veri[] {
        return [...this._veriler]; // Spread ile kopya döner (immutability)
    }
}

// Örnek Kullanım
const yonetim = new VeriYonetimi();
console.log(yonetim.veriler); // [] (Boş dizi)

// 📌 Neden Önemli? Getter, veriyi korur ve sadece okuma sağlar. Kopya döndürmek, orijinal verinin değişmesini engeller.

// ========== BÖLÜM 2: SETTER NEDİR? ==========
// Setter, bir özelliği kontrollü şekilde güncellemek için kullanılır.
// Atama gibi yazılır (`=`) ama doğrulama ve mantık içerir.

class VeriYonetimi {
    private _veriler: Veri[] = [];

    get veriler(): Veri[] {
        return [...this._veriler];
    }

    // Setter: Yeni veri ekler, doğrulama yapar
    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        this._veriler.push(yeniVeri);
        console.log(`${yeniVeri.deger} eklendi.`);
    }
}

// Örnek Kullanım
const yonetim2 = new VeriYonetimi();
yonetim2.ekle = { id: "v1", deger: "Veri 1" }; // 'Veri 1 eklendi'
yonetim2.ekle = { id: "", deger: "" }; // 'Hata: ID veya değer eksik!'
console.log(yonetim2.veriler); // [{ id: "v1", deger: "Veri 1" }]

// 📌 Neden Önemli? Setter, veri eklerken kontrol sağlar (örn. eksik veri engelleme).

// ========== BÖLÜM 3: KAPSÜLLEME (ENCAPSULATION) ==========
// Private değişkenler (_veriler) dışarıdan erişimi engeller.
// Getter ve setter ile kontrollü erişim sağlanır.

class VeriYonetimi {
    private _veriler: Veri[] = [];

    get veriler(): Veri[] {
        return [...this._veriler];
    }

    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        this._veriler.push(yeniVeri);
        console.log(`${yeniVeri.deger} eklendi.`);
    }

    // Getter: Toplam veri sayısını hesaplar
    get veriSayisi(): number {
        return this._veriler.length;
    }
}

// Örnek Kullanım
const yonetim3 = new VeriYonetimi();
yonetim3.ekle = { id: "v1", deger: "Veri 1" };
yonetim3.ekle = { id: "v2", deger: "Veri 2" };
console.log(yonetim3.veriSayisi); // 2
// yonetim3._veriler.push({ id: "v3", deger: "Hata" }); // Hata: _veriler private!

// 📌 Neden Önemli? Kapsülleme, veri güvenliğini artırır ve yanlış kullanımı önler.

// ========== BÖLÜM 4: SETTER İLE GÜNCELLEME VE DOĞRULAMA ==========
// Setter’lar, mevcut verileri güncellerken de kullanılabilir.
// Doğrulama ile hatalı güncellemeler engellenir.

class VeriYonetimi {
    private _veriler: Veri[] = [];

    get veriler(): Veri[] {
        return [...this._veriler];
    }

    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        this._veriler.push(yeniVeri);
        console.log(`${yeniVeri.deger} eklendi.`);
    }

    // Setter: Belirli bir veriyi günceller
    set guncelle({ id, deger }: { id: string; deger: string }) {
        const index = this._veriler.findIndex((veri) => veri.id === id);
        if (index < 0) {
            console.log(`Hata: ID ${id} bulunamadı!`);
            return;
        }
        if (!deger) {
            console.log("Hata: Yeni değer boş olamaz!");
            return;
        }
        this._veriler[index].deger = deger;
        console.log(`ID ${id} güncellendi: ${deger}`);
    }
}

// Örnek Kullanım
const yonetim4 = new VeriYonetimi();
yonetim4.ekle = { id: "v1", deger: "Veri 1" };
yonetim4.guncelle = { id: "v1", deger: "Güncel Veri" }; // 'ID v1 güncellendi: Güncel Veri'
yonetim4.guncelle = { id: "v2", deger: "Veri 2" }; // 'Hata: ID v2 bulunamadı!'
yonetim4.guncelle = { id: "v1", deger: "" }; // 'Hata: Yeni değer boş olamaz!'
console.log(yonetim4.veriler); // [{ id: "v1", deger: "Güncel Veri" }]

// 📌 Neden Önemli? Setter ile güncelleme, veri tutarlılığını korur ve hataları önler.

// ========== BÖLÜM 5: GETTER İLE HESAPLANAN DEĞERLER ==========
// Getter’lar, dinamik hesaplamalar için kullanılır (örn. toplamlar).

class VeriYonetimi {
    private _veriler: Veri[] = [];

    get veriler(): Veri[] {
        return [...this._veriler];
    }

    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        this._veriler.push(yeniVeri);
        console.log(`${yeniVeri.deger} eklendi.`);
    }

    // Getter: Verilerin uzunluk toplamını hesaplar
    get toplamUzunluk(): number {
        return this._veriler.reduce((sum, veri) => sum + veri.deger.length, 0);
    }
}

// Örnek Kullanım
const yonetim5 = new VeriYonetimi();
yonetim5.ekle = { id: "v1", deger: "Merhaba" }; // 7 harf
yonetim5.ekle = { id: "v2", deger: "Dünya" }; // 5 harf
console.log(yonetim5.toplamUzunluk); // 12 (Merhaba + Dünya)

// 📌 Neden Önemli? Getter’lar, veriye dayalı dinamik hesaplamaları kolaylaştırır.

// ========== BÖLÜM 6: VERİ SİLME VE ARRAY METOTLARI ==========
// Getter ve setter’larla birlikte array metotları (findIndex, splice) kullanılır.

class VeriYonetimi {
    private _veriler: Veri[] = [];

    get veriler(): Veri[] {
        return [...this._veriler];
    }

    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        this._veriler.push(yeniVeri);
        console.log(`${yeniVeri.deger} eklendi.`);
    }

    // Metot: Belirli bir veriyi siler
    sil(id: string): void {
        const index = this._veriler.findIndex((veri) => veri.id === id);
        if (index < 0) {
            console.log(`Hata: ID ${id} bulunamadı!`);
            return;
        }
        const silinen = this._veriler.splice(index, 1)[0];
        console.log(`${silinen.deger} silindi.`);
    }
}

// Örnek Kullanım
const yonetim6 = new VeriYonetimi();
yonetim6.ekle = { id: "v1", deger: "Veri 1" };
yonetim6.ekle = { id: "v2", deger: "Veri 2" };
yonetim6.sil("v1"); // 'Veri 1 silindi'
yonetim6.sil("v3"); // 'Hata: ID v3 bulunamadı!'
console.log(yonetim6.veriler); // [{ id: "v2", deger: "Veri 2" }]

// 📌 Neden Önemli? Array metotları, veri yönetimini güçlü ve esnek hale getirir.

// ========== BÖLÜM 7: TAM UYGULAMA ÖRNEĞİ ==========
// Tüm kavramları birleştiren bir veri yönetim sistemi.

class VeriYonetimi {
    private _veriler: Veri[] = [];

    // Getter: Verilerin kopyasını döner
    get veriler(): Veri[] {
        return [...this._veriler];
    }

    // Getter: Toplam veri sayısını döner
    get veriSayisi(): number {
        return this._veriler.length;
    }

    // Getter: Tüm değerlerin uzunluk toplamını döner
    get toplamUzunluk(): number {
        return this._veriler.reduce((sum, veri) => sum + veri.deger.length, 0);
    }

    // Setter: Yeni veri ekler
    set ekle(yeniVeri: Veri) {
        if (!yeniVeri.id || !yeniVeri.deger) {
            console.log("Hata: ID veya değer eksik!");
            return;
        }
        const index = this._veriler.findIndex((veri) => veri.id === yeniVeri.id);
        if (index >= 0) {
            this._veriler[index].deger = yeniVeri.deger;
            console.log(`${yeniVeri.deger} güncellendi.`);
        } else {
            this._veriler.push(yeniVeri);
            console.log(`${yeniVeri.deger} eklendi.`);
        }
    }

    // Setter: Veriyi günceller
    set guncelle({ id, deger }: { id: string; deger: string }) {
        const index = this._veriler.findIndex((veri) => veri.id === id);
        if (index < 0) {
            console.log(`Hata: ID ${id} bulunamadı!`);
            return;
        }
        if (!deger) {
            console.log("Hata: Yeni değer boş olamaz!");
            return;
        }
        this._veriler[index].deger = deger;
        console.log(`ID ${id} güncellendi: ${deger}`);
    }

    // Metot: Veriyi siler
    sil(id: string): void {
        const index = this._veriler.findIndex((veri) => veri.id === id);
        if (index < 0) {
            console.log(`Hata: ID ${id} bulunamadı!`);
            return;
        }
        const silinen = this._veriler.splice(index, 1)[0];
        console.log(`${silinen.deger} silindi.`);
    }
}

// Örnek Kullanım
const yonetim7 = new VeriYonetimi();
yonetim7.ekle = { id: "v1", deger: "Merhaba" }; // 'Merhaba eklendi'
yonetim7.ekle = { id: "v2", deger: "Dünya" }; // 'Dünya eklendi'
yonetim7.guncelle = { id: "v1", deger: "Selam" }; // 'ID v1 güncellendi: Selam'
yonetim7.sil("v2"); // 'Dünya silindi'
console.log("Veriler:", yonetim7.veriler); // [{ id: "v1", deger: "Selam" }]
console.log("Veri sayısı:", yonetim7.veriSayisi); // 1
console.log("Toplam uzunluk:", yonetim7.toplamUzunluk); // 5 (Selam)

// 📌 Neden Önemli? Bu yapı, getter/setter’ların gerçek dünyada veri yönetiminde nasıl kullanıldığını gösterir.

// ========== NOTLAR VE MÜLAKAT İPUÇLARI ==========
// ÖĞRENİLEN KAVRAMLAR
// --------------------
// 1. **Getter**: Veriyi okumak için (örn. `veriler`, `veriSayisi`). Dinamik hesaplamalar için ideal.
// 2. **Setter**: Veriyi güncellemek için (örn. `ekle`, `guncelle`). Doğrulama ile güvenli.
// 3. **Kapsülleme**: Private değişkenler (`_veriler`) ile veri korunur.
// 4. **Immutability**: Getter’larda kopya döndürmek (`[..._veriler]`) veriyi korur.
// 5. **Doğrulama**: Setter’larda hatalı girdiler engellenir (örn. boş değer).
// 6. **Array Metotları**: `findIndex`, `reduce`, `splice` veri yönetiminde sık kullanılır.

// YAYGIN MÜLAKAT SORULARI
// -----------------------
// - Getter ve setter arasındaki fark nedir? (Getter okur, setter yazar.)
// - Neden private değişken kullanırız? (Veri güvenliği ve kontrol için.)
// - Setter’da doğrulama nasıl yapılır? (Koşullarla, örneğin `if (!deger)`.)
// - Immutability neden önemlidir? (Verinin yanlışlıkla değişmesini önler.)

// YAYGIN HATALAR VE ÇÖZÜMLER
// --------------------------
// - **Hata**: Setter’ı fonksiyon gibi çağırmak (`yonetim.ekle({ id, deger })`).
//   **Çözüm**: Setter’lar atama ile çalışır: `yonetim.ekle = { id, deger }`.
// - **Hata**: Getter’da orijinal veriyi döndürmek.
//   **Çözüm**: Kopya dön (`[..._veriler]`).
// - **Hata**: Doğrulama yapmadan setter yazmak.
//   **Çözüm**: Her setter’da kontrol ekle (örn. `if (!id)`).

// MÜLAKAT İÇİN PRATİK İPUÇLARI
// ----------------------------
// - Getter/setter’ların gerçek dünyada veri yönetimi, form doğrulama veya sepet sistemlerinde kullanıldığını belirt.
// - Kapsüllemenin veri güvenliğini nasıl sağladığını açıkla.
// - Basit bir getter/setter örneği kodlayarak göster (yukarıdaki gibi).
// - `reduce` veya `findIndex` gibi array metotlarını nasıl kullandığını anlat.