import Sidebar from "./Sidebar/Sidebar";
import MeetingRoom from "./MeetingRoom/MeetingRoom";
import "./Sidebar/drawer.css";
import { useEffect, useRef } from "react";

export function Main() {
    const resizerRef = useRef(null);
    const sidebarRef = useRef(null);

    const resize = (e) => {
        const size = `${e.x}px`;
        sidebarRef.current.style.flexBasis = size;
    };

    useEffect(() => {
        const init = () => {
            document.addEventListener("mousemove", resize, false);
            document.addEventListener(
                "mouseup",
                () => {
                    document.removeEventListener("mousemove", resize, false);
                },
                false
            );
        };

        resizerRef.current.addEventListener("mousedown", init);
        sidebarRef.current.style.flexBasis = "325px";

        return () => {
            if (resizerRef && resizerRef.current) {
                resizerRef.current.removeEventListener("mousedown", init);
            }
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="container w-full">
                <div className="sidebar" ref={sidebarRef}>
                    <Sidebar />
                </div>
                <div ref={resizerRef} className="resizer"></div>
                <div className="main">
                    <MeetingRoom />
                </div>
            </div>
        </div>
    );
}

export default Main;
