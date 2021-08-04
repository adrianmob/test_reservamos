import React from "react";
import { List, ListItem, ListSubheader } from "@material-ui/core";

export const Forecast = ({ forecast, selectCity }) => {
  const getDay = (dt) => {
    const date = new Date(dt * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()} `;
  };

  const setTemp = (temp) => {
    return Math.floor(temp);
  };
  return (
    <div>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {selectCity ? (
              <h3>
                {selectCity.display}, {selectCity.state}
              </h3>
            ) : (
              ""
            )}
          </ListSubheader>
        }
      >
        {forecast.map((data) => (
          <ListItem button key={data.dt}>
            <div>
              <p>{getDay(data.dt)}</p>
              <p>
                {setTemp(data.temp.max)}°C Maxima / {setTemp(data.temp.min)}
                °C Minima
              </p>
              <p>{data.weather[0].description}</p>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
