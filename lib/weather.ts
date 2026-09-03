// Hagerstown, MD
const LAT = 39.6418;
const LON = -77.72;

const USER_AGENT =
  "(hld-operations-portal, ops@hagerstownlightdept.org)";

export type CurrentWeather = {
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
  isDaytime: boolean;
};

export async function getCurrentWeather(): Promise<CurrentWeather> {
  const pointsRes = await fetch(
    `https://api.weather.gov/points/${LAT},${LON}`,
    {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 1800 },
    }
  );

  if (!pointsRes.ok) {
    throw new Error("Unable to resolve forecast grid");
  }

  const points = await pointsRes.json();
  const forecastUrl: string = points.properties.forecast;

  const forecastRes = await fetch(forecastUrl, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 1800 },
  });

  if (!forecastRes.ok) {
    throw new Error("Unable to load forecast");
  }

  const forecast = await forecastRes.json();
  const current = forecast.properties.periods[0];

  return {
    temperature: current.temperature,
    temperatureUnit: current.temperatureUnit,
    shortForecast: current.shortForecast,
    isDaytime: current.isDaytime,
  };
}
