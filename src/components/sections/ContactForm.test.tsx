import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());
vi.mock("@emailjs/browser", () => ({ default: { send } }));
vi.mock("next/script", () => ({ default: () => null }));

import { ContactForm } from "./ContactForm";

const config = { serviceId: "s", templateId: "t", publicKey: "p" };

async function fill(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Ada");
  await user.type(screen.getByLabelText(/email/i), "ada@example.com");
  await user.type(screen.getByLabelText(/subject/i), "New SaaS");
  await user.type(screen.getByLabelText(/message/i), "We need a dashboard.");
}

describe("ContactForm", () => {
  it("shows a direct-email fallback when EmailJS is not configured", () => {
    render(<ContactForm config={null} />);
    expect(screen.queryByRole("button", { name: /send/i })).toBeNull();
    expect(screen.getByRole("link", { name: /ifeanyi@xife3.space/i })).toHaveAttribute(
      "href",
      "mailto:ifeanyi@xife3.space",
    );
  });

  it("sends and clears the form on success", async () => {
    send.mockResolvedValue({ status: 200 });
    const user = userEvent.setup();
    render(<ContactForm config={config} />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    expect(send.mock.calls[0][0]).toBe("s");
    expect(send.mock.calls[0][2]).toMatchObject({ from_name: "Ada", reply_to: "ada@example.com" });
    await waitFor(() => expect(screen.getByLabelText(/message/i)).toHaveValue(""));
  });

  it("keeps what the visitor typed when sending fails", async () => {
    send.mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<ContactForm config={config} />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() => expect(screen.getByRole("button", { name: /send message/i })).toBeEnabled());
    expect(screen.getByLabelText(/message/i)).toHaveValue("We need a dashboard.");
  });
});
