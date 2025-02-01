import Link from 'next/link';

// export interface NotFoundProps {}

export default function NotFound({}: object) {
  return (
    <div>
      <p>Something went wrong</p>
      <Link href="/companies" className="text-blue-500">
        Back to companies
      </Link>
    </div>
  );
}
