// ========================= GETTER/SETTER SIFIRDAN ÖĞRETİCİ ÖRNEK =========================
//@ts-nocheck

// --- GETTER/SETTER MANTIĞI ---
// 1. **Getter**: Veriyi okumak için. Ör: Kitap fiyatını formatla (10 → "10 ₺").
// 2. **Setter**: Veriyi güncellemek için. Ör: Fiyatı kontrol et, negatif olmasın.
// 3. **Kapsülleme**: Veriyi (_fiyat) korur, dışarıdan doğrudan erişimi engeller.
// 4. **Spread (...)**: Veriyi kopyalar, güvenli güncelleme yapar.
// 5. **Rest (...)**: Birden çok veriyi toplar (ör. birden çok kitap ekleme).
// 6. **Hatalar**:
//    - Getter'da orijinal veriyi döndürme (kopya dön).
//    - Setter'da doğrulama yapmama (her zaman kontrol et).
// 7. **Gerçek hayatta**: Form doğrulama, sepet yönetimi, kullanıcı ayarları.

// --- SINIF: Kitap ---
class Kitap {
    private _id: string; // Private: Doğrudan erişimi engelle
    private _baslik: string;
    private _fiyat: number;

    constructor(id: string, baslik: string, fiyat: number) {
        this._id = id;
        this._baslik = baslik;
        this._fiyat = fiyat < 5 ? 5 : fiyat; // Minimum 5 ₺
    }

    // GETTER: Fiyatı formatlı oku
    get fiyat(): string {
        return `${this._fiyat.toLocaleString("tr-TR")} ₺`; // Ör: "10 ₺"
    }

    // SETTER: Fiyatı güncelle, doğrulama yap
    set fiyat(yeniFiyat: number) {
        if (yeniFiyat >= 5) {
            this._fiyat = yeniFiyat;
            console.log(`${this._baslik} fiyatı güncellendi: ${this.fiyat}`);
        } else {
            console.log(`Hata: Fiyat 5 ₺'den düşük olamaz! Şu anki: ${this.fiyat}`);
        }
    }

    // GETTER: Kitap bilgisini kopya olarak dön (immutable)
    get bilgi(): object {
        return { ...{ id: this._id, baslik: this._baslik, fiyat: this._fiyat } }; // Spread ile kopya
    }

    // SETTER: Başlığı güncelle, doğrulama yap
    set baslik(yeniBaslik: string) {
        if (yeniBaslik.trim()) {
            this._baslik = yeniBaslik;
            console.log(`Başlık güncellendi: ${this._baslik}`);
        } else {
            console.log("Hata: Başlık boş olamaz!");
        }
    }
}

// --- SINIF: Kütüphane (Kitapları yönetir) ---
class Kutuphane {
    private _kitaplar: Kitap[] = [];

    // GETTER: Kitapları kopya olarak dön
    get kitaplar(): Kitap[] {
        return [...this._kitaplar]; // Spread ile kopya, immutability
    }

    // SETTER: Yeni kitap ekle (rest ile birden çok kitap)
    set ekle(...yeniKitaplar: Kitap[]) {
        this._kitaplar.push(...yeniKitaplar); // Rest ile toplar, spread ile ekler
        console.log(`${yeniKitaplar.length} kitap eklendi.`);
    }

    // Toplam fiyatı hesapla (reduce ile)
    get toplamFiyat(): string {
        const toplam = this._kitaplar.reduce((toplam, kitap) => {
            const sayisalFiyat = parseInt(kitap.fiyat.replace(/\D/g, "")) || 0;
            return toplam + sayisalFiyat;
        }, 0);
        return `${toplam.toLocaleString("tr-TR")} ₺`;
    }
}

// --- KULLANIM ---
const kutuphane = new Kutuphane();

// Kitaplar oluştur
const kitap1 = new Kitap("k1", "Sefiller", 10);
const kitap2 = new Kitap("k2", "1984", 8);
const kitap3 = new Kitap("k3", "Dune", 3); // Minimum 5 ₺ olacak

// Kitapları ekle (rest ile)
kutuphane.ekle = [kitap1, kitap2, kitap3];

// Kitapları yazdır
console.log("Kütüphane kitapları:", kutuphane.kitaplar.map(k => k.bilgi));

// Fiyat güncelleme (setter)
kitap1.fiyat = 15; // Başarılı
kitap1.fiyat = 2;  // Hata: Düşük
kitap2.baslik = "Yeni 1984"; // Başarılı
kitap2.baslik = ""; // Hata: Boş

// Toplam fiyat
console.log("Toplam kütüphane gideri:", kutuphane.toplamFiyat);

/*
--- ÇIKTI MANTIĞI ---
1. 3 kitap eklendi.
2. Kütüphane kitapları: [
   { id: "k1", baslik: "Sefiller", fiyat: 15 },
   { id: "k2", baslik: "Yeni 1984", fiyat: 8 },
   { id: "k3", baslik: "Dune", fiyat: 5 }
]
3. Sefiller fiyatı güncellendi: 15 ₺
4. Hata: Fiyat 5 ₺'den düşük olamaz! Şu anki: 15 ₺
5. Başlık güncellendi: Yeni 1984
6. Hata: Başlık boş olamaz!
7. Toplam kütüphane gideri: 28 ₺
*/

// --- ÖZET: NELER ÖĞRENDİK? ---
// 1. **Getter**: Veriyi okur, formatlar (fiyat → "10 ₺").
// 2. **Setter**: Veriyi günceller, doğrulama yapar (fiyat ≥ 5).
// 3. **Kapsülleme**: _id, _fiyat gibi veriler korunur.
// 4. **Spread**: Güvenli kopya için (bilgi, kitaplar getter'ları).
// 5. **Rest**: Esnek veri toplama (ekle setter'ı).
// 6. **Gerçek hayatta**: Form doğrulama, sepet yönetimi, ayarlar.

// --- İLERİ SEVİYE İPUÇLARI ---
// 1. **Async ile**: Async setter (ör. `async set fiyat`) API ile çalışır.
// 2. **Performans**: Getter'da ağır hesaplamadan kaçın.
// 3. **React**: State yönetiminde spread ile getter/setter benzeri yapı kullanılır.
// 4. **Hata**: Setter'da kontrol unutma, getter'da kopya dönmeyi atlama.
