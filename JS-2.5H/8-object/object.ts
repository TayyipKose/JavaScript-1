// @ts-nocheck
// ============================================== JAVASCRIPT OBJELER: ORTA SEVİYE REHBER ==============================================//


// ========== BÖLÜM 1: OBJE OLUŞTURMA (Literal Syntax ve Metotlar) ==========
// Objeler, anahtar-değer çiftlerini saklar. {} ile hızlıca obje oluşturulur.
// Özellikler ve metotlar (objenin içindeki fonksiyonlar) eklenebilir.

const urun = {
    id: 1,
    isim: 'Ürün A',
    fiyat: 100,
    stok: 50,
    // Metot: Objenin içinde tanımlı fonksiyon
    indirimYap(yuzde) {
        this.fiyat *= (1 - yuzde / 100); // 'this' objeyi işaret eder
        return `%${yuzde} indirim yapıldı. Yeni fiyat: ${this.fiyat}₺`;
    }
};
console.log(urun.isim); // 'Ürün A'
console.log(urun.indirimYap(20)); // '%20 indirim yapıldı. Yeni fiyat: 80₺'

// 📌 Neden Önemli? Obje oluşturma, verileri organize etmenin temel yoludur. Metotlar, objeye özgü işlemleri tanımlar.

// ========== BÖLÜM 2: CRUD İŞLEMLERİ (Oluşturma, Okuma, Güncelleme, Silme) ==========
// Objelerde Create, Read, Update, Delete işlemleri yapılabilir.

urun.kategori = 'Elektronik'; // Create: Yeni özellik ekleme
console.log(urun.kategori); // Read: Değer okuma -> 'Elektronik'
urun.fiyat = 120; // Update: Değer güncelleme
delete urun.stok; // Delete: Özellik silme
console.log(urun); // {id: 1, isim: 'Ürün A', fiyat: 120, kategori: 'Elektronik'}

// 📌 Neden Önemli? CRUD, obje verilerini yönetmenin temel yoludur.

// ========== BÖLÜM 3: SPREAD & REST OPERATÖRLERİ ==========
// Spread (...): Objenin özelliklerini kopyalar veya birleştirir.
// Rest (...): Kalan özellikleri toplar.

const guncelUrun = {
    ...urun, // Spread: urun'ün tüm özelliklerini kopyalar
    garanti: '2 Yıl', // Yeni özellik
    fiyat: 110 // Mevcut özelliği günceller
};
console.log(guncelUrun); // {id: 1, isim: 'Ürün A', fiyat: 110, kategori: 'Elektronik', garanti: '2 Yıl'}

const { id, ...kalanBilgiler } = guncelUrun; // Rest: id hariç diğer özellikler
console.log(id); // 1
console.log(kalanBilgiler); // {isim: 'Ürün A', fiyat: 110, kategori: 'Elektronik', garanti: '2 Yıl'}

// 📌 Neden Önemli? Spread, objeleri kopyalamak/güncellemek için; Rest, özellik ayırmak için kullanışlıdır.

// ========== BÖLÜM 4: DESTRUCTURING (Yapı Çözümleme) ==========
// Obje özelliklerini hızlıca değişkenlere ayırır.

const { isim: urunIsmi, fiyat } = urun;
console.log(urunIsmi, fiyat); // 'Ürün A' 120

// İç içe (nested) objelerde destructuring
const sirket = {
    isim: 'Tech A.Ş.',
    adres: {
        sehir: 'İstanbul',
        ilce: 'Kadıköy'
    }
};
const { adres: { sehir, ilce } } = sirket;
console.log(sehir, ilce); // 'İstanbul' 'Kadıköy'

// 📌 Neden Önemli? Destructuring, kodu sadeleştirir ve özelliklere hızlı erişim sağlar.

// ========== BÖLÜM 5: OBJE METOTLARI ==========
// JavaScript, objelerle çalışmak için yerleşik metotlar sunar.

// Object.keys(): Anahtarları dizi olarak döndürür
console.log(Object.keys(urun)); // ['id', 'isim', 'fiyat', 'kategori']

// Object.values(): Değerleri dizi olarak döndürür
console.log(Object.values(urun)); // [1, 'Ürün A', 120, 'Elektronik']

// Object.entries(): Anahtar-değer çiftlerini dizi içinde dizi olarak döndürür
console.log(Object.entries(urun)); // [['id', 1], ['isim', 'Ürün A'], ['fiyat', 120], ['kategori', 'Elektronik']]

// Object.assign(): Objeleri bir hedefe kopyalar
const hedef = { a: 1 };
const kaynak = { b: 2, c: 3 };
Object.assign(hedef, kaynak);
console.log(hedef); // { a: 1, b: 2, c: 3 }

// Object.fromEntries(): Anahtar-değer dizisinden obje oluşturur
const girisler = [['x', 10], ['y', 20]];
console.log(Object.fromEntries(girisler)); // { x: 10, y: 20 }

// Object.create(): Prototip ile obje oluşturur
const prototip = { selam: () => 'Merhaba' };
const yeniObje = Object.create(prototip);
console.log(yeniObje.selam()); // 'Merhaba'

// Object.defineProperty(): Özellik tanımlar ve kontrol eder
const kilitliObje = {};
Object.defineProperty(kilitliObje, 'anahtar', {
    value: 42,
    writable: false // Değiştirilemez
});
kilitliObje.anahtar = 100; // Çalışmaz
console.log(kilitliObje.anahtar); // 42

// Object.hasOwnProperty(): Özelliğin objeye ait olup olmadığını kontrol eder
console.log(urun.hasOwnProperty('isim')); // true
console.log(urun.hasOwnProperty('toString')); // false (prototipte)

// Object.is(): İki değerin tam eşitliğini kontrol eder
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false

// Object.preventExtensions(): Yeni özellik eklenmesini engeller
const engellenmisObje = { x: 1 };
Object.preventExtensions(engellenmisObje);
engellenmisObje.y = 2; // Eklenmez
engellenmisObje.x = 3; // Değişir
console.log(engellenmisObje); // { x: 3 }

// Object.getPrototypeOf(): Objenin prototipini döndürür
const protoKontrol = {};
console.log(Object.getPrototypeOf(protoKontrol) === Object.prototype); // true

// 📌 Neden Önemli? Bu metotlar, objelerle esnek ve güçlü işlemler yapmayı sağlar.

// ========== BÖLÜM 6: NESNE KİLİTLEME METOTLARI ==========
// Objeleri korumak için kullanılır.

// Object.seal(): Yeni özellik eklenemez, mevcutlar değiştirilebilir
const ayarlar = { tema: 'koyu', dil: 'tr' };
Object.seal(ayarlar);
ayarlar.tema = 'açık'; // Değişir
ayarlar.yeni = 'test'; // Eklenmez
delete ayarlar.dil; // Silinmez
console.log(ayarlar); // { tema: 'açık', dil: 'tr' }

// Object.freeze(): Obje tamamen dondurulur
const sabitAyarlar = { renk: '#fff', arkaplan: '#000' };
Object.freeze(sabitAyarlar);
sabitAyarlar.renk = '#000'; // Değişmez
sabitAyarlar.yeni = 'test'; // Eklenmez
delete sabitAyarlar.arkaplan; // Silinmez
console.log(sabitAyarlar); // { renk: '#fff', arkaplan: '#000' }

// 📌 Neden Önemli? Sabit veriler için freeze, kısmi koruma için seal kullanılır.

// ========== BÖLÜM 7: DİNAMİK ÖZELLİKLER ==========
// Anahtarlar dinamik olarak oluşturulabilir veya eklenebilir.

const dinamikAnahtar = 'durum_' + Date.now();
const siparis = {
    id: 5,
    [dinamikAnahtar]: 'işleniyor'
};
console.log(siparis); // { id: 5, durum_...: 'işleniyor' }

const ozellikAdi = 'toplamTutar';
siparis[ozellikAdi] = 2500;
console.log(siparis.toplamTutar); // 2500

// 📌 Neden Önemli? Dinamik anahtarlar, esnek veri yapıları oluşturur.

// ========== BÖLÜM 8: DERİN NESNE MANİPÜLASYONU ==========
// İç içe objeleri güncellemek için spread kullanılır.

const kullanici = {
    isim: 'Ali',
    ayarlar: {
        tema: 'koyu',
        bildirim: true
    }
};

const guncelKullanici = {
    ...kullanici,
    ayarlar: {
        ...kullanici.ayarlar,
        tema: 'açık'
    }
};
console.log(guncelKullanici); // { isim: 'Ali', ayarlar: { tema: 'açık', bildirim: true } }

// 📌 Neden Önemli? Derin kopyalama ve güncelleme, karmaşık verilerde sık kullanılır.

// ========== BÖLÜM 9: JSON İŞLEMLERİ ==========
// Objeleri JSON string'ine ve geri çevirir.

// Obje -> JSON
const urunJSON = JSON.stringify(urun);
console.log('JSON:', urunJSON); // '{"id":1,"isim":"Ürün A","fiyat":120,"kategori":"Elektronik"}'

// JSON -> Obje
const parsedUrun = JSON.parse(urunJSON);
console.log('Obje:', parsedUrun); // { id: 1, isim: 'Ürün A', fiyat: 120, kategori: 'Elektronik' }

// 📌 Neden Önemli? JSON, veri alışverişi ve saklama için standart bir formattır.

// ========== BÖLÜM 10: ÖRNEK UYGULAMA: VERİ YÖNETİMİ ==========
const veriSistemi = {
    veriler: [],
    ekle(id, deger) {
        this.veriler.push({ id, deger });
        return `${deger} eklendi`;
    },
    sil(id) {
        this.veriler = this.veriler.filter(item => item.id !== id);
        return `ID ${id} silindi`;
    },
    guncelle(id, yeniDeger) {
        const veri = this.veriler.find(item => item.id === id);
        if (veri) {
            veri.deger = yeniDeger;
            return `ID ${id} güncellendi`;
        }
        return 'Veri bulunamadı';
    },
    listele() {
        return this.veriler;
    }
};

// Kullanım
console.log(veriSistemi.ekle(1, 'Veri 1')); // 'Veri 1 eklendi'
console.log(veriSistemi.ekle(2, 'Veri 2')); // 'Veri 2 eklendi'
console.log(veriSistemi.guncelle(1, 'Güncel Veri')); // 'ID 1 güncellendi'
console.log(veriSistemi.sil(2)); // 'ID 2 silindi'
console.log(veriSistemi.listele()); // [{ id: 1, deger: 'Güncel Veri' }]

// 📌 Neden Önemli? Bu, objelerin pratik bir veri yönetim sisteminde nasıl kullanılabileceğini gösterir.
