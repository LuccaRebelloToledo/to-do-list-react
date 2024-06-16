import PropTypes from 'prop-types'

const Content = ({children}) => {
  return (
    <div>
      <main className='container-lg m-4'>
        {children}
      </main>
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Content;