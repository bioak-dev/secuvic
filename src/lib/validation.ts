const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{8,20}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  location: 200,
  details: 2000,
} as const;

export function validateBookingInput(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const service = String(body.service ?? "").trim();
  const dateStart = String(body.dateStart ?? "").trim();
  const dateEnd = String(body.dateEnd ?? "").trim();
  const timeStart = String(body.timeStart ?? "").trim();
  const timeEnd = String(body.timeEnd ?? "").trim();
  const pickup = String(body.pickup ?? "").trim();
  const dropoff = String(body.dropoff ?? "").trim();
  const passengers = String(body.passengers ?? "").trim();
  const details = String(body.details ?? "").trim();
  const consent = body.consent === true;

  if (!name || name.length > LIMITS.name) {
    return { error: "Nom invalide." };
  }
  if (!email || !EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return { error: "Email invalide." };
  }
  if (!phone || !PHONE_RE.test(phone) || phone.length > LIMITS.phone) {
    return { error: "Téléphone invalide." };
  }
  if (!["mise-a-disposition", "transfert", "evenement"].includes(service)) {
    return { error: "Type de service invalide." };
  }
  if (!dateStart || isNaN(Date.parse(dateStart))) {
    return { error: "Date de début invalide." };
  }
  if (dateEnd) {
    if (isNaN(Date.parse(dateEnd))) {
      return { error: "Date de fin invalide." };
    }
    if (Date.parse(dateEnd) < Date.parse(dateStart)) {
      return { error: "La date de fin doit être postérieure à la date de début." };
    }
  }
  if (!timeStart || !TIME_RE.test(timeStart)) {
    return { error: "Heure de prise en charge invalide." };
  }
  if (timeEnd && !TIME_RE.test(timeEnd)) {
    return { error: "Heure de fin invalide." };
  }
  if (!pickup || pickup.length > LIMITS.location) {
    return { error: "Lieu de prise en charge invalide." };
  }
  if (dropoff.length > LIMITS.location) {
    return { error: "Destination invalide." };
  }
  let passengersNum: number | null = null;
  if (passengers) {
    passengersNum = Number(passengers);
    if (!Number.isInteger(passengersNum) || passengersNum < 1 || passengersNum > 50) {
      return { error: "Nombre de passagers invalide." };
    }
  }
  if (details.length > LIMITS.details) {
    return { error: "Détails trop longs." };
  }
  if (!consent) {
    return { error: "Vous devez accepter la politique de confidentialité." };
  }

  return {
    data: {
      name,
      email,
      phone,
      service,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      pickup,
      dropoff,
      passengers: passengersNum,
      details,
    },
  };
}

export function isDemoAllowed() {
  if (process.env.ALLOW_DEMO_MODE === "true") return true;
  if (process.env.NODE_ENV === "development") return true;
  return false;
}
