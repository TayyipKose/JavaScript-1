// 🍕 HOF (Higher Order Function) - Pizza Dükkanı Örneği

// 1️⃣ Fonksiyonu Parametre Olarak Alan HOF
function margaritaPizza(isim: string): string {
    return `${isim} için Margarita pizza hazır!`;
}

function pizzaHazirla(pizzaTarifi: (isim: string) => string, isim: string): string {
    return pizzaTarifi(isim);
}

console.log(pizzaHazirla(margaritaPizza, "Ali"));
// 👉 Ali için Margarita pizza hazır!

// 2️⃣ Fonksiyon Döndüren HOF
function pizzaBoyutuSec(boyut: string) {
    return (isim: string) => `${isim} için ${boyut} boy pizza hazır!`;
}

const kucukPizza = pizzaBoyutuSec("küçük");
const buyukPizza = pizzaBoyutuSec("büyük");

console.log(kucukPizza("Ayşe"));
// 👉 Ayşe için küçük boy pizza hazır!
console.log(buyukPizza("Veli"));
// 👉 Veli için büyük boy pizza hazır!

// 3️⃣ HOF + Array Kullanımı
const musteriler = ["Ali", "Ayşe", "Veli"];

musteriler.forEach(isim => console.log(`${isim} pizzası hazır.`));
// 👉 Ali pizzası hazır. Ayşe pizzası hazır. Veli pizzası hazır.

const siparisler = musteriler.map(isim => `${isim} için pizza pişiriliyor...`);
console.log(siparisler);
// 👉 ["Ali için pizza pişiriliyor...", "Ayşe için pizza pişiriliyor...", "Veli için pizza pişiriliyor..."]

const uzunIsimler = musteriler.filter(isim => isim.length > 3);
console.log(uzunIsimler);
// 👉 ["Ayşe", "Veli"]

const ozet = musteriler.reduce((acc, isim) => acc + `${isim}, `, "Siparişler: ");
console.log(ozet);
// 👉 Siparişler: Ali, Ayşe, Veli,

// 4️⃣ Yetki Kontrolü - HOF ile
function yetkiKontrolu(gerekliRol: string) {
    return (personel: { isim: string, rol: string }) => personel.rol === gerekliRol;
}

const sadeceUsta = yetkiKontrolu("usta");

console.log(sadeceUsta({ isim: "Ali", rol: "stajyer" })); // 👉 false
console.log(sadeceUsta({ isim: "Ayşe", rol: "usta" }));   // 👉 true

// 5️⃣ Callback ile Teslimat
function pizzayiTeslimEt(isim: string, callback: (mesaj: string) => void) {
    const mesaj = `${isim} için pizza teslim edildi!`;
    callback(mesaj);
}

pizzayiTeslimEt("Veli", mesaj => console.log(mesaj));
// 👉 Veli için pizza teslim edildi!

// 6️⃣ Komple HOF: Rol + Teslimat
function rolKontrolluTeslim(yetkiFonksiyonu: (p: { isim: string, rol: string }) => boolean) {
    return (personel: { isim: string, rol: string }, callback: (mesaj: string) => void) => {
        const mesaj = yetkiFonksiyonu(personel)
            ? `${personel.isim} pizzayı teslim edebilir!`
            : `${personel.isim} pizzayı teslim edemez!`;
        callback(mesaj);
    };
}

const ustaTeslim = rolKontrolluTeslim(sadeceUsta);

ustaTeslim({ isim: "Ali", rol: "stajyer" }, mesaj => console.log(mesaj));
// 👉 Ali pizzayı teslim edemez!
ustaTeslim({ isim: "Ayşe", rol: "usta" }, mesaj => console.log(mesaj));
// 👉 Ayşe pizzayı teslim edebilir!
