import { useSession } from "next-auth/react";

export const useSessionData = () => {
  const { data: session } = useSession();
  type Link = {
    href: string;
    label: string;
  };
  let links: Link[];

  if (session) {
    links = [
      { href: "/", label: "home" },
      { href: "/about", label: "about" },
      { href: "/contact", label: "contact" },
      { href: `/user/${session?.user?.id as string}`, label: "my pages" },
    ];
    if (session?.user?.role === "admin") {
      links = [
        { href: "/", label: "home" },
        { href: "/admin/dashboard", label: "dashboard" },
        { href: "/admin/register/country", label: "add country" },
        { href: "/admin/register/recipe", label: "add recipe" },
        { href: `/user/${session?.user?.id as string}`, label: "my pages" },
      ];
    }
    return links;
  } else {
    links = [
      { href: "/", label: "home" },
      { href: "/about", label: "about" },
      { href: "/contact", label: "contact" },
      { href: "/sign-in", label: "sign in" },
    ];
    return links;
  }
};
