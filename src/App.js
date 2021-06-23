import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Container, TextField, makeStyles, Button, IconButton, Grid } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { CenterFocusStrong } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }


    },
    button: {
        margin: theme.spacing(1),
        
    }

}))

function App() {
    let sum = 0;
    let max;
    let lowV = 0;
    let closeToTarget = 0;
    let highV = 1;
    let ghv = 0;
    let glv = 0;
    let test = 0;
    let found = false;
    let countNfound = 0;
    const classes = useStyles()
    const [target, setTarget] = useState('')
    //const [found, setFound] = useState(false)
    const [exchange, setExchange] = useState('')
    const [inputFields, setInputField] = useState([
        { weight: '' }

    ])
    //alert("asdasdsd \n" + "Close= " + closeToTarget + "\nLow value= " + lowV + "\nHigh value = " + highV+ "\nSum = " + sum + "\nFound"+ found)



    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputField(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        lowV = 0;
        closeToTarget = 0;
        highV = 1;
        ghv = 0;
        glv = 0;
        found = false;
        countNfound = 0;
        ghv = highV
        glv = lowV
        // const sum = parseFloat((inputFields[0].weight)) + parseFloat((inputFields[1].weight))
        max = Math.max(...inputFields.map((inputField, index) => inputField.weight), 0)
        /*inputFields.forEach((item, i) => {

            sum += parseFloat((item.weight));
            //max = Math.max(item.weight)

        })*/

        Cal();




        //console.log(Math.max(...inputFields.map((inputField, index) => inputField.weight),0))
        //console.log(closeToTarget)
        //console.log(exchange)
        //console.log(sum.toFixed(2))
    }

    function Cal() {
        for (let i = 0; i < 2; i++) {
            inputFields?.forEach((item, i) => {
                if (parseFloat(item.weight) === max) {

                    sum += parseFloat(item.weight) * lowV * parseFloat(exchange);






                }
                else {
                    sum += parseFloat(item.weight) * highV * parseFloat(exchange);
                    //alert("high "+sum + "\n"+ item.weight )
                }
                //alert("high " + sum + "\n" + item.weight)
                //sum += parseFloat((item.weight));
                //max = Math.max(item.weight)

            })
            closeToTarget = sum - parseFloat(target)
            if ((closeToTarget <= 0.90 && closeToTarget >= 0.00) && (lowV < highV) && found === false /*&& b>=0.10*/) {
                found = true;

                //alert("Close= " + closeToTarget.toFixed(2) + "\nLow value= " + lowV.toFixed(2) + "\nHigh value = " + highV.toFixed(2))

                confirmAlert({
                    customUI: ({ onClose }) => {
                        return (
                            <div className='custom-ui'>
                                <h1>Results</h1>
                                <p>{"Lower wieghts= " + lowV.toFixed(2)}</p>
                                <p>{"Highest wieght = " + highV.toFixed(2)}</p>
                                <p>{"Close= " + closeToTarget.toFixed(2)}</p>
                                <button onClick={onClose}>Ok</button>

                            </div>
                        );
                    }
                });

                break;
            }
            sum = 0;
            if (closeToTarget > 0) {
                highV -= 0.01;
            }
            else if (closeToTarget < 0) {
                lowV += 0.01;
            }
        }

        //Loop();

    }

    function Loop() {
        if (found === false) {

            if (countNfound == 1000) {
                console.log("1000 loops past!!!!!!!")
                confirmAlert(options);
            }
            else {
                countNfound++;
                ghv += 0.10;
                glv += 0.10;
                highV = ghv;
                lowV = glv;
                Cal();
            }

        }
    }

    const options = {
        title: 'Not found!',
        message: 'Do you want to search more?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    countNfound = 0;
                    ghv += 0.10;
                    glv += 0.10;
                    highV = ghv;
                    lowV = glv;

                    Cal();
                },
            },
            {
                label: 'No',
                onClick: () => alert('See you')
            }
        ]

    };



    const handleAdd = () => {
        setInputField([...inputFields, { weight: '' }])
    }

    const handleDelete = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputField(values);
    }

    return (
        <Container maxWidth="sm">

            <h1>Add Weights</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Grid item xs={12} className="test">
                    <TextField
                        name="target"
                        label="Target Value"
                        //value={target.weight}
                        onChange={event => setTarget(event.target.value)}
                    />
                    <TextField
                        name="exchange"
                        label="Exchange Rate"
                        //value={target.weight}
                        onChange={event => setExchange(event.target.value)}
                    />
                </Grid>

                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        <TextField
                            name="weight"
                            label={index + 1}
                            value={inputField.weight}
                            onChange={event => handleChangeInput(index, event)}
                        />
                        <IconButton onClick={() => handleDelete(index)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAdd()}>
                            <AddIcon />
                        </IconButton>
                    </div>
                ))}
                <Button className={classes.button} variant="contained" color="primary" type="submit" onClick={handleSubmit}>Calculate</Button>
            </form>


        </Container>
    )
}

export default App;
