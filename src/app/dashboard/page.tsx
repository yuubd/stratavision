import { redirect } from "next/navigation";

export default function DashboardPage(): void {
	redirect("/dashboard/ai-summarize");
}
