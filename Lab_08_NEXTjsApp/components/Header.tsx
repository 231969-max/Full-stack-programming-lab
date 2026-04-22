import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">My Next.js App</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-200 transition-colors">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
