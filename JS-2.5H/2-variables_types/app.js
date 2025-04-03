// 1. Primitive Veri Türleri

let sayi = 10;
let ad = "Ahmet";
let isActive = true;
let kisi;  // Undefined: Değer atanmamış değişken
let nothing = null;  //Boş değer, Bilerek boş bırakılan değer
/************************************************************/

// 2. Non-Primitive Veri Türleri

let kisi = { name: "Ahmet", age: 25 }; // Object: Anahtar-değer çiftleri ile veri grubu


let sayilar = [1, 2, 3, 4]; // Array: Sıralı veri koleksiyonu

let fonksiyon = function() { // Function: Fonksiyon (object türüdür)
    console.log("Hello World!");
};

/*
Primitive türler doğrudan değer taşıyan türlerdir ve kopyalanan her örnek, orijinalden bağımsızdır.
Non-Primitive türler (nesneler ve diziler gibi) referansla taşınır, yani değişkenin kendisi değil, bellekteki adresi kopyalanır.
*/
