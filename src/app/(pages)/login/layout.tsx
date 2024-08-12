import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { session } = await validateRequest();

    if (session) {
        return redirect("/playlist");
    }

    return <main>{children}</main>;
}
