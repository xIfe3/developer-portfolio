import { describe, expect, it } from "vitest";
import { getEmailConfig } from "./email";

describe("getEmailConfig", () => {
  it("returns null when any required key is missing or blank", () => {
    expect(getEmailConfig({ serviceId: "s", templateId: "t", publicKey: undefined })).toBeNull();
    expect(getEmailConfig({ serviceId: "s", templateId: " ", publicKey: "p" })).toBeNull();
  });
  it("returns config, with recaptcha optional", () => {
    expect(getEmailConfig({ serviceId: "s", templateId: "t", publicKey: "p" })).toEqual({
      serviceId: "s",
      templateId: "t",
      publicKey: "p",
      recaptchaKey: undefined,
    });
  });
});
