import {gsap} from 'gsap';
import CSSPlugin from 'gsap/dist/CSSRulePlugin';

import {clsx} from '../../util/clsx';
import DetectOutsideClick from '../DetectOutsideClick/DetectOutsideClick';
import Brand from '../shared/Brand';
import Burger from './Burger';
import Footer from './Footer';
import useMousePosition from './hooks/mousePosition';

// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

interface AsideBarProps {
  asideNavigationComponent: JSX.Element;
  dir?: 'rtl' | 'ltr';
}

const AsideBar: React.FC<AsideBarProps> = ({children, dir, asideNavigationComponent}) => {
  const isRtl = dir === 'rtl';
  const {burgerButtonRef, isMenuOpen, toggleMenu} = useMousePosition({isRtl});

  return (
    <div dir={dir} className="min-h-full">
      <DetectOutsideClick onOutsideClick={() => toggleMenu(() => false)}>
        <div
          className={clsx([
            'fixed top-0 z-50 flex bg-primary transition-transform transform duration-700',
            isRtl ? 'right-0' : 'left-0',
            isMenuOpen ? 'translate-x-0' : isRtl ? 'translate-x-72' : '-translate-x-72',
          ])}
        >
          <div className="w-72 bg-aside flex flex-col flex-shrink-0 pr-3 h-screen">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <Brand />
              {asideNavigationComponent}
            </div>

            <Footer />
          </div>

          <Burger ref={burgerButtonRef} onClick={() => toggleMenu(!isMenuOpen)} isRtl={isRtl} />
        </div>
      </DetectOutsideClick>

      <div
        className={`transition-transform transform duration-700 bg-primary min-h-screen ${
          isMenuOpen ? (isRtl ? '-translate-x-72' : 'translate-x-72') : 'translate-x-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AsideBar;
