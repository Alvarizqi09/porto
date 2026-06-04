"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <div className="w-[75px] h-[38px] items-center justify-center rounded-md border-3 border-foreground bg-card px-3 py-1 text-sm shadow-[2px_2px_0px_0px_var(--border)] flex opacity-50">
        ...
      </div>
    );
  }

  return (
    <Select value={locale} onValueChange={onLocaleChange}>
      <SelectTrigger className="w-[75px] h-[38px] bg-card border-3 border-foreground text-foreground hover:bg-primary transition-all shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none" aria-label="Select Language">
        <SelectValue placeholder={locale ? locale.toUpperCase() : "Lang"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="id">ID</SelectItem>
      </SelectContent>
    </Select>
  );
}
