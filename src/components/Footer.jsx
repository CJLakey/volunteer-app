import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="space-x-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
        <p className="mt-2 text-xs text-gray-300">
          © 2024 All Saints of Russia Orthodox Church. All rights reserved.
        </p>
      </div>
    </footer>
  );
}