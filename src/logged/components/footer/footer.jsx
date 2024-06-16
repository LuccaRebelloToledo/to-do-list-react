import footer from './footer.module.css'

const Footer = () => {
  return (
    <div>
      <footer className={'container-fluid text-center mt-5 bg-dark text-light ' + footer.footer}>
      <p className='p-3'>&copy; 2024. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default Footer;