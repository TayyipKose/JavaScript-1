//String fonksiyonlar

let city = 'Ankara';

// 1. concat() - 'Ankara' kelimesine '_İstanbul' ekler
console.log(city.concat('_İstanbul')); // Çıktı: Ankara_İstanbul

// 2. replace() - İlk 'n' harfini 'N' ile değiştirir
console.log(city.replace('n', 'N')); // Çıktı: aNkara

// 3. replaceAll() - Tüm 'a' harflerini 'A' ile değiştirir
console.log(city.replaceAll('a', 'A')); // Çıktı: ANkArA

// 4. split() - 'Ankara' kelimesini karakterlere ayırır
console.log(city.split('')); // Çıktı: ['A', 'n', 'k', 'a', 'r', 'a']

// 5. split() + join() - Karakterleri ayırıp, aralarına virgül ekler
console.log(city.split('').join(',')); // Çıktı: A,n,k,a,r,a

// 6. substr() - 'Ankara' kelimesinin ilk 3 karakterini alır
console.log(city.substr(0, 3)); // Çıktı: Ank

// 7. toLocaleLowerCase() - 'Ankara' kelimesini küçük harfe dönüştürür
console.log(city.toLocaleLowerCase()); // Çıktı: ankara

// 8. toUpperCase() - 'Ankara' kelimesini büyük harfe dönüştürür
console.log(city.toUpperCase()); // Çıktı: ANKARA

// 9. trim() - Başındaki ve sonundaki boşlukları temizler
console.log(city.trim()); // Çıktı: Ankara (Boşluk olmadığı için değişmez)

// 10. includes() - 'Ankara' kelimesinde 'nkara' ifadesi var mı diye kontrol eder
console.log(city.includes('nkara')); // Çıktı: true

// 11. search() - 'Ankara' kelimesinde 'nk' ifadesinin indeksini arar
console.log(city.search('nk')); // Çıktı: 1

// 12. charAt() + toUpperCase() - 'Ankara' kelimesinin 3. indeksindeki harfi alır, büyük yapar
console.log(city.charAt(3).toUpperCase()); // Çıktı: A

// 13. indexOf() - 'Ankara' kelimesindeki ilk 'n' harfinin indeksini bulur
console.log(city.indexOf('n')); // Çıktı: 1

/**************************************************************************************************/
//Number fonksiyonlar

let numStr = '12.456778';

// 1. parseInt() - Tam sayıya dönüştürür
let intValue = parseInt(numStr);
console.log(intValue); // Çıktı: 12

// 2. parseFloat() - Ondalıklı sayıya dönüştürür
let floatValue = parseFloat(numStr);
console.log(floatValue); // Çıktı: 12.456778

// 3. toFixed() - Sayıyı belirtilen ondalıklı basamağa yuvarlar
let roundedToTwoDecimal = parseFloat(numStr).toFixed(2);
console.log(roundedToTwoDecimal); // Çıktı: 12.46

// 4. Number() - String'i sayıya dönüştürür
let numberValue = Number(numStr);
console.log(numberValue); // Çıktı: 12.456778

// 5. Math.round() - Sayıyı en yakın tam sayıya yuvarlar
let roundedValue = Math.round(floatValue);
console.log(roundedValue); // Çıktı: 12

