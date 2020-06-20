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

// // Write code to use inquirer to gather information about the development team members,
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
        //Use switch and pass in info gathered by user by name team. If there is a match with one of user choices, select that choice and execute that block of code 
        // and to create objects for each team member (using the correct classes as blueprints!)
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
