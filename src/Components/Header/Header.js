import './Header.css';
import { RESTAURANT_LOGO } from '../../utils/Common/Common';

function Header(){

    return(<div className='header-layout fixed w-full z-[10000000] bg-gray-100'>
        <div className='logo-wrapper'>
            <img  className='logo' src={RESTAURANT_LOGO} />
        </div>
        <div className='navbar-items-layout'>
            <ol className='navbar-items-wrapper'>
                <li>
                    Home
                </li>
                <li>
                    About
                </li>
                <li>
                    Cart
                </li>
            </ol>
        </div>

    </div>)
}
export default Header;