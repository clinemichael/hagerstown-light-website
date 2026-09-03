import { NextResponse } from "next/server";

import { getCurrentWeather } from "@/lib/weather";

export async function GET() {
  try {
    const weather = await getCurrentWeather();
    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return NextResponse.json(
      { error: "Weather unavailable" },
      { status: 502 }
    );
  }
}
