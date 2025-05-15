// @ts-nocheck

// Ürün tipi: Bir ürünün temel özelliklerini tanımlar
interface Product {
    id: string;
    name: string;
    price: number;
}

// Sepet öğesi: Bir ürün ve miktarını birleştirir
interface CartItem {
    product: Product;
    quantity: number;
}

class SimpleCart {
    // Private dizi: Sepet öğelerini tutar, dışarıdan doğrudan erişimi engeller
    private _items: CartItem[] = [];

    // Getter: Sepet içeriğini dışarıya güvenli bir kopya olarak döner
    // Neden kopya? Orijinal dizi değiştirilmesin, veri bütünlüğü korunsun
    get items(): CartItem[] {
        return [...this._items];
    }

    // Setter: Sepete ürün ekler veya mevcut ürünün miktarını günceller
    // Doğrulama: Negatif veya sıfır miktarı engeller
    set addItem(newItem: CartItem) {
        if (newItem.quantity <= 0) {
            console.log(`Hata: ${newItem.product.name} için miktar 0 veya negatif olamaz!`);
            return;
        }

        const index = this._items.findIndex(
            (item) => item.product.id === newItem.product.id
        );

        if (index >= 0) {
            // Ürün zaten varsa, miktarı güncelle
            this._items[index].quantity = newItem.quantity;
            console.log(`${newItem.product.name} miktarı güncellendi: ${newItem.quantity}`);
        } else {
            // Yeni ürün ekle
            this._items.push(newItem);
            console.log(`${newItem.product.name} sepete eklendi: ${newItem.quantity}`);
        }
    }

    // Getter: Sepet toplam fiyatını dinamik olarak hesaplar
    get totalPrice(): number {
        return this._items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);
    }

    // Yeni Getter: Sepetteki toplam ürün sayısını döner
    get totalItems(): number {
        return this._items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Yeni Setter: Belirli bir ürünün miktarını doğrudan günceller
    set updateQuantity({ productId, quantity }: { productId: string; quantity: number }) {
        const index = this._items.findIndex((item) => item.product.id === productId);

        if (index < 0) {
            console.log(`Hata: ID ${productId} olan ürün sepette bulunamadı!`);
            return;
        }

        if (quantity <= 0) {
            // Miktar 0 veya negatifse, ürünü sepetten kaldır
            const removedItem = this._items.splice(index, 1)[0];
            console.log(`${removedItem.product.name} sepetten kaldırıldı.`);
        } else {
            // Miktarı güncelle
            this._items[index].quantity = quantity;
            console.log(`${this._items[index].product.name} miktarı güncellendi: ${quantity}`);
        }
    }

    // Sepetten ürün silme metodu (ekstra işlevsellik)
    removeItem(productId: string): void {
        const index = this._items.findIndex((item) => item.product.id === productId);
        if (index >= 0) {
            const removedItem = this._items.splice(index, 1)[0];
            console.log(`${removedItem.product.name} sepetten kaldırıldı.`);
        } else {
            console.log(`Hata: ID ${productId} olan ürün sepette bulunamadı!`);
        }
    }
}

// KULLANIM ÖRNEĞİ

const cart = new SimpleCart();

const book: Product = { id: "b1", name: "Kitap", price: 100 };
const pen: Product = { id: "p1", name: "Kalem", price: 20 };

// 1. Sepete ürün ekleme
cart.addItem = { product: book, quantity: 2 }; // Kitap sepete eklendi
cart.addItem = { product: pen, quantity: 5 }; // Kalem sepete eklendi

// 2. Aynı ürünü güncelleme
cart.addItem = { product: book, quantity: 3 }; // Kitap miktarı güncellendi

// 3. Hatalı giriş denemesi
cart.addItem = { product: pen, quantity: -1 }; // Hata: Miktar negatif olamaz

// 4. Sepet içeriğini görüntüleme
console.log("Sepet içeriği:", cart.items);
// Çıktı: [{ product: { id: "b1", name: "Kitap", price: 100 }, quantity: 3 },
//         { product: { id: "p1", name: "Kalem", price: 20 }, quantity: 5 }]

// 5. Toplam fiyat ve ürün sayısını görüntüleme
console.log("Toplam fiyat:", cart.totalPrice); // 3*100 + 5*20 = 400
console.log("Toplam ürün sayısı:", cart.totalItems); // 3 + 5 = 8

// 6. Miktar güncelleme
cart.updateQuantity = { productId: "p1", quantity: 2 }; // Kalem miktarı güncellendi
console.log("Yeni sepet:", cart.items);

// 7. Ürün silme
cart.removeItem("b1"); // Kitap sepetten kaldırıldı
console.log("Son sepet:", cart.items);
console.log("Son toplam fiyat:", cart.totalPrice); // 2*20 = 40

/**
 * BU ÖRNEK NEYİ GÖSTERİYOR?
 * -----------------------------
 * Bu örnek, TypeScript ile bir alışveriş sepeti uygulamasını modelleyerek
 * getter ve setter’ların nasıl çalıştığını öğretir. Gerçek hayattaki bir
 * e-ticaret sistemine benzer bir yapı sunar.
 *
 * ÖĞRENİLEN KAVRAMLAR
 * --------------------
 * 1. **Getter Kullanımı**
 *    - `items`: Sepet içeriğini güvenli bir şekilde dışarıya verir.
 *    - `totalPrice`: Sepet toplamını dinamik olarak hesaplar.
 *    - `totalItems`: Sepetteki toplam ürün sayısını döner.
 *    - Getter’lar, sadece okuma (read-only) işlemleri için idealdir.
 *
 * 2. **Setter Kullanımı**
 *    - `addItem`: Yeni ürün ekler veya mevcut ürünün miktarını günceller.
 *    - `updateQuantity`: Belirli bir ürünün miktarını doğrudan değiştirir.
 *    - Setter’lar, veri doğrulama ve kontrollü güncelleme için kullanılır.
 *
 * 3. **Encapsulation (Kapsülleme)**
 *    - `_items` private olduğu için dışarıdan doğrudan erişilemez.
 *    - Getter/setter’lar ile kontrollü erişim sağlanır.
 *
 * 4. **Doğrulama (Validation)**
 *    - Setter’larda negatif miktar gibi hatalı girdiler engellenir.
 *    - Kullanıcı dostu hata mesajları gösterilir.
 *
 * 5. **Immutability (Değişmezlik)**
 *    - `get items` ile orijinal dizi yerine kopya döner, böylece veri korunur.
 *
 * 6. **Array Methodları**
 *    - `findIndex`: Ürün aramada kullanılır.
 *    - `reduce`: Toplam fiyat ve ürün sayısı hesaplamada kullanılır.
 *    - `splice`: Ürün silmede kullanılır.
 *
 * YAYGIN HATALAR VE ÇÖZÜMLER
 * --------------------------
 * - **Hata**: Setter’ı metod gibi çağırmak (`cart.addItem({ product, quantity })`).
 *   **Çözüm**: Setter’lar atama ile çalışır: `cart.addItem = { product, quantity }`.
 * - **Hata**: Private `_items` dizisine doğrudan erişmeye çalışmak.
 *   **Çözüm**: `_items` yerine `cart.items` getter’ını kullan.
 * - **Hata**: Setter’da doğrulama yapmamak, hatalı verilere izin vermek.
 *   **Çözüm**: `addItem` ve `updateQuantity` gibi setter’larda kontrol ekle.
 *
 * TEKNİK AKIŞ
 * ------------
 * 1. `SimpleCart` sınıfı ile sepet nesnesi oluşturulur.
 * 2. Ürünler (`book`, `pen`) tanımlanır ve sepete eklenir.
 * 3. Setter’lar ile miktar güncellenir veya yeni ürün eklenir.
 * 4. Getter’lar ile sepet içeriği, toplam fiyat ve ürün sayısı görüntülenir.
 * 5. Ürün silme ve hata durumları işlenir.
 *
 * NOTLAR
 * -------
 * - Getter’lar sadece veri okumak için, setter’lar ise veri yazmak/güncellemek içindir.
 * - Setter’lar, normal metodlardan farklı olarak `=` operatörü ile çalışır.
 * - Bu yapı, gerçek dünyada e-ticaret sepeti gibi sistemlerde kullanılan temel bir modeldir.
 */