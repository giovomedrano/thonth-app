import React from 'react'
import Button from "./Button";
import { MDBBtn, CSVLink } from 'mdbreact';

const Updater = ( { onUpdate}) => {

  return (
    <div className="updater">
      <Button
        color={"steelblue"}
        text={"Update"}
        onClick={onUpdate}
      />
    </div>
  )
}

export default Updater