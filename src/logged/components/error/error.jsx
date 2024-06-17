import PropTypes from 'prop-types';

const Error = ({children}) => {
  return (
    <>
      { children && <div className='alert alert-danger m-4 d-flex justify-content-center'>{children}</div> }
    </>
  )
}

Error.propTypes = {
  children: PropTypes.string,
}

export default Error;