import "./Sidebar.css";
import Modal from "./Modal.js";
import { Swap } from "./Swap";

export function Sidebar() {
    return (
        <div className="sidebar">
            <div>
                <p>Profile section</p>
            </div>
            <div className="search">
                <input
                className="search__bar"
                    type="text"
                    placeholder="Search"
                    />
            </div>
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Click</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
            <Modal />
            <Swap />
        </div>
    );
}


export default Sidebar;