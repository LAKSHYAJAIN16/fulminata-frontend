import React, { useState } from 'react'
import "../../pages/error/Error.css";
import { useLocation } from 'react-router';

export default function Error() {
    const location = useLocation();
    const [message] = useState(location.pathname.split("/")[2]);
    return (
        <>
            <div className="errorMainFlex">
                <div className="errorMainTitle">
                    WHOOPS!
                </div>
                <br />
                <br />
                <br />
                <div className="errorMainMessage">
                    {message}
                </div>
            </div>
        </>
    )
}
