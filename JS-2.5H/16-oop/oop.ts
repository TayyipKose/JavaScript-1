// @ts-nocheck
// ========================= TYPESCRIPT OOP: JUNIOR SEVIYE REHBER =========================//
// Bu rehber, OOP’yi sıfırdan öğrenenler için! Encapsulation, inheritance, polymorphism, abstraction’ı basitçe anlatır.

// ===== BÖLÜM 1: OOP NEDİR? =====
// OOP, kodunu "nesneler" gibi düşünmektir. Mesela bir araba: tekerlekleri, motoru, rengi var (özellikler), gaza basar, fren yapar (davranışlar).
// 4 temel fikir:
// 1. Encapsulation: Veriyi sakla, sadece izin verdiğin şekilde kullan.
// 2. Inheritance: Bir şey başka bir şeyden özellik alır (baba-oğul gibi).
// 3. Polymorphism: Aynı şey farklı şekillerde çalışır.
// 4. Abstraction: Karmaşık şeyleri basit göster.

// Örnek 1: Araba (Gerçek Hayat: Basit Sınıf)
class Araba {
    // Özellikler (veriler)
    private renk: string; // Sadece bu sınıf görür
    private hiz: number = 0;

    // Constructor: Arabayı yaratırken ilk ayarlar
    constructor(renk: string) {
        this.renk = renk;
    }

    // Davranışlar (metotlar)
    public gazaBas(): string {
        this.hiz += 10;
        return `Vın! Hız: ${this.hiz} km/s`;
    }

    public frenYap(): string {
        this.hiz = 0;
        return `Durduk! Hız: ${this.hiz} km/s`;
    }

    public bilgi(): string {
        return `Bu bir ${this.renk} araba`;
    }
}

const arabam = new Araba("Kırmızı");
console.log(arabam.bilgi()); // Çıktı: Bu bir Kırmızı araba
console.log(arabam.gazaBas()); // Çıktı: Vın! Hız: 10 km/s
console.log(arabam.frenYap()); // Çıktı: Durduk! Hız: 0 km/s

// 📌 Mantık: Araba bir nesne. Renk ve hız gizli (private), metotlarla kontrol edilir (encapsulation).
// 📌 Mülakat İpucu: “Private ile veriyi korurum, metotlarla erişim sağlarım.”

// ===== BÖLÜM 2: INHERITANCE (MİRAS) =====
// Bir sınıf, başka bir sınıfın özelliklerini alabilir. Mesela spor araba da bir arabadır.

// Örnek: Spor Araba
class SporAraba extends Araba {
    private turbo: boolean;

    constructor(renk: string, turbo: boolean) {
        super(renk); // Üst sınıfın (Araba) constructor’ını çağır
        this.turbo = turbo;
    }

    // Yeni metot
    public turboAc(): string {
        if (this.turbo) return "Turbo açık, uçuyoruz!";
        return "Turbo yok!";
    }
}

const sporArabam = new SporAraba("Mavi", true);
console.log(sporArabam.bilgi()); // Çıktı: Bu bir Mavi araba
console.log(sporArabam.turboAc()); // Çıktı: Turbo açık, uçuyoruz!

// 📌 Mantık: SporAraba, Araba’nın özelliklerini aldı (inheritance). Yeni şeyler ekledi (turbo).
// 📌 Mülakat İpucu: “Extends ile miras alır, super ile üst sınıfı çağırırım.”

// ===== BÖLÜM 3: POLYMORPHISM (ÇOK BİÇİMLİLİK) =====
// Aynı metot, farklı sınıflarda farklı çalışır.

// Örnek: Farklı Araçlar
class Kamyon extends Araba {
    constructor(renk: string) {
        super(renk);
    }

    // Aynı metot, farklı iş
    public gazaBas(): string {
        return `Ağır ağır gidiyoruz! Hız: 5 km/s`;
    }
}

const kamyonum = new Kamyon("Siyah");
console.log(kamyonum.gazaBas()); // Çıktı: Ağır ağır gidiyoruz! Hız: 5 km/s
console.log(sporArabam.gazaBas()); // Çıktı: Vın! Hız: 10 km/s

// 📌 Mantık: Aynı metot (gazaBas), farklı sınıflarda farklı çalıştı (polymorphism).
// 📌 Mülakat İpucu: “Metodu override ederek farklı davranışlar tanımlarım.”

// ===== BÖLÜM 4: ABSTRACTION (SOYUTLAMA) =====
// Detayları gizle, sadece gerekli şeyi göster. Interface ile yapalım.

// Örnek: Hayvanlar
interface Hayvan {
    sesCikar(): string; // Her hayvan bunu yapmalı
}

class Kopek implements Hayvan {
    public sesCikar(): string {
        return "Hav hav!";
    }
}

class Kedi implements Hayvan {
    public sesCikar(): string {
        return "Miyav!";
    }
}

const kopek = new Kopek();
const kedi = new Kedi();
console.log(kopek.sesCikar()); // Çıktı: Hav hav!
console.log(kedi.sesCikar()); // Çıktı: Miyav!

// 📌 Mantık: Interface, sınıfların ne yapacağını söyler, nasıl yaptığını gizler (abstraction).
// 📌 Mülakat İpucu: “Interface ile sözleşme tanımlar, detayları sınıflara bırakırım.”

// ===== BÖLÜM 5: GERÇEK HAYAT ÖRNEĞİ =====
// Basit bir sepet sistemi (E-ticaret)
class Urun {
    private ad: string;
    private fiyat: number;

    constructor(ad: string, fiyat: number) {
        this.ad = ad;
        this.fiyat = fiyat;
    }

    public bilgi(): string {
        return `${this.ad}: ${this.fiyat} TL`;
    }
}

class Sepet {
    private urunler: Urun[] = [];

    public urunEkle(urun: Urun): void {
        this.urunler.push(urun);
    }

    public toplamFiyat(): number {
        let toplam = 0;
        for (const urun of this.urunler) {
            toplam += urun.fiyat;
        }
        return toplam;
    }
}

const sepet = new Sepet();
sepet.urunEkle(new Urun("Telefon", 1000));
sepet.urunEkle(new Urun("Kulaklık", 200));
console.log(sepet.toplamFiyat()); // Çıktı: 1200 TL

// 📌 Mantık: Urun ve Sepet nesneleri, encapsulation (private) ve basit döngü kullanıyor.
// 📌 Mülakat İpucu: “OOP ile modüler sistem kurar, veriyi private tutarım.”

// ===== NOTLAR =====
// - Private: Sadece sınıfın içinde kullanılır.
// - Constructor: Nesneyi yaratırken çalışır.
// - Extends: Miras almak için.
// - Interface: Ne yapılacağını söyler, nasıl yapılacağını değil.