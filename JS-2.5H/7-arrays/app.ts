// @ts-nocheck
/// <reference lib="es2016.array.include" />

// 1️⃣ Array Tanımlama
const numbers: number[] = [1, 2, 3, 4, 5];  // Sayılardan oluşan array
const names: string[] = ["Ali", "Ayşe", "Mehmet"]; // Stringlerden oluşan array

// 2️⃣ Erişim ve Kullanım
console.log(numbers[0]);  // Çıktı: 1 (0. indeksteki değer)
console.log(names[2]);    // Çıktı: Mehmet (2. indeksteki değer)

// 3️⃣ Array'in Uzunluğunu Bulma
console.log(numbers.length);  // Çıktı: 5 (Array'in eleman sayısı)

// 4️⃣ Array'e Eleman Ekleme
names.push("Zeynep");  // "Zeynep" adlı eleman array'e eklenir
console.log(names);  // Çıktı: ["Ali", "Ayşe", "Mehmet", "Zeynep"]

// 5️⃣ Array'den Eleman Silme
names.pop();  // Son eleman "Zeynep" silinir
console.log(names);  // Çıktı: ["Ali", "Ayşe", "Mehmet"]

// 6️⃣ Array ile Eleman Güncelleme
const fruits = ["Elma", "Armut", "Muz"];
fruits[1] = "Karpuz";  // Armut'u Karpuz ile değiştirir
console.log(fruits);  // Çıktı: ["Elma", "Karpuz", "Muz"]

// 7️⃣ Array'de Eleman Arama
const colors = ["Kırmızı", "Yeşil", "Mavi"];
console.log(colors.includes("Yeşil"));  // Çıktı: true
console.log(colors.includes("Sarı"));   // Çıktı: false

// 8️⃣ Array'de Eleman Bulma
const animals = ["Köpek", "Kedi", "Kuş"];
console.log(animals.indexOf("Kedi"));  // Çıktı: 1 (Kedi'nin indeksi 1'dir)
console.log(animals.indexOf("Tavşan"));  // Çıktı: -1 (Bulunmazsa -1 döner)

// 9️⃣ Array'i Sıralama
const numbers2 = [5, 2, 8, 1, 9];
numbers2.sort();  // Varsayılan sıralama (alfabetik sıralama)
console.log(numbers2);  // Çıktı: [1, 2, 5, 8, 9]

const numbers3 = [5, 2, 8, 1, 9];
numbers3.sort((a, b) => a - b);  // Sayısal sıralama
console.log(numbers3);  // Çıktı: [1, 2, 5, 8, 9]

// 🔟 Array'i Ters Çevirme
const reversedNumbers = [1, 2, 3, 4, 5];
reversedNumbers.reverse();  // Array'i tersine çevirir
console.log(reversedNumbers);  // Çıktı: [5, 4, 3, 2, 1]

// 1️⃣1️⃣ => Array'den Belirli Bir Aralıkta Eleman Alma
const _numbers = [11, 12, 13, 14, 15, 16, 17, 18, 19];

// İlk 5 Elemanı Alma
console.log(_numbers.slice(0, 5));  // Çıktı: [11, 12, 13, 14, 15]

// Son 4 Elemanı Alma
console.log(_numbers.slice(-4));  // Çıktı: [16, 17, 18, 19]

// İlk 3 Elemanı Alma
console.log(_numbers.slice(0, 3));  // Çıktı: [11, 12, 13]

// Ortadaki Elemanları Alma
console.log(_numbers.slice(3, 6));  // Çıktı: [14, 15, 16]

// **Bonus**: Son 3 Elemanı, İlk 5'e Dahil Etmeden Alma
console.log(_numbers.slice(5, 8));  // Çıktı: [16, 17, 18]

/*
Notlar
slice(start, end): Array'den belirtilen başlangıç ve bitiş indeksleri arasındaki elemanları alır. Bitiş indeksi dahil edilmez!
reverse(): Array'i tersine çevirir. Son eleman ilk, ilk eleman son olur.
sort(): Array'i alfabetik veya sayısal olarak sıralar. Varsayılan sıralama alfabetiktir.
indexOf(searchElement): Array içinde belirli bir elemanın ilk bulunduğu indeksi döner. Bulamazsa -1 döner.
includes(searchElement): Array'in belirtilen elemanı içerip içermediğini true veya false olarak döner.
push(element): Array'in sonuna yeni bir eleman ekler.
pop(): Array'in son elemanını çıkarır ve döner.
shift(): Array'in ilk elemanını çıkarır ve döner.
unshift(element): Array'in başına yeni bir eleman ekler.

*/
