# Nakhl — Hurma mağazası

Next.js 16.4.2 ve React 19 ile hazırlanmış Farsça, sağdan sola alışveriş sitesi demosu.

## Özellikler

- Telefon ve tablet uyumlu tasarım, açık/koyu tema.
- Sekiz örnek ürün, kategori filtreleri, arama ve favoriler.
- 500 g / 1 kg seçimi ve miktar değiştirilebilen sepet.
- Yerel görseller ve Vazirmatn yazı tipi.

Ürünler, fiyatlar ve görseller örnektir. Gerçek ödeme, sipariş kaydı, stok ve yönetim paneli bağlı değildir. Sepet ve favoriler oturum içinde bellekte tutulur; tema tercihi tarayıcıda saklanır.

## Yerel geliştirme

Node.js 24 LTS ve npm kullanılması önerilir.

```bash
npm ci
npm run dev
```

Tarayıcı: http://localhost:3000

## Test sunucusunda çalıştırma

```bash
npm ci
npm run build
npm start
```

Uygulama varsayılan olarak 3000 portunda çalışır. Sunucuda uygulamayı bir süreç yöneticisi veya container ile çalıştırıp alan adını HTTPS üzerinden bu porta yönlendirin. Bu demo için API anahtarı veya .env dosyası gerekmiyor.

```bash
npm audit --omit=dev
npm run lint
```

.next, node_modules, yerel tasarım notları, yedekler ve önizleme çıktıları Git'e dahil edilmez.
