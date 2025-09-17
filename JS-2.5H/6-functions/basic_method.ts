// TEMEL FONKSİYONLAR
// Bu dosya, JavaScript'teki temel fonksiyon türlerini içerir. Middle seviye için pratik senaryolar ve hata yönetimi vurgulanmıştır.


// 📌 Değer Döndüren: Stok değeri hesaplama Parametresiz ve Geri Dönüşsüz: Sistem durumu loglama
function logSystemStatus() {
    const status = { uptime: Date.now(), active: true };
    console.log(`Sistem durumu: ${JSON.stringify(status)}`);
}
logSystemStatus(); // Çıktı: Sistem durumu: {"uptime":<timestamp>,"active":true}


// 📌 Değer Döndüren: Stok değeri hesaplama Parametreli ve Geri Dönüşsüz: Kullanıcı verisini formatlama
function formatUserProfile(user, prefix = 'ID') {
    if (typeof user !== 'object' || !user.id || !user.name) {
        console.error('Hata: Geçersiz kullanıcı verisi');
        return;
    }
    console.log(`${prefix}-${user.id}: ${user.name}`);
}
formatUserProfile({ id: 'u1', name: 'Zeynep' }); // Çıktı: ID-u1: Zeynep


// 📌 Değer Döndüren: Stok değeri hesaplama
function calculateStockValue(product) {
    if (typeof product.price !== 'number' || typeof product.stock !== 'number') {
        throw new Error('Hata: Fiyat ve stok sayı olmalı');
    }
    return product.price * product.stock;
}
const laptop = { name: 'Laptop', price: 5000, stock: 10 };
console.log(`Stok değeri: ${calculateStockValue(laptop)} TL`); // Çıktı: Stok değeri: 50000 TL


// 📌 Değer Döndüren: Stok değeri hesaplama Çoklu Parametre ve Hata Kontrolü: Güvenli bölme
function safeDivide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Hata: Sayısal değer gerekli');
    }
    if (b === 0) throw new Error('Hata: Sıfıra bölme');
    return a / b;
}
try {
    console.log(`Bölme sonucu: ${safeDivide(10, 2)}`); // Çıktı: Bölme sonucu: 5
    console.log(safeDivide(10, 0)); // Hata fırlatır
} catch (error) {
    console.error(error.message);
}
/**
 * 📌 ÖĞRENİLEN KAVRAMLAR
 *
 * - Parametresiz fonksiyonlar: Basit loglama veya tek seferlik işlemler için idealdir.
 * - Parametreli fonksiyonlar: Dışarıdan bilgi alır, daha esnek kullanım sağlar.
 * - Değer döndüren fonksiyonlar: Hesaplama veya veri dönüşümü için `return` kullanılır.
 * - Hata yönetimi: `try-catch` ve tip kontrolü ile güvenli kod yazımı sağlanır.
 * - Tip kontrolü: `typeof` ile temel tiplerin (number, string, boolean) doğruluğu kontrol edilir.
 */
