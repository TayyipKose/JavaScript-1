// 1️⃣ Temel Fonksiyon (Parametresiz, Geri Dönüşsüz)
function greet(): void {
    console.log("Merhaba!");
}

greet(); // Çıktı: Merhaba!

// 2️⃣ Parametre Alan Fonksiyon (Geri Dönüşsüz)
function greetUser(name: string): void {
    console.log(`Merhaba, ${name}!`);
}

greetUser("Ali"); // Çıktı: Merhaba, Ali!

// 3️⃣ Değer Döndüren Fonksiyon (return ile)
function getGreeting(name: string): string {
    return `Merhaba, ${name}!`; // Değeri dışarı döndürür
}

const mesaj = getGreeting("Zeynep");
console.log(mesaj); // Çıktı: Merhaba, Zeynep!


// 4️⃣ Toplama Yapan Fonksiyon (return ile)
function sum(a: number, b: number): number {
    return a + b; // Hesap sonucu döner
}

const toplam = sum(5, 10);
console.log("Toplam:", toplam); // Çıktı: Toplam: 15


// 5️⃣ Callback Fonksiyon (Fonksiyon parametre olarak alma)
function processData(data: number, callback: (result: number) => void): void {
    const islenmisVeri = data * 2;
    callback(islenmisVeri);
}

function printResult(result: number): void {
    console.log("Sonuç:", result);
}

processData(10, printResult); // Çıktı: Sonuç: 20


// 6️⃣ Fonksiyon Döndüren Fonksiyon (Higher Order Function)
function createMultiplier(multiplier: number): (value: number) => number {
    return function (value: number): number {
        return value * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // Çıktı: 10

const triple = createMultiplier(3);
console.log(triple(5)); // Çıktı: 15


/*
Callback-HOF Farkı
Callback Fonksiyonu: Başka bir fonksiyonun parametre olarak aldığı, işlem tamamlandığında çalıştırılan fonksiyondur.
Higher-Order Function (HOF): Bir fonksiyonun başka bir fonksiyonu parametre olarak alması veya bir fonksiyon döndürmesidir.
Özetle her callback, aslında bir hoftur.
* */
