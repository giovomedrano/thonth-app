import React from 'react'
import Button from "./Button";

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