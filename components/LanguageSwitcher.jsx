"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLocaleChange = (newLocale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year expiry
    router.refresh();
  };

  if (!mounted) {
    return (
      <div className="w-[78px] h-[38px] rounded-full border border-foreground/15 bg-card/80 px-3 py-1 text-xs flex items-center justify-center opacity-50 font-display">
        ...
      </div>
    );
  }

  return (
    <Select value={locale} onValueChange={onLocaleChange}>
      <SelectTrigger
        className="w-[82px] h-[38px] rounded-full bg-card/80 backdrop-blur-sm border border-foreground/15 text-foreground hover:bg-card hover:border-primary/50 text-xs font-bold font-display shadow-nature transition-all duration-300"
        aria-label="Select Language"
      >
        <SelectValue placeholder={locale ? locale.toUpperCase() : "Lang"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English (EN)</SelectItem>
        <SelectItem value="id">Bahasa (ID)</SelectItem>
      </SelectContent>
    </Select>
  );
}
