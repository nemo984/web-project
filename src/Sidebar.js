import "./Sidebar.css";

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
        </div>
    );
}

export default Sidebar;