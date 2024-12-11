import Image from 'next/image';

export function TimersProductItem({ product }) {
  const img = product?.images[0]?.thumbnail_url || null;
  console.log(product);

  return (
    <section className="border-[1px] border-[solid] border-[black] rounded-lg">
      {img && (
        <Image
          src={img}
          width={120}
          height={120}
          alt="product image"
          className="rounded-lg"
        />
      )}

      {product.name}
    </section>
  );
}

export default TimersProductItem;
