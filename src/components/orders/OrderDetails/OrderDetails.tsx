'use client';

import { Order, OrderProduct } from '@/types/types';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function OrderDetails({ order }: { order: Order }) {
  return (
    <ul className="flex flex-col gap-1">
      {order.products.map((product: OrderProduct, idx: number) => (
        <li key={idx}>
          <Box
            display="flex"
            alignItems={'center'}
            gap={1}
            className="h-auto border rounded-xl p-1"
          >
            <div className="max-w-12 max-h-12 min-h-10 object-contain p-1">
              <Image
                className="rounded-lg object-contain w-full h-full"
                src={product.image}
                alt="product image"
                width={25}
                height={25}
              />
            </div>

            <Box className="flex flex-col w-full max-w-full gap-0 justify-between items-center">
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 'auto',
                }}
              >
                <span className="text-purple-600">Art:</span>
                {product.sku}
              </Typography>
              <div className="w-full h-[1px] bg-black"></div>
              <Typography
                sx={{
                  fontSize: '12px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // обмежує до двох рядків
                  textOverflow: 'ellipsis',
                  maxWidth: '100%', //
                }}
              >
                {product.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                maxWidth: 'auto',
              }}
            >
              {product.price}
            </Typography>
          </Box>
        </li>
      ))}
    </ul>
  );
}
