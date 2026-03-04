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
      <div className="w-[70px] h-[36px] items-center justify-center rounded-md border border-accent bg-transparent px-3 py-1 text-sm shadow-sm flex opacity-50">
        ...
      </div>
    );
  }

  return (
    <Select value={locale} onValueChange={onLocaleChange}>
      <SelectTrigger className="w-[70px] h-[36px] bg-transparent border border-accent text-accent hover:bg-accent hover:text-primary transition-all">
        <SelectValue placeholder={locale ? locale.toUpperCase() : "Lang"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="id">ID</SelectItem>
      </SelectContent>
    </Select>
  );
}
