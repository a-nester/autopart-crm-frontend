import { Skeleton } from '@mui/material';

export default function OrdersListSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 border rounded-lg shadow-md bg-white">
        {/* Верхня частина з магазинами */}
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="rectangular" width={100} height={30} />

        {/* Елементи замовлень */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col p-2 border rounded-lg">
            <div className="flex justify-between items-center">
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={50} height={20} />
            </div>
            <Skeleton variant="text" width="60%" height={15} />
            <div className="flex items-center gap-2">
              <Skeleton variant="rectangular" width={50} height={50} />
              <div className="flex flex-col flex-1">
                <Skeleton variant="text" width="90%" height={15} />
                <Skeleton variant="text" width="70%" height={15} />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={50} height={20} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
