// @ts-nocheck
// ================ TEMEL forEach KULLANIMI ================

// 1. Basit Dizi İşleme
const sayilar = [1, 2, 3];
sayilar.forEach(sayi => console.log(sayi * 2)); // Çıktı: 2, 4, 6

// 2. Nesne Dizileri ve any Kullanımı
const kullanicilar: any[] = [
  { id: 1, ad: "Ali", puan: 70 },
  { id: 2, ad: "Ayşe", puan: 85 }
];

// 2.1 Nesne Güncelleme
kullanicilar.forEach(k => k.puan += 5);
console.log(kullanicilar); // Puanlar 5 artar

// 2.2 Filtreleme Benzeri İşlem
const basarililar: string[] = [];
kullanicilar.forEach(k => k.puan > 75 && basarililar.push(k.ad));
console.log(basarililar); // Çıktı: ["Ayşe"]

// 3. Index ve Dizi Kullanımı
['a', 'b', 'c'].forEach((harf, index) => 
  console.log(`${index}. harf: ${harf}`)
);

// 4. Object.entries ile Nesne İterasyonu
const kisi = { ad: "Ali", yas: 30, meslek: "Mühendis" };
Object.entries(kisi).forEach(([anahtar, deger]) => 
  console.log(`${anahtar}: ${deger}`)
);

// ================ ÖNEMLİ UYARILAR ================
// 5. Return Kullanımı (Döngüyü durdurmaz)
[1, 2, 3, 4].forEach(num => {
  if (num === 3) return; // Sadece 3 atlanır
  console.log(num); // Çıktı: 1, 2, 4
});

// 6. Hatalı Kullanım Örnekleri
// 6.1 Break kullanılamaz
// sayilar.forEach(num => { if (num === 2) break; }); // HATA!

// 6.2 Yeni dizi oluşturmaz
// const yeniDizi = sayilar.forEach(num => num * 2); // UNDEFINED!

// ================ ALTERNATİFLER ================
// 7. Map (Yeni dizi oluşturur)
const kareler = sayilar.map(num => num * num);
console.log(kareler); // Çıktı: [1, 4, 9]

// 8. Filter (Filtreleme yapar)
const yuksekPuanlilar = kullanicilar.filter(k => k.puan > 75);
console.log(yuksekPuanlilar); // Çıktı: [{id: 2, ad: "Ayşe", puan: 90}]

// 9. for...of (Break/Continue kullanılabilir)
for (const num of sayilar) {
  if (num === 2) break;
  console.log(num); // Çıktı: 1
}

// ================ PRATİK ÖRNEKLER ================
// 10. DOM Manipülasyonu (Örnek)
const urunler = ["Laptop", "Telefon", "Tablet"];
/*
urunler.forEach(urun => {
  const li = document.createElement("li");
  li.textContent = urun;
  document.getElementById("urun-listesi")?.appendChild(li);
});
*/

// 11. API Yanıt İşleme
const apiYaniti: any[] = [
  { id: 1, baslik: "Gönderi 1", okunma: false },
  { id: 2, baslik: "Gönderi 2", okunma: true }
];

apiYaniti.forEach(gonderi => {
  !gonderi.okunma && console.log(`Yeni gönderi: ${gonderi.baslik}`);
});

// ================ MÜLAKAT BİLGİLERİ ================
/*
forEach vs map:
- forEach: Yan etki için, değer döndürmez
- map: Yeni dizi oluşturur, değer döndürür

forEach vs for...of:
- forEach: Array metodu, break yok
- for...of: Her iterable'da çalışır, break var
*/

//MÜLAKAT İPUÇLARI
// ÖĞRENİLENLER:
// 1. forEach: Array elemanlarını işler.
// 2. Array: Güncelleme ve raporlama için ideal.
// 3. Obje: Object.entries ile kullanılır.
// 4. Sınırlar: Break ve dönüş yok.

// MÜLAKAT SORULARI:
// - forEach ile for...of farkı? (forEach array metodu, for...of break destekler.)
// - forEach’in dönüş değeri? (Undefined.)

// HATALAR VE ÇÖZÜMLER:
// - **Hata**: Break kullanmak.
//   **Çözüm**: for...of kullan.
// - **Hata**: Yeni array beklemek.
//   **Çözüm**: Map kullan.