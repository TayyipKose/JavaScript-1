let age = 12;  // Yaş değeri

// 1. Temel if-else yapısı
if (age >= 18) {
    console.log("Yetişkinsiniz.");
} else {
    console.log("Henüz yetişkin değilsiniz.");
}

// 2. İç içe if-else yapısı
if (age >= 18) {
    if (age >= 21) {
        console.log("Alkol içebilirsiniz.");
    } else {
        console.log("Yetişkinsiniz ama alkol yaşı gelmedi.");
    }
} else {
    console.log("Henüz yetişkin değilsiniz.");
}

// 3. Ternary Operator (Kısa if-else)
let result = age >= 18 ? "Yetişkinsiniz." : "Henüz yetişkin değilsiniz.";
console.log(result);

// 4. if-else if-else yapısı
let temperature = 25;
if (temperature > 30) {
    console.log("Hava çok sıcak.");
} else if (temperature >= 20) {
    console.log("Hava ılıman.");
} else {
    console.log("Hava soğuk.");
}

// 5. Koşul kombinasyonu
let isStudent = true;
let isMember = false;

if (isStudent || isMember) {
    console.log("İndirimli bilet alabilirsiniz.");
} else {
    console.log("İndirimli bilet alamazsınız.");
}

// 6. Negatif koşul ile if-else
let isLoggedIn = false;

if (!isLoggedIn) {
    console.log("Giriş yapmalısınız.");
} else {
    console.log("Hoş geldiniz!");
}
