import React, { useState } from 'react'

const AddTask = ( { onAdd } ) => {
    const [text, setTask] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    
    const onSubmit = (e) => {
        e.preventDefault()
        if(!text) {
            alert('Please enter a task')
            return
        }

        onAdd( { text, day, reminder } )

        setTask('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input
                    type="text"
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Day</label>
                <input
                    type="text"
                    placeholder='Add Day & Time'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input
                type='submit'
                value='Save Task'
                className="btn btn-block"
            />
        </form>
    )
}

export default AddTask