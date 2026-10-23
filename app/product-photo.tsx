import type { Product } from "./catalog";

export default function ProductPhoto({ product }: { product: Product }) {
  return <div role="img" aria-label={product.name} className="product-photo" style={{ backgroundImage: `url("${product.photo}")`, backgroundPosition: product.tile }} />;
}
