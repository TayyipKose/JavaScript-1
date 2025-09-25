// @ts-nocheck
// ========================= TYPE CONVERSION & TRUTHY/FALSY =========================//
// JavaScript'te değişkenler farklı tiplerde olabilir.
// Type conversion = bir değeri başka bir tipe çevirmek.
// Truthy/Falsy = bir değer Boolean bağlamında true mu false mu sayılır?

// ===== 1️⃣ IMPLICIT CONVERSION (Otomatik) =====
let x: any = "5" + 1;  // string + number => string
console.log(x, typeof x); // "51", string

let y: any = "5" - 1;    // string - number => number
console.log(y, typeof y); // 4, number

let z: any = "5" * "2";  // string * string => number
console.log(z, typeof z); // 10, number

// Mantık: + operatörü string ise diğerini de string yapar
// -, *, / operatörü sayısal işlem bekler, stringi sayıya çevirir.

// ===== 2️⃣ EXPLICIT CONVERSION (Manuel) =====

// 🔹 String -> Number
const str = "123";
console.log(Number(str));      // 123
console.log(parseInt(str));    // 123
console.log(parseFloat("12.34")); // 12.34

// 🔹 Number -> String
const sayi = 456;
console.log(String(sayi));      // "456"
console.log(sayi.toString());   // "456"

// 🔹 Boolean Conversion
console.log(Boolean(0));      // false
console.log(Boolean(""));     // false
console.log(Boolean(null));   // false
console.log(Boolean(undefined)); // false
console.log(Boolean(123));    // true
console.log(Boolean("text")); // true

// ===== 3️⃣ TRUTHY VE FALSY =====
// Falsy değerler: false, 0, -0, 0n, "", null, undefined, NaN
// Truthy: diğer tüm değerler (boş array, boş obje bile truthy)

const values = [0, "", null, undefined, NaN, "0", [], {}, "Hello"];
values.forEach(v => console.log(v, "->", Boolean(v)));

// Kısa kullanım
const value = "";
if (!value) console.log("Boş veya falsy bir değer"); // Çalışır çünkü "" falsy

// ===== 4️⃣ PRATİK ÖRNEKLER =====

// + operatörü string ile kullanıldığında
const a = "10";
const b = "5";
console.log(a + b); // "105"
console.log(Number(a) + Number(b)); // 15

// parseInt dikkat
console.log(parseInt("10px")); // 10
console.log(Number("10px"));   // NaN

// Boolean -> Number
console.log(Number(true));  // 1
console.log(Number(false)); // 0

// Type coercion operasyonları
console.log("5" + 2);  // "52"
console.log("5" - 2);  // 3
console.log(true + 2); // 3
console.log(false + 10); // 10

// ===== 5️⃣ KÜÇÜK FONKSİYON ÖRNEĞİ =====
function toNumber(input: any): number {
    const n = Number(input);
    if (isNaN(n)) {
        console.log(`${input} sayıya dönüştürülemez`);
        return 0;
    }
    return n;
}

console.log(toNumber("50"));   // 50
console.log(toNumber("abc"));  // abc sayıya dönüştürülemez 0
console.log(toNumber(true));   // 1
console.log(toNumber(false));  // 0

// ========================= MÜLAKAT NOTLARI =========================//
// • JS otomatik dönüştürür (implicit) ama kafa karıştırabilir => explicit conversion tercih edilir
// • parseInt ve parseFloat farkı: parseInt tamsayı alır, parseFloat ondalıklı alır
// • Truthy/Falsy: if, while gibi boolean bağlamlarda değerlerin nasıl yorumlandığını anlamak önemli
// • + operatörü: string + number => string olur, diğer matematiksel operatörler number bekler
// • Boolean conversion kısa yolları: if (!value) / if (value)
// • Mülakatlarda sorulabilecek:
//   - "0 == false mi?", "'' == false mi?", "null ve undefined farkı"
//   - "parseInt('10px') vs Number('10px') farkı"
//   - "Falsy ve Truthy değerler listesi"
//   - "Type coercion nedir ve nerede problem yaratabilir?"

// Özet: Implicit + explicit conversion, truthy/falsy mantığı ve type coercion JavaScript'in temel konularından
