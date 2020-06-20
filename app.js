const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employeeArr = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function createTeam (end = false) {
    if (end) {
        fs.writeFile(outputPath, render(employeeArr), function() {
            console.log("Success!")
        });
    }
    
    else {
        fs.writeFile(outputPath, render(employeeArr), promptUser);
    }
};

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "team",
            message: "Which employee will be added?",
            choices: ["Add Manager", "Add Engineer", "Add Intern", "Quit"]
        },
    ]).then(function (userChoice) {

        switch (userChoice.team) {
            case "Add Manager":
                addManager();
                break;

            case "Add Engineer":
                addEngineer();
                break;

            case "Add Intern":
                addIntern();
                break;

            default:
                createTeam(true);
                break;
        }
    });

    function addManager() {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Manager's name?",
            },
            {
                type: "number",
                name: "id",
                message: "Manager's id?",
            },
            {
                type: "input",
                name: "email",
                message: "Manager's email?",
            },
            {
                type: "number",
                name: "office",
                message: "Manager's office number?",
            },
        ]).then(function (userInput) {
            let thisManager = new Manager(userInput.name, userInput.id, userInput.email, userInput.office);
            employeeArr.push(thisManager);
            createTeam();
        })
    }

    function addEngineer() {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Engineer's name?",
            },
            {
                type: "number",
                name: "id",
                message: "Engineer's id?",
            },
            {
                type: "input",
                name: "email",
                message: "Engineer's email?",
            },
            {
                type: "input",
                name: "github",
                message: "Engineer's github?",
            },
        ]).then(function (userInput) {
            let thisEngineer = new Engineer(userInput.name, userInput.id, userInput.email, userInput.github);
            employeeArr.push(thisEngineer);
            createTeam();
        })
    }

    function addIntern() {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Intern's name?",
            },
            {
                type: "number",
                name: "id",
                message: "Intern's id?",
            },
            {
                type: "input",
                name: "email",
                message: "Intern's email?",
            },
            {
                type: "input",
                name: "school",
                message: "Intern's school?",
            },
        ]).then(function (userInput) {
            let thisIntern= new Intern(userInput.name, userInput.id, userInput.email, userInput.school);
            employeeArr.push(thisIntern);
            createTeam();
        })
    }    
}

promptUser();

