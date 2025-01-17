import { priceWithDiscountCalc } from '@/app/helpers/priceWithDiscountCalc';
import { Product } from '@/types/types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import Image from 'next/image';
import { useStore } from '@/globalState/store';

export function TimersProductItem({
  product,
  shop,
}: {
  product: Product;
  shop: string[];
}) {
  const { setProductDiscountTimer } = useStore();
  const img = product?.images[0]?.thumbnail_url || '/images/no-image-100.png';
  const quatityInStock = product.quantity_in_stock;
  const discount = product.discount;
  const article = product.sku;
  let priceWithDiscount: number | null | undefined = product.price;

  if (discount && product.price !== null) {
    priceWithDiscount = priceWithDiscountCalc(product.price, product.discount);
  }
  // console.log(product, shop);
  // console.log('Shop', shop);

  const handleAddTimer = () => {
    // console.log({ shop: shop[0], productId: product.id });
    setProductDiscountTimer({
      shop,
      productId: 1234567890,
      dayDiscountType: 'percent',
      dayDiscount: 25,
      nightDiscountType: 'percent',
      nightDiscount: 35,
    });
  };
  return (
    <section
      className="max-w-[600px] min-h-28 p-1 border-[1px] border-[solid] border-[grey-50] 
    rounded-xl flex flex-row gap-2"
    >
      <div className="w-28 h-28">
        {img && (
          <Image
            className="rounded-lg object-cover"
            src={img}
            width={112}
            height={112}
            alt="product image"
          />
        )}
      </div>

      <div className="w-full">
        <Accordion
          className=" w-full rounded-xl bg-inherit"
          sx={{
            padding: 0,
            boxShadow: 'none',
            borderRadius: '12px',
            '&:before': { display: 'none' }, // Прибирає лінію перед Accordion
          }}
        >
          <AccordionSummary
            className="flex flex-col justify-between w-full border-none rounded-xl pl-3 pr-3 bg-inherit"
            style={{ width: '100%' }}
            sx={{
              m: 0,
              padding: 0,
              width: '100%',
              '&.MuiAccordionSummary-root': {
                // Стилізація для самого контейнера заголовка
                padding: '12px',
              },
              '& .MuiAccordionSummary-content': {
                // Стилізація для контенту в заголовку
                width: '100%',
                // fontSize: '14px',
                fontWeight: 'bold',
                color: `${quatityInStock ? 'black' : 'grey'}`,
              },
            }}
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
          <AccordionDetails
            className="flex flex-row justify-between p-3 rounded-xl bg-inherit"
            sx={{
              m: 0,
              padding: 0,
              width: '100%',
            }}
          >
            <div>
              <p>timer</p>
              <p>timer</p>
              <p>timer</p>
            </div>
            <button
              className="border-[2px] border-[solid] border-[#453eff] rounded-xl w-40 h-10"
              type="button"
              onClick={handleAddTimer}
            >
              {'Add discount timer'}
            </button>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default TimersProductItem;
