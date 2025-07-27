// @ts-nocheck
// ========================= ORTA SEVİYE JS OBJE REHBERİ =========================
// Her konunun üstünde sade bir açıklama var. Baştan sona oku ve her satırı test et.

// 🔸 1. Obje Oluşturma ve Metot Tanımlama
const kullanici = {
  ad: "Ali",
  yas: 28,
  adres: {
    sehir: "İstanbul",
    ilce: "Kadıköy"
  },
  girisYap() {
    return `${this.ad} giriş yaptı.`;
  }
};

// 🔸 2. CRUD İşlemleri (Create - Read - Update - Delete)
kullanici.email = "ali@mail.com";       // ➕ Create
console.log(kullanici.ad);              // ✅ Read
kullanici.yas = 29;                     // 🔄 Update
delete kullanici.email;                // ❌ Delete

// 🔸 3. Destructuring (Verileri parçalayıp değişkenlere atama)
const { ad, yas, adres: { sehir } } = kullanici;
console.log(ad, yas, sehir); // Ali 29 İstanbul

// 🔸 4. Spread Operatörü: Obje kopyalama ve üzerine yazma
const yeniKullanici = {
  ...kullanici,
  abonelik: "Premium",
  yas: 30 // üzerine yazıldı
};
console.log(yeniKullanici);

// 🔸 5. Rest Operatörü: Belirli özellik dışında geri kalanları alma
const { girisYap, ...kalanBilgi } = yeniKullanici;
console.log(kalanBilgi); // girisYap fonksiyonu hariç tüm özellikler

// 🔸 6. Object Metotları (yerleşik JS fonksiyonları)
console.log(Object.keys(kullanici));        // ['ad', 'yas', 'adres', 'girisYap']
console.log(Object.values(kullanici));      // ['Ali', 29, {...}, ƒ]
console.log(Object.entries(kullanici));     // [['ad', 'Ali'], ['yas', 29], ...]
console.log(kullanici.hasOwnProperty("ad")); // true

// 🔸 7. JSON İşlemleri: Objeyi string'e çevirme ve geri alma
const json = JSON.stringify(kullanici);     // Objeyi JSON string yap
const objeyeDonus = JSON.parse(json);       // Tekrar objeye çevir
console.log(objeyeDonus);

// 🔸 8. Derin Kopyalama (iç içe objeleri bozma)
const guncelAdresli = {
  ...kullanici,
  adres: {
    ...kullanici.adres,
    ilce: "Üsküdar" // sadece ilce değişti, diğerleri korundu
  }
};
console.log(guncelAdresli);

// 🔸 9. Object Koruma: seal (özellik eklenemez, silinemez ama değiştirilebilir)
Object.seal(kullanici);
kullanici.yas = 31;          // değişir
kullanici.yeniAlan = true;   // eklenmez
delete kullanici.ad;         // silinmez
console.log(kullanici);

// 🔸 10. Mini Veri Yönetim Sistemi (CRUD örneği)
const veriYonetimi = {
  veriler: [],
  ekle(id, ad) {
    this.veriler.push({ id, ad });
  },
  sil(id) {
    this.veriler = this.veriler.filter(v => v.id !== id);
  },
  guncelle(id, yeniAd) {
    const veri = this.veriler.find(v => v.id === id);
    if (veri) veri.ad = yeniAd;
  },
  listele() {
    return this.veriler;
  }
};

veriYonetimi.ekle(1, "Dosya A");
veriYonetimi.guncelle(1, "Dosya A1");
veriYonetimi.sil(2); // olmayanı silmek sorun çıkarmaz
console.log(veriYonetimi.listele()); // [{ id: 1, ad: 'Dosya A1' }]
