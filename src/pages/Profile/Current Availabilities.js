// This component is the Current Availabilities page in the Profile tab.

import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentAvailabilities({ token, pk, setAuth }) {
    const [availabilities, setAvailabilities] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BE_URL}/availability/`, {
            headers: { Authorization: `Token ${token}` },
          })
            .then((res) => {
                setAvailabilities(res.data);
                setIsLoaded(true);
            }
        );
    }, [token, pk]);
}
