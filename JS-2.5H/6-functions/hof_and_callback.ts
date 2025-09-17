// HIGHER-ORDER FUNCTIONS & CALLBACKS
// Bu dosya, HOF ve callback'leri içerir. Middle seviye için asenkron işlemler, closure ve array metodları vurgulanmıştır.

// 📌 HOF: Fonksiyon Parametresi Alan - Ödeme işlemi doğrulama
function processTransaction(validator, transaction) {
    if (typeof validator !== 'function' || typeof transaction !== 'object') {
        return 'Hata: Geçersiz parametre';
    }
    return validator(transaction) ? `İşlem ${transaction.id} onaylandı.` : `İşlem ${transaction.id} reddedildi.`;
}
function checkSufficientFunds(transaction) {
    return typeof transaction.amount === 'number' && transaction.amount <= 10000;
}
const payment = { id: 't1', amount: 5000 };
console.log(processTransaction(checkSufficientFunds, payment)); // Çıktı: İşlem t1 onaylandı.

// 📌 HOF: Fonksiyon Döndüren - Dinamik log formatlayıcı
function createLogger(level) {
    if (typeof level !== 'string') throw new Error('Hata: Log seviyesi string olmalı');
    return function(message, context) {
        const logEntry = `[${level.toUpperCase()}] ${message} ${context ? JSON.stringify(context) : ''}`;
        console.log(logEntry);
        return logEntry;
    };
}
const errorLogger = createLogger('error');
errorLogger('Bağlantı hatası', { code: 503 }); // Çıktı: [ERROR] Bağlantı hatası {"code":503}

// 📌 Değer Döndüren: Stok değeri hesaplamaAsenkron Callback: API simülasyonu
function fetchUserData(userId, callback) {
    if (typeof callback !== 'function') {
        console.error('Hata: Callback fonksiyon olmalı');
        return;
    }
    setTimeout(() => {
        if (typeof userId !== 'string' || !userId) {
            callback(new Error('Geçersiz kullanıcı ID'));
            return;
        }
        callback(`Kullanıcı ${userId} verileri alındı.`);
    }, 1000);
}
fetchUserData('u1', (result) => {
    if (result instanceof Error) console.error(result.message);
    else console.log(result); // Çıktı: Kullanıcı u1 verileri alındı.
});

// 📌  Değer Döndüren: Stok değeri hesaplama HOF + Array: Veri analizi
const orders = [
    { id: 'o1', total: 100, status: 'completed' },
    { id: 'o2', total: 200, status: 'pending' },
    { id: 'o3', total: 150, status: 'completed' }
];
const completedOrders = orders
    .filter(order => order.status === 'completed')
    .map(order => ({ ...order, formatted: `Sipariş ${order.id}: ${order.total} TL` }));
console.log(completedOrders); // Çıktı: [{id:'o1',total:100,status:'completed',formatted:'Sipariş o1: 100 TL'}, ...]

const totalCompleted = orders.reduce((sum, order) => {
    if (typeof order.total !== 'number') return sum;
    return order.status === 'completed' ? sum + order.total : sum;
}, 0);
console.log(`Tamamlanan sipariş toplamı: ${totalCompleted} TL`); // Çıktı: Tamamlanan sipariş toplamı: 250 TL

/**
 * 📌 ÖĞRENİLEN KAVRAMLAR
 *
 * 1. HOF (Higher-Order Function)
 *    - Fonksiyon alan veya fonksiyon döndüren fonksiyonlardır.
 *    - Kodunuzu daha esnek ve tekrar kullanılabilir yapar.
 *
 * 2. Callback
 *    - Başka bir fonksiyona parametre olarak gönderilen fonksiyon.
 *    - İşlem tamamlandığında çağrılır, özellikle asenkron işlemlerde çok önemlidir.
 *
 * 3. Closure
 *    - Dönen fonksiyon, kendi kapsamı dışında tanımlı değişkenleri hatırlar.
 *    - Örnek: fonksiyonun içinde dönen fonksiyon, dıştaki 'level' değişkenini kullanabilir.
 *
 * 4. Array HOF’ları
 *    - forEach, map, filter, reduce gibi metodlar fonksiyon alır.
 *    - Array üzerinde tekrar tekrar kod yazmadan işlem yapmayı sağlar.
 *
 * 5. Asenkron İşlemler
 *    - setTimeout veya API çağrıları ile yapılan işlemler.
 *    - Callback’ler sayesinde işlem tamamlandığında sonucu alabiliriz.
 *
 * 6. Tip Kontrolü
 *    - typeof veya TypeScript tipleri ile parametrelerin doğru olduğundan emin oluruz.
 *
 * 📌 Callback vs HOF
 *    - Callback: Fonksiyon parametre olarak gönderilir ve iş bitince çağrılır.
 *    - HOF: Fonksiyon parametre olarak alabilir veya fonksiyon döndürebilir.
 *    → Yani her callback kullanımı bir HOF örneğidir.
 *    → Ama her HOF callback değildir; bazıları sadece fonksiyon döndürür.
 */
