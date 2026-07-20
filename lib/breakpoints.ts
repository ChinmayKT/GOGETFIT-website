export const TABLET_MIN = 768;
export const DESKTOP_MIN = 1024;

export const QUERY_MOBILE = `(max-width: ${TABLET_MIN - 1}px)`;
export const QUERY_TABLET = `(min-width: ${TABLET_MIN}px) and (max-width: ${DESKTOP_MIN - 1}px)`;
export const QUERY_DESKTOP = `(min-width: ${DESKTOP_MIN}px)`;
