import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import Content from '../content/content';
import Footer from '../footer/footer';

const PageScaffold = () => {
  return (
    <div className='vh-100'>
      <Header />
        <Content>
          <Outlet />
        </Content>
      <Footer />
    </div>
  );
}

export default PageScaffold;