function PaperPiece({
  as = "div",
  className = "",
  children,
  ...props
}) {
  const Component = as;

  return (
    <Component
      className={`paper-piece ${className}`}
      {...props}
    >
      <span
        className="paper-piece__surface"
        aria-hidden="true"
      ></span>

      <span className="paper-piece__content">
        {children}
      </span>
    </Component>
  );
}

export default PaperPiece;