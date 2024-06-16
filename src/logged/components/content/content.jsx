import PropTypes from 'prop-types'

const Content = ({children}) => {
  return (
      <main className='p-4'>
        {children}
      </main>
  )
}

Content.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Content;