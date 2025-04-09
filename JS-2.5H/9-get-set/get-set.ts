// @ts-nocheck
// ========== GETTER VE SETTER - MID LEVEL KONU ANLATIMI ==========
// Bu bölümde, getter ve setter'ı junior seviyesinin ötesine taşıyarak mid-level bir geliştiriciye hitap edeceğiz.
// Amaç: Gerçek projelerde kullanılabilir, performans odaklı ve karmaşık bir sistem tasarlamak.
// Senaryo: E-ticaret sepet yönetimi - stok kontrolü, indirim kodları, hata yönetimi ve immutable veri yapısı.

// -------------------
// 1. NEDEN GETTER/SETTER KULLANIYORUZ? (MID-LEVEL PERSPEKTİF)
// - **Kapsülleme (Encapsulation):** Private değişkenleri korur, dışarıya kontrollü arayüz sunar.
// - **Yan Etkiler:** Değer değiştiğinde veya okunduğunda iş mantığı çalıştırır (log, API çağrısı, state güncelleme).
// - **Performans:** Gereksiz yeniden hesaplamaları önler, önbellekleme (caching) sağlar.
// - **Hata Yönetimi:** Geçersiz veri girişini engeller, kullanıcıya anlamlı hatalar döndürür.
// - **Immutable Veri:** Orijinal veriyi bozmadan kopyalarla çalışır (React/Angular performans optimizasyonu).

// -------------------
// 2. ÖRNEK SENARYO: E-TİCARET SEPET SİSTEMİ
// Bir ShoppingCart class'ı oluşturacağız. Özellikler:
// - Ürün ekleme/güncelleme (stok kontrolü ile)
// - İndirim kodu uygulama
// - Toplam fiyat hesaplama (dinamik getter)
// - Sepet kapasite sınırı
// - Hata yönetimi ve loglama

// Tür tanımları
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

interface CartItem {
    product: Product;
    quantity: number;
    discount?: number; // Opsiyonel indirim yüzdesi
}

// Sepet yönetim class'ı
class ShoppingCart {
    private _items: CartItem[] = []; // Sepet öğeleri (private)
    private _maxItems: number = 10; // Maksimum sepet kapasitesi
    private _discountCodes: Map<string, number> = new Map([
        ["SAVE10", 10],
        ["SAVE20", 20],
    ]); // İndirim kodları
    private _totalCache: number | null = null; // Toplamı önbelleğe alma (performans için)

    constructor() {
        console.log("Sepet oluşturuldu.");
    }

    // Getter: Sepet öğelerini immutable şekilde döndürür
    get items(): CartItem[] {
        return [...this._items]; // Kopya döndürerek orijinali koruyoruz
    }

    // Setter: Sepete ürün ekler veya günceller
    set items(newItem: CartItem) {
        try {
            // Kapasite kontrolü
            if (this._items.length >= this._maxItems && !this._items.some(item => item.product.id === newItem.product.id)) {
                throw new Error("Sepet kapasitesi dolu!");
            }

            // Stok kontrolü
            if (newItem.quantity > newItem.product.stock) {
                throw new Error(
                    `${newItem.product.name} için yeterli stok yok! Mevcut: ${newItem.product.stock}`
                );
            }

            const existingItemIndex = this._items.findIndex(
                (item) => item.product.id === newItem.product.id
            );

            if (existingItemIndex >= 0) {
                // Ürün zaten varsa güncelle
                this._items[existingItemIndex].quantity = newItem.quantity;
                this._items[existingItemIndex].discount = newItem.discount;
                console.log(`${newItem.product.name} güncellendi.`);
            } else {
                // Yeni ürün ekle
                this._items.push({ ...newItem }); // Immutable kopya
                console.log(`${newItem.product.name} sepete eklendi.`);
            }

            // Toplam cache'ini sıfırla (değişiklik olduğu için)
            this._totalCache = null;
        } catch (error) {
            console.error("Hata:", error.message);
        }
    }

    // Getter: Toplam fiyatı dinamik hesaplar (önbellek ile performans)
    get totalPrice(): number {
        if (this._totalCache !== null) {
            console.log("Önbellekten döndü.");
            return this._totalCache; // Önbellek varsa kullan
        }

        const total = this._items.reduce((sum, item) => {
            const itemPrice = item.product.price * item.quantity;
            const discount = item.discount || 0;
            return sum + itemPrice * (1 - discount / 100);
        }, 0);

        this._totalCache = total; // Hesaplanan değeri önbelleğe al
        return total;
    }

    // Setter: İndirim kodu uygular
    set discountCode(code: string) {
        const discountPercentage = this._discountCodes.get(code);
        if (!discountPercentage) {
            console.error("Geçersiz indirim kodu!");
            return;
        }

        // Tüm ürünlere indirim uygula
        this._items = this._items.map((item) => ({
            ...item,
            discount: discountPercentage,
        }));

        this._totalCache = null; // Toplamı yeniden hesaplatmak için sıfırla
        console.log(`İndirim kodu ${code} (%${discountPercentage}) uygulandı.`);
    }

    // Getter: Sepet durumunu özetler
    get summary(): string {
        if (this._items.length === 0) return "Sepet boş.";
        return this._items
            .map((item) => `${item.product.name}: ${item.quantity} adet`)
            .join(", ") + ` | Toplam: ${this.totalPrice} TL`;
    }
}

// -------------------
// 3. KULLANIM ÖRNEĞİ
const cart = new ShoppingCart();

// Ürünler tanımla
const laptop: Product = { id: "p1", name: "Laptop", price: 5000, stock: 5 };
const mouse: Product = { id: "p2", name: "Mouse", price: 200, stock: 10 };

// Sepete ekle
cart.items = { product: laptop, quantity: 2 }; // Çıktı: "Laptop sepete eklendi."
cart.items = { product: mouse, quantity: 3 };  // Çıktı: "Mouse sepete eklendi."

// Sepet özetini al
console.log(cart.summary); // Çıktı: "Laptop: 2 adet, Mouse: 3 adet | Toplam: 10600 TL"

// Toplam fiyatı kontrol et
console.log(cart.totalPrice); // Çıktı: 10600 (2*5000 + 3*200)
console.log(cart.totalPrice); // Çıktı: "Önbellekten döndü." 10600 (tekrar hesaplanmadı)

// İndirim kodu uygula
cart.discountCode = "SAVE20"; // Çıktı: "İndirim kodu SAVE20 (%20) uygulandı."
console.log(cart.summary); // Çıktı: "Laptop: 2 adet, Mouse: 3 adet | Toplam: 8480 TL"

// Hatalı deneme
cart.items = { product: laptop, quantity: 10 }; // Çıktı: "Hata: Laptop için yeterli stok yok! Mevcut: 5"


// -------------------
// 4. NEDEN BU ŞEKİLDE TASARLADIK?
// - **Getter (items):** Immutable kopya döndürerek orijinal veriyi koruduk.
// - **Setter (items):** Stok ve kapasite kontrolü ile hata yönetimi yaptık.
// - **Getter (totalPrice):** Önbellekleme ile performansı optimize ettik.
// - **Setter (discountCode):** İndirim kodlarını merkezi bir yerden yönetip tüm sepete uyguladık.
// - **Getter (summary):** Kullanıcı dostu bir özet sunduk.

// -------------------
// 5. MİD-LEVEL İÇİN ÖNEMLİ NOKTALAR
// - **Performans:** totalPrice getter'ında önbellek kullanarak gereksiz hesaplamaları önledik.
// - **Hata Yönetimi:** Try-catch ile kullanıcıya anlamlı hatalar sunduk.
// - **Kapsülleme:** _items ve _discountCodes private tutularak dışarıdan manipülasyona kapattık.
// - **Esneklik:** discountCode setter'ı ile dinamik indirim yönetimi sağladık.

//6. MÜLAKAT İÇİN
// Mülakatlar İçin Tak Tak Cevaplar (Mid-Level)
// - Getter nedir, nasıl kullanırsın? "Private değişkeni okurken çalışır. Ör: Sepet toplamını getter ile önbellekleyerek hesapladım."
// - Setter ne işe yarar? "Değeri güncellerken kontrol ve yan etki ekler. Ör: Ürün eklerken stok kontrolü yapıp önbelleği sıfırladım."
// - Neden getter/setter? "Kapsülleme, hata yönetimi ve performans için. İş mantığını merkezileştirir."
// - Gerçek projede nasıl kullandın? "E-ticaret sepetinde getter ile immutable liste, setter ile stok ve indirim yönettim."
// - Performans nasıl etkilenir? "Getter’da önbellek ile hesaplamayı azalttım, setter’da gereksiz işlemleri engelledim."