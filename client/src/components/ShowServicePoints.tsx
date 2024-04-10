

import { useEffect, useState } from "react";
import axios from "axios";

export const ShowServicePoints = () => {
  const [servicePoints, setServicePoints] = useState([]);

  useEffect(() => {
    // fetchServicePoints(); 
  }, [ShowServicePoints]);

  const fetchServicePoints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/postnord/servicepoints"
      );
      const responseData = JSON.parse(response.data.slice(6, -1));
      if (response.status === 200) {
        setServicePoints(
          responseData.servicePointInformationResponse.servicePoints
        );
        console.log(responseData.servicePointInformationResponse.servicePoints);
      }
    } catch (error) {
      console.error("Error fetching servicepoints:", error);
    }
  };

  return (
    <div>
      <h3>Välj utlämningsställe:</h3>
      <button onClick={fetchServicePoints}>Fetch Service Points</button>
      {servicePoints.length > 0 && (
        <ul>
          {servicePoints.map((servicePoint) => (
            <li key={servicePoint.servicePointId}>
              {servicePoint.name} - {servicePoint.deliveryAddress.streetName}{" "}
              {servicePoint.deliveryAddress.streetNumber},{" "}
              {servicePoint.deliveryAddress.postalCode}{" "}
              {servicePoint.deliveryAddress.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
