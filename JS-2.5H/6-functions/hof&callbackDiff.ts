//**Callback ve Higher Order Function (HOF) Farkı:**
/*
- **Callback:** Başka bir fonksiyona "iş bittiğinde şunu yap" talimatı veren fonksiyondur.
- **HOF:** Başka bir fonksiyonu parametre olarak alabilen veya bir fonksiyon döndüren fonksiyondur.

Kahve Dükkanı Analojisi:
- **Callback:** "Kahven hazır olunca şunu yap" demek (örneğin: "İç").
- **HOF:** "Sana özel bir kahve tarifi vereyim" demek ya da "Kahve makinesi verirken sana özel bir seçenek sunayım".
*/






// 🔹 **1. Sadece HOF: Fonksiyon Parametre Olarak Alma (Callback Yok)**

function sadeKahve(isim: string): string {
    return `${isim} için sade kahve hazır!`;
}

function kahveHazirla(tarifFonksiyonu: (isim: string) => string, isim: string): string {
    return tarifFonksiyonu(isim);  // HOF: Tarif fonksiyonunu parametre olarak alıyor
}

console.log(kahveHazirla(sadeKahve, "Ali"));  // Çıktı: Ali için sade kahve hazır!


// 🔹 **2. Sadece HOF: Fonksiyon Döndürme (Callback Yok)**

function kahveBoyutu(boyut: number) {
    return (isim: string) => `${isim} için ${boyut} ml kahve hazır!`;  // HOF: Fonksiyon döndürüyor
}

const kucukKahve = kahveBoyutu(200);
console.log(kucukKahve("Ayşe"));  // Çıktı: Ayşe için 200 ml kahve hazır!


// 🔹 **3. HOF + Callback: Teslimat Talimatı**

function kahveTeslimEt(isim: string, callback: (mesaj: string) => void) {
    const mesaj = `${isim} için kahve teslim edildi!`;
    callback(mesaj);  // Callback: İş bittiğinde ne yapılacağı söyleniyor
}

kahveTeslimEt("Veli", mesaj => console.log(mesaj));  // Çıktı: Veli için kahve teslim edildi!


// 🔹 **4. HOF + Callback Birleşimi: Rol Kontrolü ve Teslimat**

function baristaKontrolu(gerekliRol: string) {
    return (barista: { isim: string, rol: string }) => barista.rol === gerekliRol;  // HOF: Fonksiyon döndürüyor
}

const kahveYapabilirMi = baristaKontrolu("usta");

function rolBazliTeslimat(rolKontrol: (b: { isim: string, rol: string }) => boolean) {
    return (barista: { isim: string, rol: string }, callback: (mesaj: string) => void) => {
        const durum = rolKontrol(barista) ? "kahveyi yapabilir!" : "kahveyi yapamaz!";
        callback(`${barista.isim} ${durum}`);  // HOF: Hem rolKontrol alıyor hem callback kullanıyor
    };
}

const ustaTeslimat = rolBazliTeslimat(kahveYapabilirMi);
ustaTeslimat({ isim: "Ali", rol: "çırak" }, mesaj => console.log(mesaj));  // Çıktı: Ali kahveyi yapamaz!

// 🔹 **Özet:**
// - **Callback:** "Sonra şunu yap" diyen fonksiyonlardır. HOF'lar içinde kullanılabilir.
// - **HOF:** Parametre olarak fonksiyon alır veya fonksiyon döndürür. Callback'leri içerebilir ama zorunlu değildir.
// - **Birlikte Kullanım:** Hem HOF hem callback kullanıldığında işlem akışını kontrol edebiliriz (örneğin: `kahveTeslimEt` ve `rolBazliTeslimat`).
