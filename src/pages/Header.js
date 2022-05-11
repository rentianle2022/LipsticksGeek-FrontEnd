import {
    Link, useLocation
} from "react-router-dom";
import { MenuIcon } from '@heroicons/react/outline'
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import LoginModal from "../components/LoginModal";
import UserDropDown from "../components/UserDropDown";


export default function Header() {
    const [showMenu, setShowMenu] = useState(false)

    const location = useLocation()
    const { user, showLoginModal, setShowLoginModal, setIsLoading } = useContext(UserContext)
    
    function toggleMenu() {
        setShowMenu(prevState => !prevState)
    }

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [location])

    const pages = [
        { path: '/', name: '首页' },
        { path: '/recommendation', name: '推荐' },
        { path: '/encyclopedia', name: '百科' },
        { path: '/community', name: '社区' }
    ]

    const pageElement = pages.map(page => (
        <Link
            to={page.path}
            className={location.pathname === page.path ? 'focus-button' : 'button'}
            onClick={() => setShowMenu(false)}>
            {page.name}
        </Link>
    ))

    return (
        <div className=" bg-gray-700 fixed top-0 w-full z-50">

            <nav className="flex items-center justify-start py-2 px-5  shadow-md shadow-gray-800 text-indigo-100 text-sm ">

                <h1 className="font-bold">
                    <Link to="/">
                        <svg className="h-10 w-10 fill-white inline-block" t="1649234406400" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3874"><path d="M443.6 560.9H208.5V120.1c0-31.8 30.3-54.9 61-46.5l29.6 8.1c85.3 23.4 144.5 101 144.5 189.4v289.8z" fill="#FF4F5C" p-id="3875"></path><path d="M388 952.1H264c-46.7 0-84.5-37.8-84.5-84.5V448.2h293v419.4c0.1 46.7-37.8 84.5-84.5 84.5zM759.9 448.2H636c-46.7 0-84.5 37.8-84.5 84.5v419.4h293V532.7c0-46.7-37.9-84.5-84.6-84.5z" p-id="3876"></path></svg>
                        <span>LipstickGeeks</span>
                    </Link>
                </h1>

                <div className="hidden sm:flex sm:gap-1 sm:mx-4 ">
                    {pageElement}
                </div>
                <div className="hidden ml-auto sm:flex">
                    {
                        user ? <UserDropDown />
                            : <div className="button mx-4" onClick={() => setShowLoginModal(true)}>登录/注册</div>
                    }
                    <a href="https://www.w3schools.com" className="border-b-2 border-b-red-500">Github</a>
                </div>

                <MenuIcon className="h-5 w-10 sm:hidden ml-auto" onClick={toggleMenu} />
            </nav>
            {
                showMenu && <div className="flex flex-col gap-2 p-2 text-indigo-100 text-sm sm:hidden">
                    {pageElement}
                    {
                        user ? <UserDropDown />
                            : <div className="button" onClick={() => setShowLoginModal(true)}>登录/注册</div>
                    }
                    <a href="https://www.w3schools.com" >Github</a>
                </div>
            }

            {
                showLoginModal && <LoginModal />
            }
        </div>
    )
}