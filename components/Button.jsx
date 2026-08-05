import Link from "next/link";

const styles = {
  navy: "bg-navy text-white hover:bg-navy/90",
  brand: "bg-brand text-white hover:bg-brand-dark",
  outline: "bg-white text-navy border border-grey-300 hover:bg-grey-150",
  white: "bg-white text-navy hover:bg-grey-150",
};

/**
 * The site's pill button. Framer renders these at 40px radius with
 * 14px/500 label text.
 */
export default function Button({ href, variant = "navy", className = "", children }) {
  const cls = `inline-flex items-center justify-center rounded-[40px] px-6 py-3 text-sm font-medium tracking-[-0.02em] transition-colors ${styles[variant]} ${className}`;

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
