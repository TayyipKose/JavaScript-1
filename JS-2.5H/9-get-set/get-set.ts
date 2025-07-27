// @ts-nocheck
// ✅ GETTER & SETTER: GERÇEKÇİ, KISA, SADE ÖRNEK

class Personel {
    constructor(isim, maas) {
        this.isim = isim;
        this._maas = maas < 22000 ? 22000 : maas; // Asgari maaş 22000 ₺
    }

    get maas() {
        return `${this._maas.toLocaleString("tr-TR")} ₺`;
    }

    set maas(yeniMaas) {
        if (yeniMaas >= this._maas) {
            this._maas = yeniMaas;
        } else {
            console.log(`Uyarı: Maaş düşürülemez! Şu anki maaş: ${this._maas} ₺`);
        }
    }

    zamYap(orani) {
        const yeniMaas = this._maas * (1 + orani / 100);
        this.maas = Math.floor(yeniMaas); // setter'ı tetikler
    }
}

//Kullanım
const personeller = [
    new Personel("Ali", 7000),
    new Personel("Ayşe", 9000),
    new Personel("Mehmet", 8500),
];

// Tüm personel maaşlarını yazdır
personeller.forEach(p => {
    console.log(`${p.isim} - ${p.maas}`);
});

//📊 Toplam Maaş Gideri (reduce ile)
const toplamGider = personeller.reduce((toplam, p) => {
    // String ₺'li değeri sayıya çevireceğiz
    const sayisalMaas = parseInt(p.maas.replace(/\D/g, ""));
    return toplam + sayisalMaas;
}, 0);
console.log(`Toplam maaş gideri: ${toplamGider.toLocaleString("tr-TR")} ₺`);


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