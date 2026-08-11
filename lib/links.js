
/**
 * Our own subdomains are not "external" in the sense that matters. The tool at
 * tool.fasteradmin.com is the same product and the same brand, so sending it to
 * a new tab announces a boundary the visitor is not supposed to notice.
 * Genuinely third-party links (LinkedIn) still open in a new tab.
 */
const OWN_HOSTS = ["fasteradmin.com", "tool.fasteradmin.com"];

export function isOwnDomain(href = "") {
  try {
    return OWN_HOSTS.includes(new URL(href).hostname.replace(/^www\./, ""));
  } catch {
    return true; // relative path
  }
}
