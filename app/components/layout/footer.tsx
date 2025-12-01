import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { Image } from "@shopify/hydrogen";
import { useThemeSettings } from "@weaverse/hydrogen";
import { cva } from "class-variance-authority";
import { useFetcher } from "react-router";
import { Button } from "~/components/button";
import { useShopMenu } from "~/hooks/use-shop-menu";
import { cn } from "~/utils/cn";
import Link from "../link";
import { CountrySelector } from "./country-selector";
import { FooterMenu } from "./menu/footer-menu";

/** ✅ 新增 TikTok Icon（SVG 版本） */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.38 2h3.02c.14 1.3.72 2.3 1.72 3 .93.64 2 .94 3.2.9v3.2c-1.2.1-2.3-.2-3.3-.7v6.7c0 2-1 3.4-2.9 4.2-2 .9-4.3.5-5.8-1.1-1.6-1.7-2-3.8-1.2-6 1-2.3 3.1-3.6 5.7-3.5v3.3c-.8-.1-1.4.2-1.9.8-.4.5-.5 1.1-.3 1.8.3.7.8 1.1 1.5 1.2.7.1 1.3-.1 1.8-.6.3-.3.5-.8.5-1.3V2z" />
    </svg>
  );
}

const variants = cva("", {
  variants: {
    width: {
      full: "",
      stretch: "",
      fixed: "mx-auto max-w-(--page-width)",
    },
    padding: {
      full: "",
      stretch: "px-3 md:px-10 lg:px-16",
      fixed: "mx-auto px-3 md:px-4 lg:px-6",
    },
  },
});

export function Footer() {
  const { shopName } = useShopMenu();
  const {
    footerWidth,
    socialFacebook,
    socialInstagram,
    socialLinkedIn,
    socialX,
    /** ✅ 新增 TikTok 字段 */
    socialTikTok,
    footerLogoData,
    footerLogoWidth,
    bio,
    copyright,
    addressTitle,
    storeAddress,
    storeEmail,
    newsletterTitle,
    newsletterDescription,
    newsletterPlaceholder,
    newsletterButtonText,
  } = useThemeSettings();
  const fetcher = useFetcher<{ ok: boolean; error: string }>();

  const message = fetcher.data?.ok ? "Thank you for signing up! 🎉" : "";
  const error =
    fetcher.data && !fetcher.data.ok
      ? fetcher.data.error || "An error occurred while signing up."
      : "";

  /** ✅ 完整的社交媒体数组（已加入 TikTok） */
  const SOCIAL_ACCOUNTS = [
    {
      name: "Instagram",
      to: socialInstagram,
      Icon: InstagramLogoIcon,
    },
    {
      name: "X",
      to: socialX,
      Icon: XLogoIcon,
    },
    {
      name: "LinkedIn",
      to: socialLinkedIn,
      Icon: LinkedinLogoIcon,
    },
    {
      name: "Facebook",
      to: socialFacebook,
      Icon: FacebookLogoIcon,
    },
    {
      name: "TikTok",
      to: socialTikTok,
      Icon: TikTokIcon,
    },
  ].filter((acc) => acc.to && acc.to.trim() !== "");

  return (
    <footer
      className={cn(
        "w-full bg-(--color-footer-bg) pt-9 text-(--color-footer-text) lg:pt-16",
        variants({ padding: footerWidth }),
      )}
    >
      <div
        className={cn(
          "h-full w-full space-y-9",
          variants({ width: footerWidth }),
        )}
      >
        <div className="space-y-9">
          <div className="grid w-full gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-6">
              {footerLogoData ? (
                <div className="relative" style={{ width: footerLogoWidth }}>
                  <Image
                    data={footerLogoData}
                    sizes="auto"
                    width={500}
                    className="h-full w-full object-contain object-left"
                  />
                </div>
              ) : (
                <div className="font-medium text-base uppercase">
                  {shopName}
                </div>
              )}
              {bio ? <div dangerouslySetInnerHTML={{ __html: bio }} /> : null}

              {/* 社交媒体图标 */}
              <div className="flex gap-4">
                {SOCIAL_ACCOUNTS.map(({ to, name, Icon }) => (
                  <Link
                    key={name}
                    to={to}
                    target="_blank"
                    className="flex items-center gap-2 text-lg"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 地址 */}
            <div className="flex flex-col gap-6">
              <div className="text-base">{addressTitle}</div>
              <div className="space-y-2">
                <p>{storeAddress}</p>
                <p>Email: {storeEmail}</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-6">
              <div className="text-base">{newsletterTitle}</div>
              <div className="space-y-2">
                <p>{newsletterDescription}</p>
                <fetcher.Form
                  action="/api/klaviyo"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="flex">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={newsletterPlaceholder}
                      className="grow border border-gray-100 px-3 focus-visible:outline-hidden"
                    />
                    <Button
                      variant="custom"
                      type="submit"
                      loading={fetcher.state === "submitting"}
                    >
                      {newsletterButtonText}
                    </Button>
                  </div>
                </fetcher.Form>

                <div className="h-8">
                  {error && (
                    <div className="mb-6 flex w-fit gap-1 bg-red-100 px-2 py-1 text-red-700">
                      <p className="font-semibold">ERROR:</p>
                      <p>{error}</p>
                    </div>
                  )}
                  {message && (
                    <div className="mb-6 w-fit py-1 text-green-500">
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <FooterMenu />
        </div>

        <div className="flex flex-col border-t border-line-subtle items-center justify-between gap-4 py-9 lg:flex-row">
          <div className="flex gap-2">
            <CountrySelector />
          </div>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
