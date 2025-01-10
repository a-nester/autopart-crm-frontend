import { priceWithDiscountCalc } from '@/app/helpers/priceWithDiscountCalc';
import clsx from 'clsx';
import Image from 'next/image';

export function TimersProductItem({ product }) {
  const img = product?.images[0]?.thumbnail_url || null;
  const quatityInStock = product.quantity_in_stock;
  const discount = product.discount;
  let priceWithDiscount = product.price;
  if (discount) {
    priceWithDiscount = priceWithDiscountCalc(product.price, product.discount);
  }
  console.log(product);

  return (
    <section className="h-28 p-1 border-[1px] border-[solid] border-[grey-50] rounded-xl flex flex-row gap-2">
      {/* <div className="w-28 h-28 "> */}
      {img && (
        <Image
          className="rounded-lg object-contain"
          src={img}
          width={102}
          height={102}
          alt="product image"
        />
      )}
      {/* </div> */}
      <div>
        <p>{product.name}</p>
        <p>
          Ціна:
          <span className={clsx(quatityInStock && discount && 'line-through')}>
            {' '}
            {product.price}
          </span>
          {quatityInStock && discount && (
            <span className="font-bold text-red-700"> {priceWithDiscount}</span>
          )}
          {product.currency}
        </p>
      </div>
    </section>
  );
}

export default TimersProductItem;
