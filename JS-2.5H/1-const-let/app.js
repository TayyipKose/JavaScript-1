// Temel Değişken Tanımlamaları ve Kullanımı

// 1. SABİT DEĞERLER İÇİN 'const' - Değer bir kez atanır ve değişmez
const SABIT_SAYI = 10;
console.log("Sabit sayı:", SABIT_SAYI); // Çıktı: 10


// 2. DEĞİŞEBİLEN DEĞERLER İÇİN 'let' - Değer güncellenebilen block scope değişken
let degisenSayi = 5;
console.log("Başlangıç değeri:", degisenSayi); // Çıktı: 5

degisenSayi = 12; // Değeri yeniden atıyoruz
console.log("Güncellenmiş değer:", degisenSayi); // Çıktı: 12

// BASİT TOPLAMA ÖRNEĞİ
let ilkSayi = 6;
let ikinciSayi = 14;
const sonucToplam = ilkSayi + ikinciSayi;
console.log("Toplam sonuç:", sonucToplam); // Çıktı: 20