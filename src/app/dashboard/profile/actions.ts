"use server";

import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface ProfileFormState {
  success: boolean;
  message: string;
}

export interface CompanyProfile {
  id: string;
  clerk_auth_key: string;
  company_name: string;
  website_url: string | null;
  category: string | null;
  description: string | null;
  founder_name: string;
  founder_email: string | null;
  linkedin_url: string | null;
  created_at: string;
}

/* ── Fetch existing profile ─────────────────────────────────────────────────── */

export async function getExistingProfile(): Promise<CompanyProfile | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("company_profile")
    .select("*")
    .eq("clerk_auth_key", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return data as CompanyProfile | null;
}

/* ── Save / update profile ──────────────────────────────────────────────────── */

export async function saveProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  // 1. Get the logged-in Clerk user ID
  const { userId } = await auth();
  if (!userId) {
    return { success: false, message: "You must be signed in to save your profile." };
  }

  // 2. Parse form fields
  const company_name = (formData.get("company_name") as string)?.trim();
  const website_url  = (formData.get("website_url")  as string)?.trim() || null;
  const category     = (formData.get("category")     as string)?.trim() || null;
  const description  = (formData.get("description")  as string)?.trim() || null;
  const founder_name  = (formData.get("founder_name")  as string)?.trim();
  const founder_email = (formData.get("founder_email") as string)?.trim() || null;
  const linkedin_url  = (formData.get("linkedin_url")  as string)?.trim() || null;

  // 3. Basic validation
  if (!company_name) return { success: false, message: "Company name is required." };
  if (!founder_name) return { success: false, message: "Founder name is required." };

  // 4. Connect to Supabase (server-side)
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 5. Check whether a record already exists for this user
  const { data: existing, error: fetchError } = await supabase
    .from("company_profile")
    .select("id")
    .eq("clerk_auth_key", userId)
    .maybeSingle();

  if (fetchError) {
    console.error("Supabase fetch error:", fetchError.message);
    return { success: false, message: "Database error while checking for existing profile." };
  }

  if (existing) {
    // 6a. UPDATE — record found
    const { error: updateError } = await supabase
      .from("company_profile")
      .update({
        company_name,
        website_url,
        category,
        description,
        founder_name,
        founder_email,
        linkedin_url,
      })
      .eq("clerk_auth_key", userId);

    if (updateError) {
      console.error("Supabase update error:", updateError.message);
      return { success: false, message: "Failed to update your profile. Please try again." };
    }
  } else {
    // 6b. INSERT — no record yet
    const { error: insertError } = await supabase
      .from("company_profile")
      .insert({
        clerk_auth_key: userId,
        company_name,
        website_url,
        category,
        description,
        founder_name,
        founder_email,
        linkedin_url,
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError.message);
      return { success: false, message: "Failed to save your profile. Please try again." };
    }
  }

  // 7. Revalidate the dashboard so stats/activity reflect new data
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");

  return {
    success: true,
    message: existing
      ? "Profile updated successfully! 🎉"
      : "Profile created successfully! 🎉",
  };
}
