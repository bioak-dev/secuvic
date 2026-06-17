import { Resend } from "resend";
import { NextResponse } from "next/server";

const serviceLabels: Record<string, string> = {
  "mise-a-disposition": "Mise à disposition (Heure/Jour)",
  transfert: "Transfert Aéroport/Hôtel",
  evenement: "Événement spécial (Festival, etc.)",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, location, details } = body;

    if (!name || !email || !phone || !service || !date || !location || !details) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "SecuVIC <onboarding@resend.dev>";

    if (!process.env.RESEND_API_KEY || !contactEmail) {
      return NextResponse.json(
        { error: "Configuration e-mail manquante." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const serviceLabel = serviceLabels[service] || service;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `[SecuVIC] Nouvelle demande — ${name} — ${location}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px;">
          <h1 style="color: #d4af37; font-size: 24px; margin-bottom: 8px;">Secu<span style="color: #d4af37">VIC</span></h1>
          <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 32px;">Nouvelle demande de réservation</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Nom</td><td style="padding: 12px 0; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 12px 0; color: #fff;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td></tr>
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td><td style="padding: 12px 0; color: #fff;"><a href="tel:${phone}" style="color: #d4af37;">${phone}</a></td></tr>
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Service</td><td style="padding: 12px 0; color: #fff;">${serviceLabel}</td></tr>
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Date</td><td style="padding: 12px 0; color: #fff;">${date}</td></tr>
            <tr><td style="padding: 12px 0; color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Lieu</td><td style="padding: 12px 0; color: #fff;">${location}</td></tr>
          </table>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #333;">
            <p style="color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Détails</p>
            <p style="color: #ccc; line-height: 1.6; white-space: pre-wrap;">${details}</p>
          </div>

          <p style="color: #555; font-size: 11px; margin-top: 40px; text-align: center;">SecuVIC — Sécurité &amp; Prestige</p>
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
