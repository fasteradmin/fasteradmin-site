"use client";

import Script from "next/script";

/**
 * Scoped to this pilotpagina alleen — niet in de site-brede Analytics.jsx,
 * zodat het A/B-experiment geen invloed heeft op de rest van de site en
 * geen account vereist totdat Joey een PostHog-project heeft aangemaakt.
 * NEXT_PUBLIC_POSTHOG_KEY ontbreekt nu nog: zonder key laadt dit script
 * niets en doet de pagina het gewoon met alleen GA4.
 */
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

export default function PostHogLoader() {
  if (!POSTHOG_KEY) return null;

  return (
    <Script id="posthog-pilot" strategy="afterInteractive">
      {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.uploadQueue=t.uploadQueue||[];t.uploadQueue.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var o="posthog";return"posthog"!==a&&(o+="."+a),t||(o+=" (stub)"),o},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSurveyResponse flush".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}', person_profiles: 'identified_only'})`}
    </Script>
  );
}
