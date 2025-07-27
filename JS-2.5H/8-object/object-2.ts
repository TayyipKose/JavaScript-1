// @ts-nocheck

// Kullanıcı tipi tanımlanıyor
interface User {
    name: string;
    age: number;
}

// Başlangıç verisi
let user: User = { name: "Ali", age: 30 };

// ✅ İMMUTABILITY NEDİR?
// Bir objeyi doğrudan değiştirmek yerine, kopyasını oluşturup o kopyayı güncelleriz.
// Bu yaklaşım, değişikliklerin daha kolay fark edilmesini ve performansın artmasını sağlar.
const updateUser = (user: User, newAge: number): User => {
    return { ...user, age: newAge }; // yepyeni bir obje döneriz
};

const updatedUser = updateUser(user, 31);
console.log("Yeni kullanıcı:", updatedUser); // { name: "Ali", age: 31 }

// ✅ METHOD BINDING (this sorununu çözmek)
// Class içerisindeki method'u bağlayarak her yerde doğru çalışmasını sağlarız.
class UserProfile {
    constructor(public user: User) {}

    // Arrow function kullandığımız için 'this' her zaman bu class'ı gösterecek
    displayUser = () => {
        console.log(`Kullanıcı: ${this.user.name}, Yaş: ${this.user.age}`);
    };
}

const profile = new UserProfile(updatedUser);

// Bu method'u başka bir değişkene atıyoruz ama yine de çalışıyor!
const show = profile.displayUser;
show(); // Kullanıcı: Ali, Yaş: 31

// ✅ STATE YÖNETİMİ (Redux/ngRx tarzı)
// Bir uygulamada state yönetimi yapılırken, doğrudan objeyi değiştirmek yerine
// yeni bir versiyonunu üretmek gerekir.
const updateUserState = (
    currentState: User,
    action: { type: string; payload: Partial<User> }
): User => {
    switch (action.type) {
        case "UPDATE_USER":
            return { ...currentState, ...action.payload }; // yine immutability
        default:
            return currentState;
    }
};

// Mevcut state
let userState = { name: "Ali", age: 30 };

// Aksiyon tanımlıyoruz (Redux mantığıyla)
const action = { type: "UPDATE_USER", payload: { age: 32 } };

// Yeni state'e geçiyoruz
userState = updateUserState(userState, action);
console.log("Güncellenmiş state:", userState); // { name: "Ali", age: 32 }

// 🔍 NEDEN BÖYLE YAPIYORUZ?
// - Objeyi doğrudan değiştirmek yerine yeni bir tane oluşturmak (immutability),
//   framework'lerin değişikliği fark etmesini kolaylaştırır.
// - Method'ları bağlayarak (binding), this kaybolmaz, özellikle callback olarak kullanıldığında sorun çıkmaz.
// - State yönetiminde immutable yaklaşım, özellikle Angular, React, Redux gibi yapılarla çalışırken olmazsa olmazdır.
//   Çünkü component'lar neyin değiştiğini ancak yeni objeler üzerinden anlayabilir.
