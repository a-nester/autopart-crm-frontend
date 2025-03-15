import Button from '@/components/CommonComponents/Button/Button';
import Modal from '@/components/Modal/Modal';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import NewCost from '../NewCost/NewCost';
import { useStore } from '@/globalState/store';
import TripCostItem from '../TripCostItem/TripCostItem';
import { Cost } from '@/types/types';

export default function TripCosts({ tripId }: { tripId: string }) {
  const { costsByParam, getCosts, deleteCosts } = useStore();

  const [isOpenAddCost, setIsOpenAddCost] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const costsFilter = { _id: tripId };
    getCosts(costsFilter);
  }, [getCosts, tripId]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const handleDelete = () => {
    deleteCosts(checkedItems);
    setCheckedItems({});
  };

  return (
    <Box
      component="section"
      className="overflow-y-auto"
      sx={{
        width: 'full',
        height: 'full',
        p: 0,
        border: '2px solid #dedede',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: 'full',
          height: '45px',
          p: 0,
          bgcolor: '#dedede',
          border: '2px solid #dedede',
          borderRadiusTop: 2,
        }}
        className="flex flex-row justify-end items-center"
      >
        <Box className="flex flex-row gap-1 justify-end p-[1px]">
          <Button className="rounded-lg" onClick={handleDelete}>
            -
          </Button>
          <Button
            onClick={() => {
              setIsOpenAddCost(true);
            }}
            className="rounded-lg"
          >
            +
          </Button>
        </Box>
      </Box>
      <form className="p-1 flex flex-col gap-1">
        {costsByParam.map((cost: Cost) =>
          cost._id ? (
            <label key={cost._id}>
              <Box className="flex flex-row items-center gap-1 border-solid border-[1px] rounded-lg p-1">
                <input
                  type="checkbox"
                  name={cost._id}
                  checked={!!checkedItems[cost._id]}
                  onChange={handleChange}
                />
                <TripCostItem cost={cost} />
              </Box>
            </label>
          ) : null,
        )}
      </form>
      <Modal isOpen={isOpenAddCost} onClose={() => setIsOpenAddCost(false)}>
        <NewCost tripId={tripId} onClose={() => setIsOpenAddCost(false)} />
      </Modal>
    </Box>
  );
}
