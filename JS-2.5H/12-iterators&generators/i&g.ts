// @ts-nocheck
// ========================= TYPESCRIPT ITERATORS VE GENERATORS: ORTA SEVIYE REHBER =========================//

// Bu rehber, TypeScript’te iterators ve generators’ı sade, anlaşılır ve gerçek hayatta kullanılabilir şekilde öğretir.
// Orta seviye TS geliştiricisi için array’ler, objeler ve pratik senaryolar içerir.

// ===== BÖLÜM 1: ITERATORS NEDİR? =====
// Iterator, bir veri yapısının elemanlarını sırayla dönen bir nesnedir.
// Sözdizimi: { next(): { value: T, done: boolean } }
// Arka Plan: Array’ler, string’ler gibi iterable’lar for...of ile çalışır çünkü iterator sağlar.

// Örnek 1: Array iterator’ı (Gerçek Hayat: Veri tarama)
const takim: string[] = ["Ali", "Ayşe"];
const iterator = takim[Symbol.iterator]();
console.log(iterator.next()); // { value: "Ali", done: false }
console.log(iterator.next()); // { value: "Ayşe", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Örnek 2: Özel iterator (Gerçek Hayat: Kendi veri yapısı)
class Sayac {
    private max: number;
    private current: number = 0;
    constructor(max: number) {
        this.max = max;
    }
    [Symbol.iterator](): Iterator<number> {
        return {
            next: () => {
                if (this.current < this.max) {
                    return { value: this.current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
const sayac = new Sayac(3);
for (const num of sayac) {
    console.log("Sayı:", num); // Sayı: 0, 1, 2
}

// 📌 Neden Önemli? Iterator’lar, özelleştirilmiş veri tarama için güçlü.
// 📌 Mülakat İpucu: “Özel veri yapılarımda iterator ile for...of desteği sağlarım.”

// ===== BÖLÜM 2: GENERATORS NEDİR? =====
// Generator, yield ile değer üreten ve duraklatılabilir bir fonksiyondur.
// Sözdizimi: function* gen() { yield value; }
// Arka Plan: Iterator döndürür, asenkron işlemler ve akış kontrolü için ideal.

// Örnek 1: Basit generator (Gerçek Hayat: Veri akışı)
function* idUretici(): Generator<string> {
    let id = 1;
    while (true) {
        yield `ID-${id++}`;
    }
}
const ids = idUretici();
console.log(ids.next().value); // ID-1
console.log(ids.next().value); // ID-2

// Örnek 2: Array işleme (Gerçek Hayat: Büyük veri parçalama)
function* veriParcalayici<T>(veri: T[]): Generator<T> {
    for (const eleman of veri) {
        yield eleman;
    }
}
interface Kullanici {
    id: string;
    ad: string;
}
const kullanicilar: Kullanici[] = [
    { id: "u1", ad: "Ali" },
    { id: "u2", ad: "Ayşe" }
];
const kullaniciGen = veriParcalayici(kullanicilar);
console.log(kullaniciGen.next().value); // { id: "u1", ad: "Ali" }
console.log(kullaniciGen.next().value); // { id: "u2", ad: "Ayşe" }

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// Generator ve iterator ile proje yönetimi (Gerçek Hayat: Veri akışı).

interface Proje {
    id: string;
    ad: string;
    tamam: boolean;
}
const projeler: Proje[] = [
    { id: "p1", ad: "Web", tamam: false },
    { id: "p2", ad: "App", tamam: true }
];

// Örnek 1: Generator ile proje filtreleme
function* tamamlanmamisProjeler(projeler: Proje[]): Generator<Proje> {
    for (const proje of projeler) {
        if (!proje.tamam) yield proje;
    }
}
const aktifProjeler = tamamlanmamisProjeler(projeler);
console.log(aktifProjeler.next().value); // { id: "p1", ad: "Web", tamam: false }

// Örnek 2: Iterator ile dinamik veri (Koşullu spread ile)
class ProjeListesi {
    private projeler: Proje[];
    constructor(projeler: Proje[]) {
        this.projeler = projeler;
    }
    [Symbol.iterator](): Iterator<Proje> {
        let index = 0;
        return {
            next: () => {
                if (index < this.projeler.length) {
                    const proje = this.projeler[index++];
                    return {
                        value: { ...proje, ...(proje.tamam && { durum: "Tamamlandı" }) },
                        done: false
                    };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
const projeListesi = new ProjeListesi(projeler);
for (const p of projeListesi) {
    console.log("Proje:", p);
}
// Çıktı: Proje: { id: "p1", ad: "Web", tamam: false }
//        Proje: { id: "p2", ad: "App", tamam: true, durum: "Tamamlandı" }

// 📌 Neden Önemli? Generator’lar veri akışını yönetir, iterator’lar özelleştirilmiş tarama sağlar.
// 📌 Mülakat İpucu: “Generator ile büyük veriyi parçaladım, iterator ile özel veri yapısı sundum.”

// ===== NOTLAR VE MÜLAKAT İPUÇLARI =====
// ÖĞRENİLENLER:
// 1. Iterator: Veri tarama için next() sağlar.
// 2. Generator: Yield ile duraklatılabilir veri üretir.
// 3. Gerçek Hayat: Büyük veri, akış kontrolü, özelleştirilmiş tarama.

// MÜLAKAT SORULARI:
// - Iterator nasıl çalışır? (Next() ile değer ve done döner.)
// - Generator neden kullanılır? (Veri akışı ve duraklatma için.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Generator’da yanlış yield.
//   **Çözüm**: Yield’in sadece generator içinde çalıştığını unutma.
// - **Hata**: Iterator’da done unutmak.
//   **Çözüm**: Her zaman { value, done } döndür.

// PRATİK İPUÇLARI:
// - Generator ile veri akışı oluştur.
// - Iterator ile özel veri yapısı yaz.
// - Koşullu spread ile iterator çıktısını zenginleştir.

// 📌 Not: Koşullu spread ile iterator örneği kritik, bu yüzden 150 satır oldu!