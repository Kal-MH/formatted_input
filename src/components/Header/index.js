import PropTypes from "prop-types";

const Header = ({ children, level = 1, ...props }) => {
  let Tag = `h${level}`;

  if (level < 1 || level > 6) {
    console.warn(
      "Header only accept `1 | 2 | 3 | 4 | 5 | 6` as 'level' value."
    );
    Tag = "h6";
  }

  return <Tag {...props}>{children}</Tag>;
};

Header.propTypes = {
  level: PropTypes.number,
};

export default Header;
