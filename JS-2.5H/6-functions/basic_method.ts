// @ts-nocheck
// ========================= MIDDLE-ADVANCED JS FONKSİYON ÖRNEĞİ =========================//

interface Product {
    code?: string;
    name?: string;
    price?: any;
    stock?: any;
    warehouse_id?: any;
    branch_id?: any;
    date?: string;
}

interface Warehouse {
    id: number;
    number: string;
}

interface Branch {
    id: number;
    number: string;
}

interface ProductDTO {
    code: string;
    price: number;
    stock: number;
    warehouse: number;
    branch: number;
    document_date: number;
}

class DataProcessor {
    warehouses: Warehouse[] = [{id: 1, number: 'W1'}, {id: 2, number: 'W2'}];
    branches: Branch[] = [{id: 1, number: 'B1'}, {id: 2, number: 'B2'}];
    processed: ProductDTO[] = [];

    async validateAndTransform(data: Product[]): Promise<{ processed: ProductDTO[]; errors: string[] }> {
        const errors: string[] = [];
        const validRows: ProductDTO[] = [];

        // 1️⃣ Temizle: boş satırları çıkar
        const filtered = data.filter(row =>
            Object.values(row).some(v => v !== null && v !== undefined && String(v).trim() !== '')
        );

        // 2️⃣ Satır satır doğrula
        for (let i = 0; i < filtered.length; i++) {
            const row = filtered[i];
            const rowErrors: string[] = [];

            if (!row.code) {
                rowErrors.push('Ürün Kodu eksik');
            }
            if (!row.date) {
                rowErrors.push('Tarih eksik');
            }

            // price ve stock sayı olmalı
            const price = Number(row.price);
            const stock = Number(row.stock);
            if (isNaN(price)) rowErrors.push('Fiyat geçersiz');
            if (isNaN(stock)) rowErrors.push('Stok geçersiz');

            // warehouse ve branch kontrol
            const warehouse = this.warehouses.find(w => w.number === String(row.warehouse_id));
            const branch = this.branches.find(b => b.number === String(row.branch_id));
            if (!warehouse) rowErrors.push('Depo geçersiz');
            if (!branch) rowErrors.push('Mağaza geçersiz');

            if (rowErrors.length) {
                errors.push(`Satır ${i + 1}: ${rowErrors.join(', ')}`);
                continue; // geçersiz satırı atla
            }

            // 3️⃣ Async doğrulama simülasyonu (örnek: API kontrol)
            await new Promise(resolve => setTimeout(resolve, 50)); // mock async

            // 4️⃣ DTO oluştur ve conditional field ekle
            const dto: ProductDTO = {
                code: String(row.code).trim(),
                price,
                stock,
                warehouse: warehouse.id,
                branch: branch.id,
                document_date: new Date(row.date!).getTime(),
                ...(stock > 100 && {bulk: true}) // conditional field
            };

            validRows.push(dto);
        }

        this.processed = validRows;
        return {processed: validRows, errors};
    }
}

// ------------------- ÇALIŞTIR ------------------- //
(async () => {
    const data: Product[] = [
        {
            code: 'P1',
            name: 'Laptop',
            price: '5000',
            stock: '10',
            warehouse_id: 'W1',
            branch_id: 'B1',
            date: '2025-09-25'
        },
        {code: '', name: 'Mouse', price: '150', stock: 'abc', warehouse_id: 'W2', branch_id: 'B2', date: '2025-09-25'},
        {code: 'P3', name: 'Klavye', price: 200, stock: 200, warehouse_id: 'W3', branch_id: 'B1', date: '2025-09-25'},
    ];

    const processor = new DataProcessor();
    const result = await processor.validateAndTransform(data);

    console.log('✅ İşlenmiş veriler:', result.processed);
    console.log('❌ Hatalar:', result.errors);
})();

/*
📌 ÖĞRENİLEN KAVRAMLAR:
- Object.values + filter: boş satırları temizleme
- type conversion: Number(), String()
- map/filter/find: array içi doğrulamalar
- async/await: satır satır API veya DB doğrulama simülasyonu
- conditional field: stock > 100 ise ekstra property ekleme
- error aggregation: tüm satırlardaki hataları tek array'de toplama
- DTO dönüşümü: ham veriyi entity veya export formatına çevirme
- try-catch yerine hataları collect etme: async blok içinde continue ile hata yönetimi
*/
