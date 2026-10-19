import { TodoContainer } from "@/components/TodoContainer";
import { connection } from "next/server";

export const instant = false;

export default async function Home() {
  await connection();

  return (
    <div>
      <TodoContainer />
    </div>
  );
}
