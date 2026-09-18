import { profile } from "../data/content";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
export async function sendContact(
  message: ContactMessage,
  signal?: AbortSignal,
): Promise<void> {
  const endpoint =
    import.meta.env.VITE_CONTACT_ENDPOINT ||
    `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`;
  const formSubmit =
    new URL(endpoint, window.location.origin).hostname === "formsubmit.co";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(
      formSubmit
        ? {
            ...message,
            _subject: `Portfolio enquiry from ${message.name}`,
            _replyto: message.email,
            _template: "table",
          }
        : message,
    ),
    signal,
  });
  if (!response.ok)
    throw new Error(
      "Your message could not be sent. Please try again or contact me directly.",
    );
  if (formSubmit) {
    const result: { success?: boolean | string; message?: string } =
      await response.json();
    if (/activat|confirm.*email/i.test(result.message || "")) {
      throw new Error(
        "Contact delivery needs one-time activation. Bijoy must confirm the FormSubmit activation email. Please try again after activation.",
      );
    }
    if (result.success !== true && result.success !== "true") {
      throw new Error(
        "Your message could not be submitted. Please try again shortly or email Bijoy directly.",
      );
    }
  }
}
