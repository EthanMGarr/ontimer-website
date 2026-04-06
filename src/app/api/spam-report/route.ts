import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const phoneNumber = formData.get("phone_number") as string | null;
    const file = formData.get("file") as File | null;
    const encounterType = formData.get("encounter_type") as string | null;
    const occurredAt = formData.get("occurred_at") as string | null;
    const category = formData.get("category") as string | null;

    // Require at least phone OR file
    if (!phoneNumber && !file) {
      return NextResponse.json(
        { error: "Please enter a phone number or upload an image" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const supabase = createSupabaseServerClient();

    let fileUrl: string | null = null;

    // Upload file if present
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const ext = file.name.split(".").pop() ?? "bin";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("spam-uploads")
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

      if (uploadError) {
        console.error("[spam-report] Storage upload error:", uploadError);
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("spam-uploads")
        .getPublicUrl(uploadData.path);

      fileUrl = publicUrlData?.publicUrl ?? null;
    }

    // Insert into DB
    const { error: insertError } = await supabase
      .from("spam_reports")
      .insert({
        phone_number: phoneNumber,
        file_url: fileUrl,
        encounter_type: encounterType,
        occurred_at: occurredAt,
        category: category,
      });

    if (insertError) {
      console.error("[spam-report] INSERT ERROR:", insertError);
      throw insertError;
    }

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err: any) {
    console.error("[spam-report] Unexpected error FULL:", err);

    return NextResponse.json(
      {
        error:
          err?.message ||
          err?.error_description ||
          JSON.stringify(err) ||
          "Unknown error",
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}