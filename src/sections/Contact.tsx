import { useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  MapPin,
  LoaderCircle,
  Linkedin,
  Phone,
} from "lucide-react";
import { Reveal, ResumeButton } from "../components/UI";
import { profile } from "../data/content";
import { sendContact, type ContactMessage } from "../services/contact";
export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactMessage>>({});
  const formRef = useRef<HTMLFormElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    const data = new FormData(e.currentTarget);
    const message = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };
    const next: Partial<ContactMessage> = {};
    if (message.name.length < 2)
      next.name = "Please enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email))
      next.email = "Please enter a valid email address.";
    if (message.message.length < 10)
      next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)
        ?.focus();
      return;
    }
    setStatus("loading");
    setFeedback("Sending your message…");
    try {
      await sendContact(message, AbortSignal.timeout(15000));
      setStatus("success");
      setFeedback("Thank you! Your message has been sent.");
      formRef.current?.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }
  async function copyEmail() {
    if (!profile.email) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFeedback(
        "Could not copy the email. Please select and copy it manually.",
      );
    }
  }
  return (
    <section id="contact" className="container section contact">
      <Reveal className="contact-copy">
        <span className="eyebrow">
          <i />
          Have something in mind?
        </span>
        <h2>
          Let’s build
          <br />
          something <span className="gradient-text">amazing.</span>
        </h2>
        <p>
          Great things start with a conversation. I’m always open to interesting
          projects, new opportunities, and a good chat about technology.
        </p>
        <div className="contact-details">
          {profile.email ? (
            <div>
              <Mail size={19} />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              {copied && <span role="status">Copied!</span>}
            </div>
          ) : (
            <div>
              <Linkedin size={19} />
              <a
                href={profile.socials.LinkedIn || "#contact"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s connect on LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          )}
          <div>
            <Phone size={19} />
            <a href={profile.phoneHref}>{profile.phone}</a>
          </div>
          <div>
            <MapPin size={19} />
            <span>Mysore, India</span>
          </div>
        </div>
        <ResumeButton />
      </Reveal>
      <Reveal className="contact-form-card" delay={0.15}>
        <div className="form-heading">
          <span>Tell me about your idea.</span>
          <ArrowUpRight size={21} />
        </div>
        <form ref={formRef} noValidate onSubmit={submit}>
          <div className="form-row">
            <div>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                placeholder="Alex Johnson"
                autoComplete="name"
                maxLength={100}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <small className="field-error" id="name-error">
                  {errors.name}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                autoComplete="email"
                maxLength={254}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <small className="field-error" id="email-error">
                  {errors.email}
                </small>
              )}
            </div>
          </div>
          <label htmlFor="message">What are you thinking?</label>
          <textarea
            id="message"
            name="message"
            placeholder="A project, an opportunity, or just a hello…"
            rows={5}
            maxLength={5000}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <small className="field-error" id="message-error">
              {errors.message}
            </small>
          )}
          <button
            type="submit"
            className="button button-primary send-button"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                Sending <LoaderCircle className="spin" size={17} />
              </>
            ) : (
              <>
                Send Message <ArrowUpRight size={17} />
              </>
            )}
          </button>
          <div
            className={`form-feedback ${status}`}
            role="status"
            aria-live="polite"
          >
            {feedback || "Your message goes directly to my inbox."}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
