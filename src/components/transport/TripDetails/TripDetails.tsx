import { Trip } from '@/types/types';
import { useState } from 'react';
import EditTrip from '../EditTrip/EditTrip';
import Modal from '@/components/Modal/Modal';
import TripDetailsInfo from '../TripDetailsInfo/TripDetailsInfo';
import TripCosts from '../TripCosts/TripCosts';

export default function TripDetails({ children }: { children: Trip }) {
  const [editIsOpen, setEditIsOpen] = useState(false);

  const handleEdit = () => {
    setEditIsOpen(true);
  };
  return (
    <section className="flex flex-col">
      <TripDetailsInfo trip={children} onEdit={handleEdit} />

      {children._id && <TripCosts tripId={children._id} />}
      {editIsOpen && (
        <Modal
          isOpen={editIsOpen}
          onClose={() => {
            setEditIsOpen(false);
          }}
        >
          <EditTrip
            onClose={() => {
              setEditIsOpen(false);
            }}
          >
            {children}
          </EditTrip>
        </Modal>
      )}
    </section>
  );
}
