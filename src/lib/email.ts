export type EmailConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  recaptchaKey?: string;
};

type EmailEnv = Partial<Record<keyof EmailConfig, string | undefined>>;

export function getEmailConfig(
  env: EmailEnv = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
): EmailConfig | null {
  const serviceId = env.serviceId?.trim();
  const templateId = env.templateId?.trim();
  const publicKey = env.publicKey?.trim();
  if (!serviceId || !templateId || !publicKey) return null;
  return { serviceId, templateId, publicKey, recaptchaKey: env.recaptchaKey?.trim() || undefined };
}
