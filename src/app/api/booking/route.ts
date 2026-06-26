import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";
import { validateBookingInput } from "@/lib/validation";
import { COMPANY_NAME, SERVICE_NAME, SERVICE_TAGLINE } from "@/lib/company";

const serviceLabels: Record<string, string> = {
  "mise-a-disposition": "Mise à disposition (Heure/Jour)",
  transfert: "Transfert Aéroport/Hôtel",
  evenement: "Événement spécial (Festival, etc.)",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBookingInput(body);

    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const {
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
      passengers,
      details,
    } = validation.data;

    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || `${SERVICE_NAME} <onboarding@resend.dev>`;

    if (!process.env.RESEND_API_KEY || !contactEmail) {
      return NextResponse.json(
        { error: "Configuration e-mail manquante." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const serviceLabel = serviceLabels[service] || service;

    const periode = dateEnd && dateEnd !== dateStart
      ? `Du ${dateStart} au ${dateEnd}`
      : dateStart;
    const horaire = timeEnd ? `${timeStart} → ${timeEnd}` : `À partir de ${timeStart}`;
    const trajet = dropoff ? `${pickup} → ${dropoff}` : pickup;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(serviceLabel);
    const safePeriode = escapeHtml(periode);
    const safeHoraire = escapeHtml(horaire);
    const safeTrajet = escapeHtml(trajet);
    const safePassengers = passengers != null ? escapeHtml(String(passengers)) : "—";
    const safeDetails = details ? escapeHtml(details) : "—";

    const row = (label: string, value: string) =>
      `<tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; width: 160px; vertical-align: top;">${label}</td><td style="padding: 12px 0; color: #fff;">${value}</td></tr>`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `[${SERVICE_NAME}] Nouvelle demande — ${name} — ${trajet}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px;">
          <h1 style="color: #d4af37; font-size: 24px; margin-bottom: 8px;">${SERVICE_NAME}</h1>
          <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">Service de ${COMPANY_NAME}</p>
          <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px;">Nouvelle demande de réservation</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${row("Nom", safeName)}
            ${row("Email", safeEmail)}
            ${row("Téléphone", safePhone)}
            ${row("Service", safeService)}
            ${row("Période", safePeriode)}
            ${row("Horaire", safeHoraire)}
            ${row("Trajet", safeTrajet)}
            ${row("Passagers", safePassengers)}
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #333;">
            <p style="color: #d4af37; font-size: 11px; text-transform: uppercase; margin-bottom: 12px;">Détails</p>
            <p style="color: #ccc; line-height: 1.6; white-space: pre-wrap;">${safeDetails}</p>
          </div>
          <p style="color: #555; font-size: 11px; margin-top: 40px; text-align: center;">${SERVICE_NAME} — ${SERVICE_TAGLINE} · ${COMPANY_NAME}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'e-mail." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
