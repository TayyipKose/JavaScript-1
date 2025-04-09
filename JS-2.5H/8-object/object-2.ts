// @ts-nocheck
// İmmutability ve Performans Optimizasyonu
interface User {
    name: string;
    age: number;
}

let user: User = { name: 'Ali', age: 30 };

// İmmutability kullanarak veriyi güncelliyoruz
const updateUser = (user: User, newAge: number): User => {
    // Burada eski veriyi değiştirmiyoruz, yeni bir user objesi döndürüyoruz.
    // Bu sayede Angular ve benzeri kütüphanelerde performans optimizasyonu sağlar,
    // çünkü eski objeyle yeni objenin kıyaslanması daha hızlıdır.
    return { ...user, age: newAge };
};

const updatedUser = updateUser(user, 31);

// Method Bağlama (Binding) ve Performans
class UserProfile {
    constructor(public user: User) {}

    // Method'u class içinde bağlayarak, her seferinde bağlama işlemi yapmadan kullanabiliriz.
    // Bu, performans açısından faydalıdır çünkü method bağlamayı constructor'da yapıyoruz
    // ve her yerde doğrudan kullanabiliriz.
    displayUser = () => {
        console.log(`Kullanıcı: ${this.user.name}, Yaş: ${this.user.age}`);
    }
}

const profile = new UserProfile(updatedUser);

// Method'u başka bir yerde kullanmadan önce bağlanmasını sağlıyoruz
const displayProfile = profile.displayUser;  // Burada method bağımsız olarak da çalışacaktır çünkü bağlama constructor'da yapıldı.

displayProfile();  // Çıktı: Kullanıcı: Ali, Yaş: 31

// State Yönetimi (Angular örneği)
const updateUserState = (currentState: User, action: { type: string, payload: User }): User => {
    // Burada state'i güncellerken immutability kullanıyoruz.
    // Çünkü doğrudan state değiştirildiğinde uygulamanın doğru şekilde güncellenmesi zorlaşır.
    // ngRx gibi state yönetim kütüphanelerinde, sadece yeni bir state objesi döndürmek önemli.
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...currentState, ...action.payload }; // Yeni state oluşturuluyor, eski state bozulmuyor
        default:
            return currentState;
    }
};

let userState = { name: 'Ali', age: 30 };

// Redux tarzı bir action gönderiyoruz
const action = { type: 'UPDATE_USER', payload: { age: 32 } };

// State'i güncelliyoruz
userState = updateUserState(userState, action);

console.log('Updated User State:', userState);  // Çıktı: Updated User State: { name: 'Ali', age: 32 }

// Neden bu yöntemleri seçtik?
// - **İmmutability:** Veriyi doğrudan değiştirmek yerine yeni bir obje oluşturmak, değişiklikleri daha kolay takip etmemizi sağlar.
//   Bu, Angular gibi framework'lerde yeniden render işlemlerinin düzgün çalışmasına olanak tanır ve performansı artırır.
// - **Method Bağlama:** Method bağlama işlemi constructor içinde yapılır, böylece her kullanımda method'ların bağlanması gerekmiyor. Bu da performansı artırır çünkü bağlama sadece bir kez yapılır.
// - **State Yönetimi:** State güncellerken immutability kullanmak, uygulamanın doğru şekilde çalışmasını sağlar. Eski state üzerinde değişiklik yapmadan yeni bir state objesi döndürmek, doğru bir şekilde component'ların yeniden render edilmesini sağlar.
//   ngRx gibi state yönetim kütüphanelerinde de bu yöntem tercih edilir çünkü state'in doğru şekilde değişmesini sağlamak ve geçmiş durumları korumak önemlidir.
