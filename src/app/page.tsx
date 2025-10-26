import { redirect } from "next/navigation";

export default function Home() {
  redirect('/books/recommended');
  return null;
}
