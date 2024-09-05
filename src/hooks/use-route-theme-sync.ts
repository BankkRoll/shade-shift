import { RouteThemeConfig } from "../types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useThemeTransition } from "./use-theme-transition";

export const useRouteThemeSync = (
  routeThemeMap: Record<string, RouteThemeConfig>
) => {
  const router = useRouter();
  const { transitionTheme } = useThemeTransition();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const config = routeThemeMap[url];
      if (config) {
        transitionTheme(config.theme, config.transition);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router, transitionTheme, routeThemeMap]);
};
