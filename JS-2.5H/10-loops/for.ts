// ==================== MIDDLE+ SEVİYE FOR DÖNGÜLERİ ====================
// Senaryo: Büyük ölçekli bir e-ticaret sistemi
// Amaç: Döngülerin farklı türlerini (for, for...of, for...in) ve advanced kullanımlarını göstermek
//@ts-nocheck

// -------------------------------
// VERİ SETİ
// -------------------------------
const orders = [
  { id: "o1", userId: "u1", amount: 120, status: "pending",   items: ["p1","p2"] },
  { id: "o2", userId: "u2", amount: 300, status: "completed", items: ["p3"] },
  { id: "o3", userId: "u1", amount: 80,  status: "completed", items: ["p2","p4"] },
  { id: "o4", userId: "u3", amount: 50,  status: "pending",   items: ["p5"] },
  { id: "o5", userId: "u2", amount: 500, status: "completed", items: ["p1","p6","p7"] }
];

const users = [
  { id: "u1", name: "Ali" },
  { id: "u2", name: "Ayşe" },
  { id: "u3", name: "Mehmet" }
];

// ===============================================================
// 1. Klasik for
// Completed siparişlerin toplamını hesapla
// ===============================================================
let totalCompleted = 0;
for (let i = 0; i < orders.length; i++) {
  if (orders[i].status === "completed") {
    totalCompleted += orders[i].amount;
  }
}
// ✅ Ne zaman klasik for? => İnce indeks kontrolü, geriye doğru dönmek, performans kritik durumlar

// ===============================================================
// 2. for...of
// Tekrarsız kullanıcıları bul
// ===============================================================
// for...of: Array veya Set, Map gibi "iterable" yapılarda doğrudan eleman döner
const uniqueUsers = new Set<string>();
for (const order of orders) {
  uniqueUsers.add(order.userId);
}
// ✅ Daha temiz, indeksle uğraşmadan array elemanlarını işler

// ===============================================================
// 3. for...in
// Obje property sıklığını bul
// ===============================================================
// for...in: Objelerin key’lerini döner (array’de kullanılmaz!)
const fieldFrequency: Record<string, number> = {};
for (const order of orders) {
  for (const key in order) {
    fieldFrequency[key] = (fieldFrequency[key] || 0) + 1;
  }
}
// ✅ Dikkat: Array’de for...in kullanma (string indeks döner, proto zincirine kadar gider)

// ===============================================================
// 4. İç içe for → OPTİMİZE VERSİYON
// Kullanıcıların completed sipariş ve item adetleri
// ===============================================================
// O(n^2) yerine O(n) yapmak için önce siparişleri Map’te grupla
const userStats: Record<string, { totalAmount: number; itemCount: number }> = {};
const orderMap = new Map<string, { totalAmount: number; itemCount: number }>();

for (const order of orders) {
  if (order.status !== "completed") continue;
  const prev = orderMap.get(order.userId) || { totalAmount: 0, itemCount: 0 };
  prev.totalAmount += order.amount;
  prev.itemCount += order.items.length;
  orderMap.set(order.userId, prev);
}

for (const user of users) {
  userStats[user.id] = orderMap.get(user.id) || { totalAmount: 0, itemCount: 0 };
}
// ✅ Nested for kalktı → Performans O(n)

// ===============================================================
// 5. break & continue
// Ali’nin ilk 200’den büyük completed siparişi
// ===============================================================
let specialOrder = null;
for (const order of orders) {
  if (order.userId !== "u1") continue;
  if (order.status !== "completed") continue;
  if (order.amount > 200) {
    specialOrder = order;
    break;
  }
}
// ✅ continue → gereksizleri atla, break → erken çıkış yap

// ===============================================================
// 6. Map kullanımı
// userId bazlı sipariş toplamları
// ===============================================================
const totals = new Map<string, number>();
for (const order of orders) {
  totals.set(order.userId, (totals.get(order.userId) || 0) + order.amount);
}
// ✅ Map avantajı: insertion order korur, key her şey olabilir

// ===============================================================
// 7. Manuel reduce
// En yüksek completed sipariş
// ===============================================================
let maxOrder = null;
for (const order of orders) {
  if (order.status !== "completed") continue;
  if (!maxOrder || order.amount > maxOrder.amount) {
    maxOrder = order;
  }
}

// ===============================================================
// ==================== ÖZET ====================
// - for: İndeks kontrolü / performans kritik
// - for...of: Array/Set/Map gibi iterable’larda en okunabilir yol
// - for...in: Objelerin key’leri için (array’de tercih etme)
// - break & continue: mantığı sadeleştirir, performansı artırır
// - Map/Set ile kombin → gerçek hayatta middle+ farkı
// - Nested for yerine Map/hash map ile optimizasyon yap → O(n^2) → O(n)
// ===============================================================
