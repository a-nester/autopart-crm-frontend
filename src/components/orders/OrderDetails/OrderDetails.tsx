import { Order, OrderProduct } from '@/types/types';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <Box>
      {
        <ul className="flex flex-col gap-1">
          {order.products.map((product: OrderProduct, idx: number) => (
            <li key={idx}>
              <Box
                display="flex"
                alignItems={'center'}
                gap={1}
                className="h-12 border rounded-xl p-1"
              >
                <div className="max-w-12 min-w-10 max-h-12 min-h-10 object-contain p-1">
                  <Image
                    className="rounded-lg object-contain w-full h-full"
                    src={product.image}
                    alt="product image"
                    width={25}
                    height={25}
                  />
                </div>

                <Box className="flex w-full max-w-full gap-2 justify-between items-center">
                  <Typography>{product.sku}</Typography>
                  <Typography
                    className="text-xs"
                    sx={{
                      //   whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 'auto', // змінюй під свої потреби
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                      maxWidth: 'auto',
                    }}
                  >
                    {product.price}
                  </Typography>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      }
    </Box>
  );
}
