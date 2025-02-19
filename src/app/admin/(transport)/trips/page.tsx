import Header from '@/components/header';
import TripsList from '@/components/transport/TripsList/TripsList';

const trips = [
  {
    id: '1802_1',
    driver: 'Петровець',
    truck: ['BK6443HI', 'BK4112XP'],
    startDate: '14.02.2025',
    endDate: '15.02.2025',
    startPoints: ['Березне'],
    endPoints: ['Кременчук'],
    rangeToStart: 25,
    range: 750,
    price: 25000,
  },
  {
    id: '1802_1',
    driver: 'Петровець',
    truck: ['BK6443HI', 'BK4112XP'],
    startDate: '18.02.2025',
    endDate: '19.02.2025',
    startPoints: ['Кременчуг'],
    endPoints: ['Черкаси', 'Тальне'],
    rangeToStart: 15,
    range: 300,
    price: 9500,
  },
];

export default function Page() {
  return (
    <>
      <Header>Список рейсів</Header>
      <TripsList trips={trips}></TripsList>
    </>
  );
}
