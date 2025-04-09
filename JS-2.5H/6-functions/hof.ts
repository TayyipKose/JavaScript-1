/*
Higher Order Function Nedir?
HOF, fonksiyonları esnek bir şekilde kullanma sanatıdır. Yani:
- Bir fonksiyonu başka bir fonksiyona parametre olarak verebilirsin.
- Ya da bir fonksiyon, başka bir fonksiyonu döndürebilir.
Bu, kodunu daha esnek, tekrar kullanılabilir (reusable) ve güçlü yapar.

Gerçek Hayat Analojisi: Kahve Dükkanı
Bir kahve dükkanın var. Müşterilere kahve hazırlıyorsun:
- "Ne yapacağını" söylersin (kahve hazırla) → bu bir fonksiyon.
- "Nasıl yapacağını" özelleştirirsin (sade, sütlü, şekerli) → bu özelleştirme HOF’un gücü.
HOF, kahve makinesi gibi: Ona hangi tarifi vereceğini söylersin, o da o tarife göre kahve yapar.
*/

// 1. Temel HOF: Tarifi Parametre Olarak Alma
function sadeKahve(isim: string): string {
    return `${isim} için sade kahve hazır!`;
}

function kahveHazirla(tarifFonksiyonu: (isim: string) => string, isim: string): string {
    return tarifFonksiyonu(isim);
}
console.log(kahveHazirla(sadeKahve, "Ali")); // Çıktı: Ali için sade kahve hazır!

// 2. Fonksiyon Döndüren HOF: Kahve Boyutu Makinesi
function kahveBoyutu(boyut: number) {
    return (isim: string) => `${isim} için ${boyut} ml kahve hazır!`;
}
const kucukKahve = kahveBoyutu(200);
const buyukKahve = kahveBoyutu(400);
console.log(kucukKahve("Ayşe")); // Çıktı: Ayşe için 200 ml kahve hazır!
console.log(buyukKahve("Veli")); // Çıktı: Veli için 400 ml kahve hazır!

// 3. Array Metotlarıyla HOF: Sipariş Listesi İşleme
const musteriler = ["Ali", "Ayşe", "Veli"];
musteriler.forEach(isim => console.log(`${isim} kahvesini aldı.`)); //her bir müşteri için bu kod döner.

console.log(musteriler.map(isim => `Sade kahve ${isim} için hazır!`)); // Çıktı: ["Sade kahve Ali için hazır!", ...]
console.log(musteriler.filter(isim => isim.length > 3)); // Çıktı: ["Ayşe", "Veli"]
console.log(musteriler.reduce((siparis, isim) => siparis + `${isim}, `, "Siparişler: ")); // Çıktı: "Siparişler: Ali, Ayşe, Veli, "

// 4. Yetki Kontrolü: Barista Rolü HOF
function baristaKontrolu(gerekliRol: string) {
    return (barista: { isim: string, rol: string }) => barista.rol === gerekliRol;
}
const kahveYapabilirMi = baristaKontrolu("usta");
console.log(kahveYapabilirMi({ isim: "Ali", rol: "çırak" })); // Çıktı: false
console.log(kahveYapabilirMi({ isim: "Ayşe", rol: "usta" })); // Çıktı: true

// 5. Callback ile HOF: Kahve Teslimatı
function kahveTeslimEt(isim: string, callback: (mesaj: string) => void) {
    const mesaj = `${isim} için kahve teslim edildi!`;
    callback(mesaj);
}
kahveTeslimEt("Veli", mesaj => console.log(mesaj)); // Çıktı: Veli için kahve teslim edildi!

// 6. Kompleks HOF: Rol Kontrolü + Teslimat
function rolBazliTeslimat(rolKontrol: (b: { isim: string, rol: string }) => boolean) {
    return (barista: { isim: string, rol: string }, callback: (mesaj: string) => void) => {
        const durum = rolKontrol(barista) ? "kahveyi yapabilir!" : "kahveyi yapamaz!";
        callback(`${barista.isim} ${durum}`);
    };
}
const ustaTeslimat = rolBazliTeslimat(kahveYapabilirMi);
ustaTeslimat({ isim: "Ali", rol: "çırak" }, mesaj => console.log(mesaj)); // Çıktı: Ali kahveyi yapamaz!
ustaTeslimat({ isim: "Ayşe", rol: "usta" }, mesaj => console.log(mesaj)); // Çıktı: Ayşe kahveyi yapabilir!