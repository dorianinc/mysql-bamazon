// NPM Installs
var mysql = require("mysql");
var clc = require('cli-color');
var figlet = require('figlet');
var inquirer = require("inquirer");

// Global Variables
var itemInfo = '';
var itemData = '';
var quantity = '';
var id = '';


// CLC colors
var red = clc.redBright.bold;
var orange = clc.xterm(202).bold;
var green = clc.greenBright.bold;
var blue = clc.blueBright.bold;


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
});

//When user enters game, convert "Hangman Game" text characters to drawings using figlet npm package.
figlet("Bamazon", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    //Welcome screen text.
    console.log(blue(" Welcome to Bamazon!"));
    console.log(blue(" Your one stop shop for anything and everything"));

    pullInventory();
});

function pullInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        for (var i = 0; i < data.length; i++) {

            itemData = data;
            itemInfo +=
                '\n ----------------------------------------' +
                '\n Item ID: ' + itemData[i].item_id +
                '\n Product Name: ' + itemData[i].product_name +
                '\n Department: ' + itemData[i].department_name +
                '\n Price: ' + '$' + itemData[i].price; +
                '\n ----------------------------------------'
                ;
        }

        console.log(
            '\n' +
            '\n -------------------' +
            blue('\n Existing Inventory:') +
            '\n -------------------')
            ;

        console.log(itemInfo);
        getIdAndQuantity();
    });

};

function getIdAndQuantity() {

    var notValid =
        '\n ------------------------------' +
        red('\n Please input a number value of at least 1') +
        '\n ------------------------------'
        ;

    var greetUser = [
        {
            type: 'input',
            name: 'itemId',
            message: green(" Please input the ID # for the product you're looking for: "),
            validate: function checkIfNaN(value) {
                if (isNaN(value) === false && value >= 1) {
                    return true;
                }
                console.log(notValid);
                return false;
            }
        },
        {
            type: 'input',
            name: 'unitQuantity',
            message: green(' How many units? '),
            validate: function (value) {
                if (isNaN(value) === false && value >= 1) {
                    return true;
                }
                console.log(notValid);
                return false;
            }
        }
    ];

    inquirer.prompt(greetUser).then(answers => {

        id = answers.itemId;
        quantity = answers.unitQuantity;
        pushOrderRequest();
    });
};

function pushOrderRequest() {

    var desiredItem = itemData[id -1].product_name;
    var stockQuantity = itemData[id -1].stock_quantity;
    var desiredItemPrice = itemData[id -1].price;

    console.log(
        blue("\n Selected Item: ") + desiredItem +
        blue("\n Desired quantity: ") + quantity + "\n")
    ;

    var submitOrder = [
        {
            type: 'confirm',
            name: 'confirmOrder',
            message: green(" Would you like to continue with this order?"),
            default: true
        }    
    ];

    inquirer.prompt(submitOrder).then(answers => {
        if (answers.confirmOrder) {
            if (quantity > stockQuantity) {
                console.log(red("\n Insufficient quantity!"));
            }else{
                console.log(green(" Great your total is: "), "$" + desiredItemPrice + "\n");
                stockQuantity -= quantity;
                console.log(orange(" Remaining stock quantity: ") + stockQuantity + "\n");
            }
        }
    })
    connection.end();
}

