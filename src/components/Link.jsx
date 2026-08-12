export default function Link({to, children, rel, ...props}) {
  const external = /^https?:\/\//.test(to);
  const linkRel = external ? [rel, 'noreferrer'].filter(Boolean).join(' ') : rel;
  return (
    <a href={to} rel={linkRel} {...props}>
      {children}
    </a>
  );
}
