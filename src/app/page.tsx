import { TodoContainer } from "@/components/TodoContainer";
import { Metadata } from "next";
import { connection } from "next/server";

export const instant = false;

export const metadata: Metadata = {
  title: "Testes com Vitest e Playwrigth",
};

export default async function Home() {
  await connection();

  return (
    <div>
      <TodoContainer />
    </div>
  );
}
