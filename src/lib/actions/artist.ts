"use server";

import { redirect } from "next/navigation";
import { submitSearchSchema } from "../service/schema";

export async function searchArtist(formData: FormData) {
  const artist = formData.get("artist");

  return redirect(`/playlist/${artist}`);
}

type FormState = {
  artist: string;
};

export async function submitSearchAction(prev: FormState, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = submitSearchSchema.safeParse(formData);

  if (!parsed.success) {
    return redirect("/playlist");
  }

  const url = `/playlist/${parsed.data.artist}`;

  return redirect(url);
}
