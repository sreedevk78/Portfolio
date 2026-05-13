"use client";

import { Code2, Link, Mail } from "lucide-react";
import MagneticTarget from "@/components/motion/MagneticTarget";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:sreedevkrishna758@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/sreedevk78",
    icon: Code2,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sreedev-krishna-5966523b6/",
    icon: Link,
    external: true,
  },
];

export default function SocialDock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-[150] hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-obsidian/70 p-2 shadow-2xl shadow-black/30 md:flex">
      {socialLinks.map((item) => (
        <MagneticTarget key={item.href} strength={8}>
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            aria-label={item.label}
            className="group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-ghost/55 transition-colors hover:border-electric/45 hover:text-electric focus-visible:text-electric"
          >
            <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
          </a>
        </MagneticTarget>
      ))}
    </div>
  );
}
