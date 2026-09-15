import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // మీ ఒరిజినల్ అడ్మిన్ ఈమెయిల్ ఐడి మరియు ఒక కొత్త పాస్‌వర్డ్
    const ADMIN_EMAIL = "vvsagar30@gmail.com";
    const ADMIN_PASSWORD = "password123"; // 👈 మీకు నచ్చిన స్ట్రాంగ్ పాస్‌వర్డ్ ఇక్కడ మార్చుకోండి

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        message: "లాగిన్ విజయవంతమైంది!",
        user: {
          name: "Vidya sagar V",
          email: "vvsagar30@gmail.com",
          role: "Project Owner"
        }
      });
    }

    return NextResponse.json(
      { success: false, message: "తప్పుడు ఈమెయిల్ లేదా పాస్‌వర్డ్!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: "సర్వర్ ఎర్రర్" }, { status: 500 });
  }
}
