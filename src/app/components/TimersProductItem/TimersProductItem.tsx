import { priceWithDiscountCalc } from '@/app/helpers/priceWithDiscountCalc';
import { Product } from '@/types/types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import Image from 'next/image';

export function TimersProductItem({ product }: { product: Product }) {
  const img = product?.images[0]?.thumbnail_url || '/images/no-image-100.png';
  const quatityInStock = product.quantity_in_stock;
  const discount = product.discount;
  const article = product.sku;
  let priceWithDiscount: number | null | undefined = product.price;
  if (discount && product.price !== null) {
    priceWithDiscount = priceWithDiscountCalc(product.price, product.discount);
  }
  console.log(product);

  return (
    <section className="min-h-28 p-1 border-[1px] border-[solid] border-[grey-50] rounded-xl flex flex-row gap-2">
      <div className="w-28 h-28">
        {img && (
          <Image
            className="rounded-lg object-contain"
            src={img}
            width={102}
            height={102}
            alt="product image"
          />
        )}
      </div>

      {/* <div className=""> */}
      {/* <button className="flex justify-center border-t">
          Add discount timer
        </button> */}
      <Accordion className="rounded-xl w-full" sx={{ margin: 0 }}>
        <AccordionSummary
          className="p-1 flex flex-col justify-between w-full border-none rounded-xl"
          sx={{ m: 0 }}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="w-full">
            <p className="w-full text-[12px]">{product.name}</p>
            <div className="flex  flex-row justify-between">
              <p className="w-32">Код: {article}</p>
              <p
                className={clsx(
                  quatityInStock ? 'text-green-500' : 'text-red-500',
                )}
              >
                {quatityInStock ? 'В наявності' : 'немає в наявності'}
              </p>
              {product.price !== null ? (
                <p>
                  <span
                    className={clsx(
                      quatityInStock && discount && 'line-through',
                    )}
                  >
                    {product.price}&nbsp;
                    <span className="text-[12px]">{product.currency}</span>
                  </span>
                  {quatityInStock && discount && (
                    <p className="flex justify-end font-bold text-[18px] text-red-700">
                      {priceWithDiscount}{' '}
                      <span className="flex align-middle text-[12px]">
                        {' '}
                        &nbsp;{product.currency}
                      </span>
                    </p>
                  )}
                </p>
              ) : (
                'Вкажіть ціну'
              )}
            </div>
            {/* <button onClick={handleClick}>{element.name_multilang.uk}</button> */}
          </div>
        </AccordionSummary>
        <AccordionDetails className="p-1">
          {'Add discount timer'}
          <p>timer</p>
          <p>timer</p>
          <p>timer</p>
        </AccordionDetails>
      </Accordion>
      {/* </div> */}
    </section>
  );
}

export default TimersProductItem;
