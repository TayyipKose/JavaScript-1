// @ts-nocheck
// ===== ORTA SEVİYE JS OBJE & STATE REHBERİ =====
// Bu blokta: Obje işlemleri, CRUD, destructuring, spread/rest, immutability ve state yönetimi gösteriliyor.

// 🔸 1️⃣ Obje Oluşturma ve Metotlar
const kullanici = {
  ad: "Ali",
  yas: 28,
  adres: { sehir: "İstanbul", ilce: "Kadıköy" },
  girisYap() { return `${this.ad} giriş yaptı.`; }
};

// 🔸 2️⃣ CRUD İşlemleri (Create / Read / Update / Delete)
kullanici.email = "ali@mail.com"; // Create
console.log(kullanici.ad);         // Read
kullanici.yas = 29;                // Update
delete kullanici.email;            // Delete

// 🔸 3️⃣ Destructuring: Objeyi parçalayarak değişken atama
const { ad, yas, adres: { sehir } } = kullanici;
console.log(ad, yas, sehir); // Ali 29 İstanbul

// 🔸 4️⃣ Spread Operatörü: Obje kopyalama + üzerine yazma
const yeniKullanici = { ...kullanici, abonelik: "Premium", yas: 30 };
console.log(yeniKullanici);

// 🔸 5️⃣ Rest Operatörü: Belirli özellikleri ayırıp geri kalanları al
const { girisYap, ...kalanBilgi } = yeniKullanici;
console.log(kalanBilgi);

// 🔸 6️⃣ Object Metotları
console.log(Object.keys(kullanici));        // ['ad','yas','adres','girisYap']
console.log(Object.values(kullanici));      // ['Ali', 29, {...}, ƒ]
console.log(Object.entries(kullanici));     // [['ad','Ali'], ...]
console.log(kullanici.hasOwnProperty("ad"));// true

// 🔸 7️⃣ JSON İşlemleri
const json = JSON.stringify(kullanici);
const objeyeDonus = JSON.parse(json);
console.log(objeyeDonus);

// 🔸 8️⃣ Derin Kopyalama (iç içe objeleri bozmaz)
const guncelAdresli = { ...kullanici, adres: { ...kullanici.adres, ilce: "Üsküdar" } };
console.log(guncelAdresli);

// 🔸 9️⃣ Obje Koruma: seal
Object.seal(kullanici);
kullanici.yas = 31;        // değişir
kullanici.yeniAlan = true; // eklenmez
delete kullanici.ad;       // silinmez
console.log(kullanici);

// 🔸 🔟 Mini Veri Yönetimi (CRUD örneği)
const veriYonetimi = {
  veriler: [],
  ekle(id, ad) { this.veriler.push({ id, ad }); },
  sil(id) { this.veriler = this.veriler.filter(v => v.id !== id); },
  guncelle(id, yeniAd) {
    const veri = this.veriler.find(v => v.id === id);
    if (veri) veri.ad = yeniAd;
  },
  listele() { return this.veriler; }
};
veriYonetimi.ekle(1, "Dosya A");
veriYonetimi.guncelle(1, "Dosya A1");
veriYonetimi.sil(2);
console.log(veriYonetimi.listele()); // [{id:1,ad:'Dosya A1'}]

// 🔸 1️⃣1️⃣ Immutability: Objeyi değiştirmek yerine kopyasını oluştur
interface User { name: string; age: number }
let user: User = { name: "Ali", age: 30 };
const updateUser = (user: User, newAge: number): User => ({ ...user, age: newAge });
const updatedUser = updateUser(user, 31);
console.log("Yeni kullanıcı:", updatedUser);

// 🔸 1️⃣2️⃣ Method Binding (this kaybını önleme)
class UserProfile {
  constructor(public user: User) {}
  displayUser = () => console.log(`Kullanıcı: ${this.user.name}, Yaş: ${this.user.age}`);
}
const profile = new UserProfile(updatedUser);
const show = profile.displayUser;
show(); // Kullanıcı: Ali, Yaş: 31

// 🔸 1️⃣3️⃣ State Yönetimi (Redux/ngRx tarzı)
const updateUserState = (currentState: User, action: { type: string; payload: Partial<User> }): User => {
  switch (action.type) {
    case "UPDATE_USER": return { ...currentState, ...action.payload }; // immutability
    default: return currentState;
  }
};
let userState = { name: "Ali", age: 30 };
const action = { type: "UPDATE_USER", payload: { age: 32 } };
userState = updateUserState(userState, action);
console.log("Güncellenmiş state:", userState);

// 🔹 Neden Bu Yaklaşım?
// - Objeyi doğrudan değiştirmek yerine yeni bir obje oluşturmak değişiklikleri fark etmeyi kolaylaştırır.
// - Method binding ile this kaybolmaz.
// - Immutable state, Angular/React/Redux gibi framework'lerde komponentlerin doğru tepki vermesini sağlar.
// - Spread/Rest + destructuring orta seviye JS objelerini yönetmek için kritik.
