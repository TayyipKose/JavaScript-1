// @ts-nocheck
// ========================= TYPESCRIPT OOP: JUNIOR SEVIYE REHBER =========================//
// Bu rehber, OOP’yi sıfırdan öğrenenler için! Encapsulation, inheritance, polymorphism, abstraction’ı basitçe anlatır.

// ===== BÖLÜM 1: OOP NEDİR? =====
// OOP, kodunu "nesneler" gibi düşünmektir. Mesela bir araba: tekerlekleri, motoru, rengi var (özellikler), gaza basar, fren yapar (davranışlar).
// 4 temel kavram:
// 1. Encapsulation: Veriyi koru, sadece izin verilen metotlarla erişim sağla.
// 2. Inheritance: Bir sınıf başka sınıfın özelliklerini miras alır.
// 3. Polymorphism: Aynı isimde metotlar farklı davranabilir.
// 4. Abstraction: Karmaşık detayları gizle, sadece önemli kısmı göster.


// ===== BÖLÜM 1: ENCAPSULATION =====
class Cihaz {
    private acik: boolean = false;

    constructor(private isim: string) {}

    public ac(): void {
        this.acik = true;
        console.log(`${this.isim} açıldı.`);
    }

    public kapa(): void {
        this.acik = false;
        console.log(`${this.isim} kapandı.`);
    }

    public durum(): string {
        return `${this.isim} şu an ${this.acik ? "açık" : "kapalı"}`;
    }
}

const lamba = new Cihaz("Salon Lambası");
lamba.ac();
console.log(lamba.durum());
lamba.kapa();

// ===== BÖLÜM 2: INHERITANCE =====
class AkilliLamba extends Cihaz {
    private parlaklik: number = 50; // 0-100

    constructor(isim: string) {
        super(isim);
    }

    public parlaklikAyarla(deger: number): void {
        this.parlaklik = Math.min(100, Math.max(0, deger));
        console.log(`${this.isim} parlaklık ${this.parlaklik} seviyesine ayarlandı.`);
    }
}

const salonLambasi = new AkilliLamba("Salon Akıllı Lambası");
salonLambasi.ac();
salonLambasi.parlaklikAyarla(80);
console.log(salonLambasi.durum());

// ===== BÖLÜM 3: POLYMORPHISM =====
class Klima extends Cihaz {
    private sicaklik: number = 24;

    constructor(isim: string) {
        super(isim);
    }

    // Override etme: klima açılırken ek bilgi verelim
    public ac(): void {
        super.ac();
        console.log(`${this.isim} ${this.sicaklik} dereceye ayarlanıyor.`);
    }

    public sicaklikAyarla(deger: number): void {
        this.sicaklik = deger;
        console.log(`${this.isim} sıcaklık ${this.sicaklik} dereceye ayarlandı.`);
    }
}

const salonKlima = new Klima("Salon Klima");
salonKlima.ac();
salonKlima.sicaklikAyarla(22);
console.log(salonKlima.durum());

// ===== BÖLÜM 4: ABSTRACTION =====
interface AkilliCihaz {
    ac(): void;
    kapa(): void;
    durum(): string;
}

function cihazDurumuYazdir(cihaz: AkilliCihaz) {
    console.log(cihaz.durum());
}

cihazDurumuYazdir(salonLambasi);
cihazDurumuYazdir(salonKlima);

// ===== ÖZET =====
// • Encapsulation: Cihaz iç durumu gizli, sadece metodlarla kontrol edilir.
// • Inheritance: Akıllı lamba ve klima Cihaz’dan miras aldı, yeni özellikler ekledi.
// • Polymorphism: Klima ac() metodunu kendine göre değiştirdi (override).
// • Abstraction: AkilliCihaz interface ile ne yapacakları belli, nasıl yapılacağı detaylarda.