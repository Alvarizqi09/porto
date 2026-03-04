import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Try to get locale from cookie, default to "id" (Indonesian)
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'id';

  // Return the locale and messages
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
