// import AddCompanyButton from '../components/add-company-button';
import Link from 'next/link';

export default function Home() {
  // console.log(headers());

  return (
    <main>
      {/* <h1 className="flex flex-col text-xl">
        Home page {new Date().toTimeString()}
      </h1> */}
      <section className="flex flex-col items-center">
        {/* <AddCompanyButton /> */}
        <Link href={'/admin/dashboard'}>Dashboard</Link>
        <Link href={'/login'} className="hover:text-[blue]">
          Log in
        </Link>
      </section>
    </main>
  );
}
