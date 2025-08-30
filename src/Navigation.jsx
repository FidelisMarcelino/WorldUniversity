import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Navigation(){
    const loc = useLocation()
    const navigate = useNavigate()

    return(
        <>
            <div className="flex items-center justify-between p-3 rounded-b bg-blue-400">
                <div className="flex gap-2">
                    <Link to="home">
                        <button className={`${loc.pathname.startsWith("/home") ? 'bg-blue-600 rounded-lg px-2 text-white' : ""}`}>Home</button>
                    </Link>

                    <Link to="countrySearch">
                        <button className={`${loc.pathname.startsWith("/countrySearch") ? 'bg-blue-600 rounded-lg px-2 text-white' : ""}`}>Search</button>
                    </Link>

                    <Link to="countryFilter">
                        <button className={`${loc.pathname.startsWith("/countryFilter") ? 'bg-blue-600 rounded-lg px-2 text-white' : ""}`}>Filter</button>
                    </Link>

                    <Link to="about">
                        <button className={`${loc.pathname.startsWith("/about") ? 'bg-blue-600 rounded-lg px-2 text-white' : ""}`}>About</button>
                    </Link>
                </div>
            </div>

            <div className="p-2">
                <Outlet/>
            </div>
        </>
    )
}