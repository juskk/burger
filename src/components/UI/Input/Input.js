import classes from './Input.module.sass';
import React from 'react' 

const Input = (props) => {
    let inputElement = null;

    let inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValid && props.elTouched) inputClasses.push(classes.Invalid)

    switch (props.elementType) {
        case ('input'):
            inputElement = <input onChange={props.Changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            break;
        case ('textarea'):
            inputElement = <input onChange={props.Changed} {...props.elementConfig} value={props.value}/>
            break;
        case ('select'):
            inputElement = <select onChange={props.Changed} className={inputClasses.join(' ')} value={props.value}>
                { props.elementConfig.options.map( e => {
                    return <option key={e.value} value={e.value}>{e.displayValue}</option>
                } ) }
            </select>
            break;
        default:
            inputElement = <input onChange={props.Changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
    }


    return (
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
