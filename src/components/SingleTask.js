import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

class SingleTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = { active: true }
    }
    render() {
        return (
            <div className={this.props.crossed ? 'crossed-out single-task' : 'single-task'} 
            onClick={() => 
             this.props.handleCross(this.props.message)
            }>
                <p>{this.props.message}</p>
                <div
                    className="remove-task"
                    onClick={(event) => {
                        setTimeout(() => {
                            let index = this.props.message;
                            console.log(index)
                            this.props.handleRemove(index);
                        }, 350);
                        event.stopPropagation()
                    }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        )
    }
}

export default SingleTask