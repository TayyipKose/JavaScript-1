// 1. Temel Switch-Case (Gün isimleri)
let day = 4;  // 1: Pazartesi, 2: Salı, 3: Çarşamba, 4: Perşembe, 5: Cuma
switch (day) {
    case 1:
        console.log("Pazartesi");
        break;
    case 2:
        console.log("Salı");
        break;
    case 3:
        console.log("Çarşamba");
        break;
    case 4:
        console.log("Perşembe");
        break;
    case 5:
        console.log("Cuma");
        break;
    default:
        console.log("Hafta sonu");
        break;
}

// 2. Birden fazla durumu tek bir case'te toplama
let grade = 'B';  // Not 'A', 'B', 'C' olabilir
switch (grade) {
    case 'A':
    case 'B':
        console.log("Başarılı");
        break;
    case 'C':
        console.log("Ortalama");
        break;
    default:
        console.log("Geçersiz not");
}

// 3. Kullanıcı girişine göre mesaj yazdırma (Orta seviye)
let userRole = 'admin';  // Kullanıcı rolü 'user', 'admin', 'guest' olabilir
switch (userRole) {
    case 'admin':
        console.log("Yönetici paneline hoş geldiniz.");
        break;
    case 'user':
        console.log("Hoş geldiniz, kullanıcı.");
        break;
    case 'guest':
        console.log("Ziyaretçi olarak giriş yaptınız.");
        break;
    default:
        console.log("Bilinmeyen rol.");
}

// 4. Numeric değerle işlem yapma
let score = 75;  // Puan, 0 ile 100 arasında
switch (true) {
    case (score >= 90):
        console.log("A+");
        break;
    case (score >= 80):
        console.log("A");
        break;
    case (score >= 70):
        console.log("B");
        break;
    case (score >= 60):
        console.log("C");
        break;
    default:
        console.log("D");
}

// 5. Kullanıcı inputunu yönetme (Orta seviye bir uygulama)
let action = 'delete';  // 'view', 'edit', 'delete' gibi işlemler
switch (action) {
    case 'view':
        console.log("Veri görüntüleniyor.");
        break;
    case 'edit':
        console.log("Veri düzenleniyor.");
        break;
    case 'delete':
        console.log("Veri siliniyor.");
        break;
    default:
        console.log("Geçersiz işlem.");
}
