import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from "prop-types"

const Toggleable = forwardRef((props, refs) => {

    //this visible section is reused in /components/Blog... maybe create a seperate function for this?
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? "none" : ""};
    const showWhenVisible = {display: visible ? "" : "none"};

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {toggleVisibility}
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* This is where the blog form is... which in this case is the child. */}
                {props.children} 
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})
Toggleable.displayName = "Toggleable"

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
}



export default Toggleable