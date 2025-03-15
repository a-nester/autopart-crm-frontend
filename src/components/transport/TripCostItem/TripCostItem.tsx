import { Cost } from '@/types/types';
import { Box } from '@mui/material';

export default function TripCostItem({ cost }: { cost: Cost }) {
  return (
    <Box className="flex flex-row items-center justify-between p-1 w-full h-10 ">
      <p>{new Date(Number(cost.date)).toLocaleDateString()}</p>
      <p className="p-0">{cost.costType}</p>
      <p>
        {cost.price}
        {cost.currency}
      </p>
    </Box>
  );
}
