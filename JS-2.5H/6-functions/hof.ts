// @ts-nocheck

// 1️⃣ Fonksiyonu Parametre Olarak Alan HOF
// Senaryo: Kütüphanede kitap ödünç alma işlemi
interface Book {
    id: string;
    title: string;
}

function processBook(processor: (book: Book, user: string) => string, book: Book, user: string): string {
    // HOF: processor fonksiyonunu parametre olarak alır ve çalıştırır
    return processor(book, user);
}

function lendBook(book: Book, user: string): string {
    return `${user}, "${book.title}" kitabını ödünç aldı.`;
}

const book1: Book = { id: "b1", title: "Sefiller" };
console.log(processBook(lendBook, book1, "Ali"));
// Çıktı: Ali, "Sefiller" kitabını ödünç aldı.
// Açıklama: processBook, lendBook fonksiyonunu parametre olarak alıp çalıştırıyor.
// Yaygın Hata: Processor fonksiyonunun yanlış tipte parametre alması (örn. string yerine number).



// 2️⃣ Fonksiyon Döndüren HOF
// Senaryo: E-ticarette indirim oranı belirleme
function applyDiscountRate(rate: number) {
    // HOF: İndirim oranına göre bir fonksiyon döner
    return (product: { name: string, price: number }, customer: string) => {
        const discountedPrice = product.price * (1 - rate / 100);
        return `${customer} için ${product.name}: ${discountedPrice} TL`;
    };
}

const studentDiscount = applyDiscountRate(10); // %10 indirim
const vipDiscount = applyDiscountRate(25);    // %25 indirim

const laptop = { name: "Laptop", price: 10000 };
console.log(studentDiscount(laptop, "Ayşe"));
// Çıktı: Ayşe için Laptop: 9000 TL
console.log(vipDiscount(laptop, "Veli"));
// Çıktı: Veli için Laptop: 7500 TL
// Açıklama: applyDiscountRate, indirim oranına bağlı bir fonksiyon üretiyor.
// Püf Nokta: Dönen fonksiyonun kapsamı (closure) rate değerini hatırlar.




// 3️⃣ HOF + Array Kullanımı
// Senaryo: Oyun platformunda kullanıcı istatistikleri
interface Player {
    username: string;
    score: number;
}

const players: Player[] = [
    { username: "Ali", score: 100 },
    { username: "Ayşe", score: 250 },
    { username: "Veli", score: 50 }
];

// forEach: Her oyuncu için bildirim
players.forEach(player => console.log(`${player.username} oyunda ${player.score} puan kazandı.`));
// Çıktı: Ali oyunda 100 puan kazandı. Ayşe oyunda 250 puan kazandı. Veli oyunda 50 puan kazandı.

// map: Oyuncuların lider tablosu girişleri
const leaderboard = players.map(player => `${player.username}: ${player.score} puan`);
console.log(leaderboard);
// Çıktı: ["Ali: 100 puan", "Ayşe: 250 puan", "Veli: 50 puan"]

// filter: Yüksek puanlı oyuncular
const highScorers = players.filter(player => player.score > 100);
console.log(highScorers);
// Çıktı: [{ username: "Ayşe", score: 250 }]

// reduce: Toplam puan hesaplama
const totalScore = players.reduce((sum, player) => sum + player.score, 0);
console.log(`Toplam puan: ${totalScore}`);
// Çıktı: Toplam puan: 400
// Açıklama: Array metodları (forEach, map, filter, reduce) HOF’dur çünkü callback fonksiyonu alır.
// Yaygın Hata: reduce’da başlangıç değeri (0) unutulursa hata oluşabilir.



// 4️⃣ Yetki Kontrolü - HOF ile
// Senaryo: Blog platformunda içerik yayınlama yetkisi
interface User {
    name: string;
    role: string;
}

function restrictByRole(requiredRole: string) {
    // HOF: Yetki kontrol fonksiyonu döner
    return (user: User) => user.role === requiredRole;
}

const onlyEditor = restrictByRole("editor");

const user1: User = { name: "Ali", role: "reader" };
const user2: User = { name: "Ayşe", role: "editor" };
console.log(onlyEditor(user1)); // Çıktı: false
console.log(onlyEditor(user2)); // Çıktı: true
// Açıklama: restrictByRole, belirli bir role göre yetki kontrolü yapan fonksiyon üretir.
// Püf Nokta: Closure sayesinde requiredRole değeri korunur.




// 5️⃣ Callback ile Asenkron İşlem
// Senaryo: Kargo teslimat bildirimi
function deliverPackage(customer: string, callback: (message: string) => void) {
    // HOF: Callback fonksiyonunu çalıştırır
    const message = `${customer} için kargo teslim edildi.`;
    callback(message);
}

deliverPackage("Veli", message => console.log(message));
// Çıktı: Veli için kargo teslim edildi.
// Açıklama: deliverPackage, işlemin sonucunu callback ile bildirir.
// Yaygın Hata: Callback fonksiyonunun undefined olması durumunda hata oluşabilir.




// 6️⃣ Komple HOF: Yetki + İşlem
// Senaryo: Oyun sunucusunda admin komutları
function restrictCommand(permissionCheck: (user: User) => boolean) {
    // HOF: Yetkiye bağlı işlem fonksiyonu döner
    return (user: User, callback: (message: string) => void) => {
        const message = permissionCheck(user)
            ? `${user.name} komutu çalıştırabilir!`
            : `${user.name} komutu çalıştıramaz!`;
        callback(message);
    };
}

const onlyAdmin = restrictByRole("admin");
const adminCommand = restrictCommand(onlyAdmin);

const user3: User = { name: "Ali", role: "player" };
const user4: User = { name: "Ayşe", role: "admin" };
adminCommand(user3, message => console.log(message));
// Çıktı: Ali komutu çalıştıramaz!
adminCommand(user4, message => console.log(message));
// Çıktı: Ayşe komutu çalıştırabilir!
// Açıklama: restrictCommand, yetki kontrolünü ve işlemi birleştirir.
// Püf Nokta: HOF’lar zincirleme kullanıldığında (restrictByRole -> restrictCommand) esneklik artar.

/**
 * ÖĞRENİLEN KAVRAMLAR
 * --------------------
 * 1. **HOF Tanımı**: Başka bir fonksiyonu parametre alan veya fonksiyon döndüren fonksiyonlar.
 * 2. **Callback’ler**: İşlemlerin sonucunu başka bir fonksiyona aktarmak için kullanılır.
 * 3. **Closure**: Dönen fonksiyonun dış kapsam değişkenlerini hatırlaması (örn. rate, requiredRole).
 * 4. **Array HOF’ları**: forEach, map, filter, reduce gibi metodlar fonksiyon alır.
 * 5. **Tip Güvenliği**: TypeScript ile parametre ve dönüş tipleri kontrol edilir.

 */