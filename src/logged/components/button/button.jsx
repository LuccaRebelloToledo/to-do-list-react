import PropTypes from 'prop-types';

const Button = ({ variant, type, action, children, className, style }) => {
  const commonCss = 'btn btn-lg mt-3';

  const variants = {
    success: `${commonCss} btn-success`,
    primary: `${commonCss} btn-primary`,
    danger: `${commonCss} btn-danger`,
    default: `${commonCss} btn-default`,
  };

  return (
    <button
      className={variants[variant] + ' ' + className}
      type={type}
      onClick={action}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
