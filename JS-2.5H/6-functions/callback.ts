// ------------------ 1️⃣ Ana İşlem Fonksiyonu (Callback Bekler) ------------------
function processData(data: number, callback: (result: number) => void): void {
    console.log("Veri işleniyor...");
    callback(data * 2); // İşlem tamamlandığında callback fonksiyonunu tetikler
}

// Callback Fonksiyonu: Sonucu ekrana yazdıran fonksiyon
function printResult(result: number): void {
    console.log("Sonuç:", result);
}

// Kullanım: processData fonksiyonuna veriyi ve callback fonksiyonunu gönderiyoruz
processData(10, printResult); // Çıktı: Veri işleniyor... Sonuç: 20



// ------------------ 2️⃣ Asenkron İşlem (Callback ile) ------------------
function fetchData(callback: (result: string) => void): void {
    setTimeout(() => {
        // 2 saniye sonra callback fonksiyonu çağrılır (simüle edilmiş veri)
        callback("Veri başarıyla alındı!");
    }, 2000);
}

// Callback Fonksiyonu: Veriyi ekrana yazdıran fonksiyon
function displayData(message: string): void {
    console.log(message); // Alınan veriyi ekrana yazdırıyoruz
}

// Kullanım: fetchData fonksiyonu, displayData fonksiyonunu 2 saniye sonra çağıracak
fetchData(displayData); // Çıktı: Veri başarıyla alındı! (2 saniye sonra)



// ------------------ 3️⃣ Callback Fonksiyonunu Array ile Kullanma ------------------
function processArray(arr: number[], callback: (num: number) => void): void {
    arr.forEach(callback); // Array'deki her eleman için callback fonksiyonunu çağırıyoruz
}

// Callback Fonksiyonu: Sayının iki katını ekrana yazdıran fonksiyon
function printDouble(num: number): void {
    console.log(num * 2);
}

// Kullanım: processArray fonksiyonu, her sayı için printDouble fonksiyonunu callback olarak çağırır
processArray([1, 2, 3, 4], printDouble); // Çıktı: 2 4 6 8




// ------------------ 4️⃣ Örnek Senaryo: Banka Hesap Sorgulama ------------------
function checkBankBalance(accountId: string, callback: (balance: number, error?: string) => void): void {
    console.log(`${accountId} numaralı hesap sorgulanıyor...`);

    // Simüle edilmiş veritabanı
    const accounts = {
        "123456": 1500,
        "789012": 300,
        "456789": 7500
    };

    // 2 saniyelik gecikme simülasyonu (gerçek bir veritabanı sorgusunu temsil eder)
    setTimeout(() => {
        if (accounts[accountId]) {
            callback(accounts[accountId]); // Başarılı durum
        } else {
            callback(0, "Hesap bulunamadı!"); // Hata durumu
        }
    }, 2000);
}

// Callback Fonksiyonu: Banka bakiyesini işleyip ekrana yazdıran fonksiyon
function handleBalance(balance: number, error?: string): void {
    if (error) {
        console.error("Hata:", error); // Hata mesajını yazdırır
        return;
    }

    console.log(`Hesap bakiyeniz: $${balance}`);

    // Ekstra iş mantığı: Bakiye durumu kontrolü
    if (balance > 1000) {
        console.log("Tebrikler! Premium hesap statüsüne ulaştınız.");
    } else if (balance < 50) {
        console.log("Düşük bakiye! Lütfen hesabınızı besleyin.");
    }
}

// Kullanım: checkBankBalance fonksiyonu, handleBalance fonksiyonunu callback olarak çağırır
console.log("\n----- Senaryo 3: Geçersiz hesap -----");
checkBankBalance("000000", handleBalance); // Çıktı: Hata: Hesap bulunamadı!
