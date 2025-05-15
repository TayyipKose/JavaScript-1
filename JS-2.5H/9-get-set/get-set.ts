// @ts-nocheck

// Ürün tipi
interface Product {
    id: string;
    name: string;
    price: number;
}

// Sepet öğesi
interface CartItem {
    product: Product;
    quantity: number;
}

class SimpleCart {
    private _items: CartItem[] = [];

    // Getter: Sepetteki ürünleri okuma (dışarıya kopya veriyoruz)
    get items(): CartItem[] {
        return [...this._items];
    }

    // Setter: Sepete ürün ekleme veya güncelleme
    set addItem(newItem: CartItem) {
        const index = this._items.findIndex(
            (item) => item.product.id === newItem.product.id
        );

        if (index >= 0) {
            // Ürün varsa, miktarı güncelle
            this._items[index].quantity = newItem.quantity;
            console.log(`${newItem.product.name} güncellendi.`);
        } else {
            // Yeni ürün ekle
            this._items.push(newItem);
            console.log(`${newItem.product.name} sepete eklendi.`);
        }
    }

    // Getter: Sepet toplam fiyatı
    get totalPrice(): number {
        return this._items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);
    }
}

// KULLANIM ÖRNEĞİ

const cart = new SimpleCart();

const book: Product = { id: "b1", name: "Kitap", price: 100 };
const pen: Product = { id: "p1", name: "Kalem", price: 20 };

// Sepete ürün ekle
cart.addItem = { product: book, quantity: 2 };
cart.addItem = { product: pen, quantity: 5 };

// Sepeti görüntüle
console.log(cart.items);
// Toplam fiyatı göster
console.log("Toplam:", cart.totalPrice); // 100*2 + 20*5 = 200 + 100 = 300

/**
 * Bu örnek neyi gösteriyor?
 * -----------------------------
 * Bu örnek, TypeScript ile **basit bir alışveriş sepeti (cart)** sınıfı tanımlayıp,
 * ürün ekleme, güncelleme ve toplam fiyat hesaplama gibi temel işlemleri kapsar.
 * Gerçek hayattaki e-ticaret mantığıyla benzer bir yapıyı modellemek için kullanılır.
 *
 * Öğrenilen Teknik ve Kavramlar:
 * ----------------------------------
 * 1. **Interface Kullanımı**
 *    - `Product` ve `CartItem` tipleri `interface` ile tanımlanmıştır.
 *    - Bu sayede her ürün ve sepet elemanı belirli bir yapıdadır.
 *
 * 2. **Encapsulation (Kapsülleme)**
 *    - Sepet öğeleri `_items` isimli `private` bir dizi içinde tutulur.
 *    - Böylece doğrudan dışarıdan erişim engellenir, veri bütünlüğü korunur.
 *
 * 3. **Getter - Setter Metotları**
 *    - `get items`: Sepetteki ürünleri dışarıya verir, fakat kopya döner (orijinal dizi bozulmaz).
 *    - `set addItem`: Sepete ürün ekler veya aynı ürün varsa sadece miktarını günceller.
 *    - `get totalPrice`: Sepetteki tüm ürünlerin toplam fiyatını dinamik olarak hesaplar.
 *
 * 4. **Array Methodları**
 *    - `findIndex()`: Sepette ürün olup olmadığını kontrol eder.
 *    - `reduce()`: Toplam fiyatı hesaplarken kullanılır.
 *
 * 5. **Sınıf Kullanımı (Class)**
 *    - `SimpleCart` sınıfı, bir alışveriş sepetinin mantığını kapsar.
 *    - Nesne yönelimli programlama prensipleriyle yazılmıştır (OOP - Object Oriented Programming).
 *
 * 6. **Immutability (Değişmezlik) Prensibi**
 *    - `get items()` içinde `return [...this._items]` ifadesiyle dışarıya orijinal dizi değil,
 *      bir kopyası verilir. Böylece dışarıdan `this._items` dizisi bozulamaz.
 *
 * Teknik Akış:
 * --------------
 * 1. `SimpleCart` sınıfından bir `cart` nesnesi oluşturuluyor.
 * 2. `Product` tipinde kitap ve kalem nesneleri tanımlanıyor.
 * 3. Sepete önce 2 kitap, sonra 5 kalem ekleniyor.
 * 4. Ürün sepette varsa `quantity` güncelleniyor, yoksa yeni ürün olarak ekleniyor.
 * 5. `cart.items` ile sepetin içeriği gösteriliyor.
 * 6. `cart.totalPrice` ile tüm ürünlerin toplam fiyatı hesaplanıyor.
 *
 *  Notlar:
 * ---------
 * - `set` fonksiyonu metod gibi çağrılmaz. Atama yapılır: `cart.addItem = {...}`
 * - Sepet içerisine aynı ürün 2 kez eklenirse, miktar güncellenir; kopya eklenmez.
 * - `console.log()` ile çıktılar hem güncelleme bilgisi verir hem sepeti görmemizi sağlar.
 */