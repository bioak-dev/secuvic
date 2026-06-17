const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{8,20}$/;

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
  const date = String(body.date ?? "").trim();
  const location = String(body.location ?? "").trim();
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
  if (!date || isNaN(Date.parse(date))) {
    return { error: "Date invalide." };
  }
  if (!location || location.length > LIMITS.location) {
    return { error: "Lieu invalide." };
  }
  if (!details || details.length > LIMITS.details) {
    return { error: "Détails invalides." };
  }
  if (!consent) {
    return { error: "Vous devez accepter la politique de confidentialité." };
  }

  return {
    data: { name, email, phone, service, date, location, details },
  };
}

export function isDemoAllowed() {
  if (process.env.ALLOW_DEMO_MODE === "true") return true;
  if (process.env.NODE_ENV === "development") return true;
  return false;
}
