import { priceWithDiscountCalc } from '@/helpers/priceWithDiscountCalc';
import { Product } from '@/types/types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import Image from 'next/image';
import { useStore } from '@/globalState/store';
import { TimersComponent } from '../TimersComponent/TimersComponent';
import { ChangeEvent, useEffect, useState } from 'react';

export function TimersProductItem({
  product,
  shop,
}: {
  product: Product;
  shop: string;
}) {
  console.log(product);

  const { setProductDiscountTimer } = useStore();
  const img = product?.images[0]?.thumbnail_url || '/images/no-image-100.png';
  const available = product.presence === 'available' ? true : false;
  const discount = product.discount;
  const article = product.sku;
  const id = product.id;
  let priceWithDiscount: number | null | undefined = product.price;

  const [dayDiscount, setDayDiscount] = useState<number>(discount?.value || 0);
  const [dayDiscountType, setDayDiscountType] = useState(discount?.type || '');
  const [nightDiscount, setNightDiscount] = useState<number>(0);
  const [nightDiscountType, setNightDiscountType] = useState('');
  const [isActive, setIsActive] = useState(false);

  if (discount !== null && product.price !== null) {
    const isPerioded = true;
    priceWithDiscount = priceWithDiscountCalc(
      product.price,
      product.discount,
      isPerioded,
    );
  }

  useEffect(() => {
    if (
      dayDiscount &&
      dayDiscountType !== '' &&
      nightDiscount &&
      nightDiscountType !== ''
    ) {
      setIsActive(true);
    }
  }, [dayDiscount, dayDiscountType, nightDiscount, nightDiscountType]);

  const handleSetDayDiscount = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDayDiscount(Number(evt.target.value));
  };

  const handleSetDayDiscountType = (evt: SelectChangeEvent<string>) => {
    setDayDiscountType(evt.target.value);
  };

  const handleSetNightDiscount = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNightDiscount(Number(evt.target.value));
  };

  const handleSetNightDiscountType = (evt: SelectChangeEvent<string>) => {
    setNightDiscountType(evt.target.value);
  };

  const handleAddTimer = () => {
    setProductDiscountTimer({
      shop: shop[0],
      productId: product.id,
      dayDiscountType,
      dayDiscount,
      nightDiscountType,
      nightDiscount,
    });
  };

  const handleDeleteTimer = () => {
    console.log(product);
  };

  const handleAccordionChange = () => {};

  return (
    <section
      className="max-w-[600px] min-h-28 p-1 border-[1px] border-[solid] border-[grey-50] 
    rounded-xl flex flex-row gap-2"
    >
      <div className="w-full">
        <div
          className={clsx(
            'flex flex-row gap-3 w-full text-[14px] m-0 font-bold',
            available ? 'text-[black]' : 'text-[grey]',
          )}
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
          <div className="flex flex-col gap-2 w-full">
            <p className="w-full text-[12px]">{product.name}</p>
            <div className="flex  flex-row justify-between">
              <div>
                <p className="w-auto">Код: {article}</p>
                <p>id: {id}</p>
              </div>
              <div>
                <p
                  className={clsx(
                    available ? 'text-green-500' : 'text-red-500',
                  )}
                >
                  {available ? 'В наявності' : 'немає в наявності'}
                </p>
                {available && (
                  <p>
                    поточна знижка: {discount?.value}
                    {discount?.type === 'amount' ? 'грн' : '%'}
                  </p>
                )}
              </div>
              {product.price !== null ? (
                <div>
                  <span
                    className={clsx(available && discount && 'line-through')}
                  >
                    {product.price}&nbsp;
                    <span className="text-[12px]">{product.currency}</span>
                  </span>
                  {available && discount && (
                    <p className="flex justify-end font-bold text-[18px] text-red-700">
                      {priceWithDiscount}{' '}
                      <span className="flex align-middle text-[12px]">
                        {' '}
                        &nbsp;{product.currency}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                'Вкажіть ціну'
              )}
            </div>
            {/* <div>markers</div>  */}
          </div>
        </div>
        <Accordion
          className=" w-full rounded-xl bg-inherit"
          sx={{
            padding: 0,
            boxShadow: 'none',
            borderRadius: '12px',
            '&:before': { display: 'none' }, // Прибирає лінію перед Accordion
          }}
          onChange={handleAccordionChange}
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
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                width: '100%',
                // fontSize: '14px',
                margin: '0',
                fontWeight: 'bold',
                color: `${available ? 'black' : 'grey'}`,
              },
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            {' '}
          </AccordionSummary>
          <AccordionDetails
            className="flex flex-row gap-3 justify-between p-3 rounded-xl bg-inherit"
            sx={{
              m: 0,
              padding: 0,
              width: '100%',
            }}
          >
            <div className="flex flex-col gap-3">
              <TimersComponent
                price={product.price}
                discount={dayDiscount}
                setDiscount={handleSetDayDiscount}
                discountType={dayDiscountType}
                setDiscountType={handleSetDayDiscountType}
                name="Day discount"
              />
              <TimersComponent
                price={product.price}
                discount={nightDiscount}
                setDiscount={handleSetNightDiscount}
                discountType={nightDiscountType}
                setDiscountType={handleSetNightDiscountType}
                name="Night discount"
              />
            </div>

            <div className="flex flex-col justify-center gap-2">
              <button
                className={clsx(
                  'border-[2px] border-[solid] rounded-xl w-40 h-10',
                  isActive ? 'border-[#453eff]' : 'border-[#606061]',
                )}
                type="button"
                onClick={handleAddTimer}
                disabled={!isActive}
              >
                {'Add discount timer'}
              </button>
              <button
                className="border-[2px] border-[solid] border-[#453eff] rounded-xl w-40 h-10"
                type="button"
                onClick={handleDeleteTimer}
              >
                {'Delete timer'}
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
}

export default TimersProductItem;
