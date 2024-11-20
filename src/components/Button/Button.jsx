import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function Button({ children, href, to, onClick, className, type = "button", ...rest }) {
  const Component = to ? Link : href ? "a" : "button";

  const commonProps = {
    className,
    onClick,
    ...rest,
  };

  if (Component === "button") {
    commonProps.type = type;
  }

  if (Component === "a") {
    commonProps.href = href;
  }

  if (Component === Link) {
    commonProps.to = to;
  }

  return <Component {...commonProps}>{children}</Component>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
