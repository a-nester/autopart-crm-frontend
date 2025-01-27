import AddCompanyButton from '../components/add-company-button';
import Link from 'next/link';

export default function Home() {
  // console.log(headers());

  return (
    <main>
      <h1 className="text-xl">Home page {new Date().toTimeString()}</h1>
      <AddCompanyButton />
      <Link href={'/dashboard'}>Dashboard</Link>
    </main>
  );
}
