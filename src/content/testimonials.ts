export type Testimonial = { name: string; role: string; company: string; initials: string; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Rev Fr Christopher",
    role: "Product Manager",
    company: "ReginaNostra Schools",
    initials: "RC",
    quote:
      "When our school launched in mid-2025, we urgently needed a proper school management website. I reached out to Ifeanyi, and he delivered a complete platform from scratch. He didn't just build it — he also trained our staff and stayed available even after launch to make sure everything worked smoothly. We were very satisfied with the result.",
  },
  {
    name: "Nnamdi",
    role: "Co-Founder & CEO",
    company: "Kedusoft",
    initials: "Nn",
    quote:
      "Ifeanyi joined us mid-sprint and hit the ground running — no hand-holding needed. He rebuilt our payment integration with Stripe and Paystack in under two weeks, fixing edge cases that had been causing silent failures for months. If you need someone who understands fintech complexity and still ships fast, he's your guy.",
  },
  {
    name: "Godson Pius",
    role: "Co-Founder & CEO",
    company: "World Brain Technology",
    initials: "GP",
    quote:
      "What stood out about Ifeanyi wasn't just the code quality — it was the thinking behind it. He proposed the microservices split that cut our API response times by nearly half, and he documented everything properly. Rare combination of speed and precision.",
  },
  {
    name: "Samuel",
    role: "Blockchain Developer",
    company: "MintVerse",
    initials: "S",
    quote:
      "Ifeanyi owned the frontend and the API surface that talked to our contracts — including the messy IPFS pieces most devs avoid. He got it working and kept it stable under load. The marketplace launched with zero critical incidents.",
  },
];
