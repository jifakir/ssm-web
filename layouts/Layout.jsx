import Image from 'next/image';
import Link from 'next/link';



const Header = ({children}) => {

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-neutral shadow">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div> 
                    <div className="flex-none px-2 mx-2">
                        <Image src='/assets/img/logo.svg' alt='Logo' width={70} height={50} />
                    </div>
                    <div className="flex-1 hidden lg:block">
                        <ul className="w-full menu menu-horizontal uppercase justify-between">
                            <li>
                                <Link href={'/'}>HOME</Link>
                            </li>
                            <li><a>ABOUT</a></li>
                            <li><a>FIND A THERAPIST</a></li>
                            <li><a>JOIN AS A THERAPIST</a></li>
                            <li><a>CONTACT</a></li>
                            <li><a>LOGIN/REGISTER</a></li>
                        </ul>
                    </div>
                </div>
                {children}
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
                <ul className="menu p-4 overflow-y-auto w-80 bg-neutral uppercase">
                    <li className="text-left">
                        <Image src='/assets/img/logo.svg' alt='Logo' width={50} height={50} />
                    </li>
                    <li><a>Home</a></li>
                    <li><a>ABOUT</a></li>
                    <li><a>FIND A THERAPIST</a></li>
                    <li><a>JOIN AS A THERAPIST</a></li>
                    <li><a>CONTACT</a></li>
                    <li><a>LOGIN/REGISTER</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;