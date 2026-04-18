import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout