// @ts-nocheck
// ========================= TYPESCRIPT OOP: JUNIOR-MIDDLE SEVIYE REHBER =========================//
// Bu rehber, Encapsulation, inheritance, polymorphism, abstraction ve TS özellikleri (interface, abstract class) içerir.

// ===== BÖLÜM 1: OOP NEDİR VE TEMEL KAVRAMLAR =====
// OOP, nesneler etrafında kod organize etmektir. Gerçek dünyayı modellemek için kullanılır.
// Temel Kavramlar:
// 1. Encapsulation: Veriyi ve metotları bir arada tutar, erişimi kontrol eder.
// 2. Inheritance: Bir sınıf, başka bir sınıfın özelliklerini miras alır.
// 3. Polymorphism: Farklı sınıflar aynı metodu farklı şekilde uygular.
// 4. Abstraction: Gereksiz detayları gizler, sadece gerekli arayüzü sunar.

// Örnek 1: Basit Sınıf (Gerçek Hayat: Kullanıcı Yönetimi)
class Kullanici {
    private id: string;
    private ad: string;
    protected rol: string;

    constructor(id: string, ad: string, rol: string = "Üye") {
        this.id = id;
        this.ad = ad;
        this.rol = rol;
    }

    public getAd(): string {
        return this.ad;
    }

    public setAd(yeniAd: string): void {
        this.ad = yeniAd;
    }

    public tanit(): string {
        return `Merhaba, ben ${this.ad}, rolüm ${this.rol}.`;
    }
}
const kullanici = new Kullanici("u1", "Ali");
console.log(kullanici.tanit()); // Çıktı: Merhaba, ben Ali, rolüm Üye.

// 📌 Mantık: Encapsulation (private ile veri gizleme), constructor ile nesne başlatma.
// 📌 Mülakat İpucu: “Private ile veriyi korur, public metotlarla erişim sağlarım.”

// ===== BÖLÜM 2: INHERITANCE VE INTERFACE =====
// Inheritance, bir sınıfın başka bir sınıfın özelliklerini almasıdır.
// Interface, sınıfların uyması gereken bir sözleşmedir.

// Örnek: Yönetici sınıfı Kullanıcı’dan miras alır
interface Yetki {
    yetkiSeviyesi(): string;
}

class Yonetici extends Kullanici implements Yetki {
    private departman: string;

    constructor(id: string, ad: string, departman: string) {
        super(id, ad, "Yönetici"); // Üst sınıfın constructor’ını çağır
        this.departman = departman;
    }

    public yetkiSeviyesi(): string {
        return `Yönetici: ${this.departman} departmanı`;
    }

    // Polymorphism: tanit metodu override edilir
    public tanit(): string {
        return `${super.tanit()} ${this.yetkiSeviyesi()}`;
    }
}
const yonetici = new Yonetici("y1", "Ayşe", "IT");
console.log(yonetici.tanit()); // Çıktı: Merhaba, ben Ayşe, rolüm Yönetici. Yönetici: IT departmanı

// 📌 Mantık: Inheritance (extends), interface ile sözleşme, polymorphism (tanit override).
// 📌 Mülakat İpucu: “Extends ile miras alır, interface ile tipi garanti ederim.”

// ===== BÖLÜM 3: ABSTRACTION VE ABSTRACT CLASS =====
// Abstraction, detayları gizleyip sadece arayüzü sunar. Abstract class, doğrudan örneklenemez.

// Örnek: Soyut sınıf ile ödeme sistemi (Gerçek Hayat: E-ticaret)
abstract class Odeme {
    protected miktar: number;

    constructor(miktar: number) {
        this.miktar = miktar;
    }

    abstract islemiYap(): string; // Alt sınıflar bunu implement etmeli

    protected odemeBilgisi(): string {
        return `Miktar: ${this.miktar} TL`;
    }
}

class KrediKartiOdeme extends Odeme {
    private kartNo: string;

    constructor(miktar: number, kartNo: string) {
        super(miktar);
        this.kartNo = kartNo;
    }

    public islemiYap(): string {
        return `Kredi kartı (${this.kartNo}) ile ${this.odemeBilgisi()} ödendi.`;
    }
}

class HavaleOdeme extends Odeme {
    public islemiYap(): string {
        return `Havale ile ${this.odemeBilgisi()} ödendi.`;
    }
}

const odeme1 = new KrediKartiOdeme(100, "1234-5678");
const odeme2 = new HavaleOdeme(200);
console.log(odeme1.islemiYap()); // Çıktı: Kredi kartı (1234-5678) ile Miktar: 100 TL ödendi.
console.log(odeme2.islemiYap()); // Çıktı: Havale ile Miktar: 200 TL ödendi.

// 📌 Mantık: Abstract class ile şablon, polymorphism ile farklı uygulamalar.
// 📌 Mülakat İpucu: “Abstract class ile ortak mantığı tanımlar, detayları alt sınıflara bırakırım.”

// ===== BÖLÜM 4: GERÇEK HAYAT UYGULAMASI =====
// E-ticaret sepet yönetimi (Gerçek Hayat: Sepet ve ürün sistemi)

interface Urun {
    fiyatHesapla(): number;
}

class Elektronik implements Urun {
    private ad: string;
    private fiyat: number;

    constructor(ad: string, fiyat: number) {
        this.ad = ad;
        this.fiyat = fiyat;
    }

    public fiyatHesapla(): number {
        return this.fiyat * 1.18; // KDV ekle
    }

    public detay(): string {
        return `${this.ad}: ${this.fiyatHesapla()} TL`;
    }
}

class Sepet {
    private urunler: Urun[] = [];

    public urunEkle(urun: Urun): void {
        this.urunler.push(urun);
    }

    public toplamFiyat(): number {
        return this.urunler.reduce((toplam, urun) => toplam + urun.fiyatHesapla(), 0);
    }
}

const sepet = new Sepet();
sepet.urunEkle(new Elektronik("Telefon", 1000));
sepet.urunEkle(new Elektronik("Kulaklık", 200));
console.log(sepet.toplamFiyat()); // Çıktı: 1416 TL (KDV dahil)

// 📌 Mantık: Encapsulation (urunler private), interface (Urun sözleşmesi), polymorphism (fiyatHesapla).
// 📌 Mülakat İpucu: “OOP ile modüler, genişletilebilir sistemler kurarım.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. Encapsulation: Private/protected ile veri gizleme.
// 2. Inheritance: Extends ile miras.
// 3. Polymorphism: Metot override veya interface ile farklı uygulamalar.
// 4. Abstraction: Abstract class veya interface ile detay gizleme.

// MÜLAKAT SORULARI:
// - Private ile protected farkı? (Private sadece sınıf içi, protected alt sınıflarda da erişilir.)
// - Interface ile abstract class farkı? (Interface sadece sözleşme, abstract class kısmi uygulama sunar.)
// - Polymorphism nasıl sağlanır? (Metot override veya interface implementasyonu ile.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Private değişkene dışardan erişim.
//   **Çözüm**: Getter/setter kullan.
// - **Hata**: Abstract metodu implement etmemek.
//   **Çözüm**: Alt sınıfta metodu tanımla.