import { useState } from "react";

const MeetingRoom = () => {
    // TODO: context or redux?
    const [participants, setParticipants] = useState([
        {
            fullName: "Rick Ashley",
            initials: "RA",
        },
        { fullName: "Gpp g", initials: "GG" },
        { fullName: "Gpp g", initials: "AFK" },
        { fullName: "Gpp g", initials: "LWL" },
        { fullName: "Gpp g", initials: "OWO" },
        { fullName: "Gpp g", initials: "AOA" },
        { fullName: "Gpp g", initials: "TOT" },
        { fullName: "Gpp g", initials: "AIA" },
        { fullName: "Gpp g", initials: "BBC" },
        { fullName: "Gpp g", initials: "HBO" },
        { fullName: "Gpp g", initials: "PY" },
        { fullName: "Gpp g", initials: "RS" },
        { fullName: "Gpp g", initials: "MK" },
        { fullName: "Gpp g", initials: "BBC" },
        { fullName: "Gpp g", initials: "HBO" },
        { fullName: "Gpp g", initials: "PY" },
        { fullName: "Gpp g", initials: "RS" },
        { fullName: "Gpp g", initials: "MK" },
        { fullName: "Gpp g", initials: "BBC" },
        { fullName: "Gpp g", initials: "HBO" },
        { fullName: "Gpp g", initials: "PY" },
        { fullName: "Gpp g", initials: "RS" },
        { fullName: "Gpp g", initials: "MK" },
    ]);

    return (
        <div className="h-screen bg-slate-100 overflow-hidden">
            <div className="mt-10 flex flex-wrap content-start overflow-auto  h-5/6">
                {participants.map((participant, i) => (
                    <Participant key={i} participant={participant} />
                ))}
            </div>
            <div className="flex justify-center mt-5 p-5 bg-slate-600 w-full h-full">
                <div className="btn-group">
                    <button className="btn btn-active">Button</button>
                    <button className="btn">Button</button>
                    <button className="btn">Button</button>
                </div>
            </div>
        </div>
    );
};

const Participant = ({ participant }) => {
    return (
        <div className="m-2 h-60 w-80 bg-neutral flex items-center justify-center border-8 border-lime-400 rounded-3xl">
            <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{participant.initials}</span>
                </div>
            </div>
        </div>
    );
};

export default MeetingRoom;
