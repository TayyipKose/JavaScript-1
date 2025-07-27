// @ts-nocheck
// ========================= TYPESCRIPT ITERATORS VE GENERATORS: JUNIOR DOSTU REHBER =========================//

// Bu rehber, TypeScript’te iterators ve generators’ı sıfırdan, basit ve gerçek hayattan örneklerle açıklar.
// Junior geliştiriciler için veri tarama ve akış kontrolünü öğrenmek için ideal.

// ===== BÖLÜM 1: ITERATORS NEDİR? =====
// Iterator, bir listenin (örneğin array) elemanlarını tek tek gezmemizi sağlayan bir araçtır.
// Düşünce: Bir kutudaki oyuncakları sırayla alıyorsun, her defasında bir tane!
// Sözdizimi: { next(): { value: T, done: boolean } }
// Özellik: Array’ler, string’ler gibi şeyler for...of ile çalışır çünkü iterator’ları var.

// Örnek 1: Array ile iterator (Gerçek Hayat: Alışveriş listesi gezme)
const alisverisListesi: string[] = ["Ekmek", "Süt", "Yumurta"];
const iterator = alisverisListesi[Symbol.iterator]();
console.log(iterator.next()); // { value: "Ekmek", done: false }
console.log(iterator.next()); // { value: "Süt", done: false }
console.log(iterator.next()); // { value: "Yumurta", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Örnek 2: Kendi iterator’ümüzü yapalım (Gerçek Hayat: Sayı sayıcı)
class Sayac {
    private suanki: number = 1;
    constructor(private max: number) {}
    [Symbol.iterator](): Iterator<number> {
        return {
            next: () => {
                if (this.suanki <= this.max) {
                    return { value: this.suanki++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
const sayac = new Sayac(3);
for (const num of sayac) {
    console.log("Sayı:", num); // Çıktı: Sayı: 1, Sayı: 2, Sayı: 3
}

// 💡 Neden Önemli? Iterator’lar, kendi veri yapılarımızı (örneğin bir liste) for...of ile gezilebilir yapar.
// 💡 Junior İpucu: “Iterator, veriyi adım adım taramak için süper. Array’ler zaten bunu yapıyor!”

// ===== BÖLÜM 2: GENERATORS NEDİR? =====
// Generator, sırayla veri üreten ve duraklatılabilen bir fonksiyondur.
// Düşünce: Bir makine gibi, sen istediğinde bir veri üretip bekliyor!
// Sözdizimi: function* isim() { yield veri; }
// Özellik: Iterator döndürür, büyük verileri veya akışları yönetmek için harika.

// Örnek 1: Basit generator (Gerçek Hayat: Sipariş numarası üretme)
function* siparisNoUret(): Generator<string> {
    let no = 1;
    while (true) {
        yield `Sipariş-${no++}`;
    }
}
const siparisler = siparisNoUret();
console.log(siparisler.next().value); // Sipariş-1
console.log(siparisler.next().value); // Sipariş-2
console.log(siparisler.next().value); // Sipariş-3

// Örnek 2: Liste parçalama (Gerçek Hayat: Büyük listeyi yavaş yavaş işleme)
function* listeParcala<T>(liste: T[]): Generator<T> {
    for (const eleman of liste) {
        yield eleman;
    }
}
const urunler: string[] = ["Telefon", "Laptop", "Kulaklık"];
const urunGen = listeParcala(urunler);
console.log(urunGen.next().value); // Telefon
console.log(urunGen.next().value); // Laptop
console.log(urunGen.next().value); // Kulaklık
console.log(urunGen.next().value); // undefined

// 💡 Neden Önemli? Generator’lar, büyük veriyi küçük parçalara böler, böylece kod yavaşlamaz.
// 💡 Junior İpucu: “Generator’la veriyi birer birer işlerim, belleği yormam!”

// ===== BÖLÜM 3: GERÇEK HAYAT UYGULAMASI =====
// Iterator ve generator ile bir proje yönetim sistemi yapalım.

interface Proje {
    id: string;
    ad: string;
    tamam: boolean;
}
const projeler: Proje[] = [
    { id: "p1", ad: "Web Sitesi", tamam: false },
    { id: "p2", ad: "Mobil App", tamam: true },
    { id: "p3", ad: "API", tamam: false }
];

// Örnek 1: Generator ile bitmemiş projeleri bulma
function* bitmemisProjeler(projeler: Proje[]): Generator<Proje> {
    for (const proje of projeler) {
        if (!proje.tamam) yield proje;
    }
}
const aktifProjeler = bitmemisProjeler(projeler);
console.log(aktifProjeler.next().value); // { id: "p1", ad: "Web Sitesi", tamam: false }
console.log(aktifProjeler.next().value); // { id: "p3", ad: "API", tamam: false }
console.log(aktifProjeler.next().value); // undefined

// Örnek 2: Iterator ile proje listesine durum ekleme
class ProjeListesi {
    constructor(private projeler: Proje[]) {}
    [Symbol.iterator](): Iterator<Proje & { durum?: string }> {
        let index = 0;
        return {
            next: () => {
                if (index < this.projeler.length) {
                    const proje = this.projeler[index++];
                    return {
                        value: {
                            ...proje,
                            ...(proje.tamam && { durum: "Bitti!" })
                        },
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
// Çıktı:
// Proje: { id: "p1", ad: "Web Sitesi", tamam: false }
// Proje: { id: "p2", ad: "Mobil App", tamam: true, durum: "Bitti!" }
// Proje: { id: "p3", ad: "API", tamam: false }

// 💡 Neden Önemli? Iterator’lar özel listeler, generator’lar veri akışı için süper.
// 💡 Junior İpucu: “Generator’la veriyi yavaş yavaş işlerim, iterator’la listemi gezilir yaparım.”

// ===== ÖZET VE JUNIOR MÜLAKAT REHBERİ =====
// ÖĞRENİLENLER:
// 1. Iterator: Veriyi adım adım gezer (next() ile value ve done döner).
// 2. Generator: Yield ile veriyi sırayla üretir, duraklatılabilir.
// 3. Gerçek Hayat: Alışveriş listesi, sipariş numarası, proje yönetimi.

// MÜLAKAT SORULARI (Junior Seviyesine Uygun):
// - Iterator ne yapar? (Listeyi adım adım gezmemi sağlar.)
// - Generator neden kullanırım? (Büyük veriyi parçalar, sırayla işlerim.)
// - for...of nasıl çalışır? (Iterator sayesinde listeyi gezer.)

// YAYGIN HATALAR VE ÇÖZÜMLER:
// - **Hata**: Generator’da yield’i normal fonksiyonda kullanmak.
//   **Çözüm**: Sadece function* içinde yield kullan!
// - **Hata**: Iterator’da done unutmak.
//   **Çözüm**: Her next() çağrısı { value, done } döndürmeli.
// - **Hata**: Karmaşık veri yapılarıyla boğuşmak.
//   **Çözüm**: Küçük parçalara böl, console.log ile veriyi incele.

// PRATİK İPUÇLARI:
// - Iterator: Kendi listeni for...of ile gezmek için yaz.
// - Generator: Büyük veriyi küçük parçalara bölmek için kullan.
// - Koşullu Spread: Veriye dinamik eklemeler için harika (örneğin durum ekleme).

// 📌 Ekstra: Asenkron Generator
async function* asenkronUrunler(): AsyncGenerator<string> {
    yield await Promise.resolve("Ürün 1");
    yield await Promise.resolve("Ürün 2");
}
const urunler = asenkronUrunler();
urunler.next().then(({ value }) => console.log(value)); // Ürün 1

// 📌 Not: Kod junior dostu, sade ve ~90 satır! Gereksiz detaylar atıldı, her şey net!