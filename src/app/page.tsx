// import AddCompanyButton from '../components/add-company-button';
import Link from 'next/link';

export default function Home() {
  // console.log(headers());

  return (
    <main>
      <section className="flex flex-col items-center">
        {/* <AddCompanyButton /> */}
        <Link href={'/admin/orders'}>Admin</Link>
        <Link href={'/login'} className="hover:text-[blue]">
          Log in
        </Link>
      </section>
    </main>
  );
}
