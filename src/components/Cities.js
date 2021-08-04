import React from "react";
import { List, ListItem } from "@material-ui/core";

export const Cities = ({ cities, getForeCast }) => {
  return (
    <div>
      <List>
        {cities.map((city) => (
          <ListItem
            button
            key={city.id}
            onClick={() => {
              getForeCast(city);
            }}
          >
            {city.display}, {city.state}
          </ListItem>
        ))}
      </List>
    </div>
  );
};
