import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const phoneNumber = formData.get("phone_number") as string | null;
    const file = formData.get("file") as File | null;
    const encounterType = formData.get("encounter_type") as string | null;
    const occurredAt = formData.get("occurred_at") as string | null;
    const category = formData.get("category") as string | null;

    // At least one of phone_number or file is required
    if (!phoneNumber && !file) {
      return NextResponse.json(
        { error: "Please enter a phone number or upload an image" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    let fileUrl: string | null = null;

    // Upload file if present
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = file.name.split(".").pop() ?? "bin";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("spam-uploads")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("[spam-report] Storage upload error:", uploadError);
        return NextResponse.json(
          { error: "File upload failed. Please try again." },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("spam-uploads")
        .getPublicUrl(uploadData.path);

      fileUrl = publicUrlData?.publicUrl ?? null;
    }

    // Insert row into spam_reports
    const { error: insertError } = await supabase.from("spam_reports").insert({
      phone_number: phoneNumber || null,
      file_url: fileUrl,
      encounter_type: encounterType || null,
      occurred_at: occurredAt || null,
      category: category || null,
    });

    if (insertError) {
      console.error("[spam-report] DB insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save report. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[spam-report] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
