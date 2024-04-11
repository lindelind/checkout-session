

import { useEffect, useState } from "react";
import axios from "axios";

//skickas inte med det senaste icklickade valet på servicepoint, utan det innan. Kolla på det? 

export const ShowServicePoints = () => {
  const [servicePoints, setServicePoints] = useState([]);
  const [selectedServicePoint, setSelectedServicePoint] = useState(null);

  useEffect(() => {
    const selectedPoint = JSON.parse(
      localStorage.getItem("selectedServicePoint")
    );
    if (selectedPoint) {
      setSelectedServicePoint(selectedPoint);
    }
  }, []);

    useEffect(() => {
      // fetchServicePoints();
    }, [ShowServicePoints]);

  useEffect(() => {
    localStorage.setItem(
      "selectedServicePoint",
      JSON.stringify(selectedServicePoint)
    );
  }, [selectedServicePoint]);

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
        <>
          <ul>
            {servicePoints.map((servicePoint) => (
              <li key={servicePoint.servicePointId}>
                <input
                  type="radio"
                  id={servicePoint.servicePointId}
                  name="servicePoint"
                  value={servicePoint.servicePointId}
                  onChange={() => setSelectedServicePoint(servicePoint)}
                />
                <label htmlFor={servicePoint.servicePointId}>
                  {servicePoint.name} -{" "}
                  {servicePoint.deliveryAddress.streetName}{" "}
                  {servicePoint.deliveryAddress.streetNumber},{" "}
                  {servicePoint.deliveryAddress.postalCode}{" "}
                  {servicePoint.deliveryAddress.city}
                </label>
              </li>
            ))}
          </ul>
          <p>
            Selected Service Point:{" "}
            {selectedServicePoint ? selectedServicePoint.name : "None"}
          </p>
        </>
      )}
    </div>
  );
};
