import React from 'react'
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Updater = ( { onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <updater>
        {/* <p>Copyright &copy; 2022</p> */}
        {/* {location.pathname === '/' && (
          <Button
            color={showAdd ? "red" : "green"}
            text={showAdd ? "Close" : "Add"}
            onClick={onAdd}
          />
        )} */}
    </updater>
  )
}

export default Updater