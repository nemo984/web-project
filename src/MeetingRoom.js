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
    ]);

    return (
        <>
            <div className="flex flex-wrap content-start mt-10 ml-40 overflow-auto">
                {participants.map((participant, i) => (
                    <Participant key={i} participant={participant} />
                ))}
            </div>
        </>
    );
};

const Participant = ({ participant }) => {
    return (
        <div className="m-10 h-60 w-80 bg-primary flex items-center justify-center	">
            <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{participant.initials}</span>
                </div>
            </div>
        </div>
    );
};

export default MeetingRoom;
