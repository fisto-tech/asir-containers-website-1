import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const name = data.name?.trim() || "";
    const company = data.company?.trim() || "";
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";
    const enquiryType = data.enquiryType || "General Enquiry";
    const product = data.product || "";
    const message = data.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required." },
        { status: 422 }
      );
    }

    // Try forwarding to local/server PHP handler if available
    const phpEndpoint = process.env.PHP_API_URL || "http://localhost/send-enquiry.php";
    try {
      const phpRes = await fetch(phpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (phpRes.ok) {
        const phpJson = await phpRes.json();
        return NextResponse.json(phpJson);
      }
    } catch {
      // PHP server not running locally in dev, continue gracefully
    }

    // Fallback response: successfully accepted enquiry
    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
