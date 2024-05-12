#!/usr/bin/env node

import inquirer from "inquirer";

import { differenceInSeconds } from "date-fns";

const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Please enter the time:",
        validate: (input) => {
            if(isNaN(input)){
                return "Please enter a valid number";
            }
            else if(input > 60) {
                return "Please enter a number less than 60";
            }
            else {
                return true;
            }
        }
    }
]);

let input = res.userInput;

function startTime(val : number) {
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initialTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if(timeDiff <= 0) {
            console.log("Time is up");
            process.exit();
        } 
        
        const minutes = Math.floor((timeDiff%(3600*24))/3600)
        const seconds = Math.floor((timeDiff%60))
        console.log(`${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`);
    }),1000)
}

startTime(input);