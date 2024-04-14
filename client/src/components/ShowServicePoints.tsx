

import { useEffect, useState } from "react";
import axios from "axios";

export const ShowServicePoints = () => {
  const [servicePoints, setServicePoints] = useState<ServicePoint[]>([]); 
  const [selectedServicePoint, setSelectedServicePoint] = useState<ServicePoint | null>();


  useEffect(() => {
    const selectedPoint = JSON.parse(
      localStorage.getItem("selectedServicePoint") || "null"
    );
    if (selectedPoint) {
      setSelectedServicePoint(selectedPoint);
    }
  }, [setSelectedServicePoint]);

    useEffect(() => {
      fetchServicePoints();
    }, []);

  useEffect(() => {
  localStorage.setItem(
      "selectedServicePoint",
      JSON.stringify(selectedServicePoint)
    );
    
  }, [selectedServicePoint]);

  const fetchServicePoints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/postnord/servicepoints",
        {
          withCredentials: true
        }
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
      <h3 className="h3">Choose Servicepoint:</h3>
      {servicePoints.length > 0 && (
        <>
          <div className="show-servicepoint-container">
            {servicePoints?.map((servicePoint: ServicePoint) => (
              <div
                className="radio-container"
                key={servicePoint.servicePointId}
              >
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
              </div>
            ))}
          </div>
          <p className="selected-servicepoint">
            Selected Service Point:{" "}
            {selectedServicePoint ? selectedServicePoint.name : "None"}
          </p>
        </>
      )}
    </div>
  );
};
