import { NavLink as RouterNavLink } from "react-router-dom";

export function NavLink({ to, className, children, ...props }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        typeof className === "function" ? className({ isActive }) : className
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}

export default NavLink;
