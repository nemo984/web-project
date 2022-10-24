import "./Sidebar.css";
import { useState } from "react";

export function Sidebar() {
    const [Open, setOpen] = useState(false);
    const channel = [
        { title: "Web Programming", 
        submenu: true, 
        submenuItem: [
            { title: "meeting 1" }] }, 
        { title: "OOAD", 
        submenu: true, 
        submenuItem: [
            { title: "meeting 1" }] }, 
        { title: "Ai", 
        submenu: true, 
        submenuItem: [
            { title: "meeting 1" }] }, 
        { title: "Micro", 
        submenu: true, 
        submenuItem: [
            { title: "meeting 1" }] }]

    return (
        <div className="w-72 h-screen bg-cyan-700">
            <div className="p-19">
                <p>Profile section</p>

            </div>
            <div className="p-5">
                <input
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    className="py-2 px-10 text-sm rounded-md focus:outline-none p-20"
                />
                <ul className="pt-6">
                    {channel.map((channel, index) => (
                        <>
                        <li key={index} className="text-white flex item-center gap-x-4 cursor-pointer p-2 hover:bg-cyan-900 rounded-lg"
                        onClick={() => 
                            setOpen(!Open)}>
                            <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png" />
                            <span>{channel.title}</span>
                        </li>
                        {channel.submenu && Open && (
                            <ul>
                                {channel.submenuItem.map((submenuItem, index) => (
                                    <li key={index} className="text-white flex item-center gap-x-4 cursor-pointer p-2 hover:bg-cyan-900 rounded-lg px-10">
                                        {submenuItem.title}

                                    </li>
                                ))}
                            </ul>
                        )}
                        </>
                    ))}
                </ul>
            </div>
            {/* <div className="search">
                <input
                className="search__bar"
                    type="text"
                    placeholder="Search"
                    />
            </div> */}
        </div>
    );
}


export default Sidebar;