const mysql = require('mysql');
require('dotenv').config();
const inquirer = require('inquirer');
const Table = require('cli-table');
const colors = require('colors');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id ".red + connection.threadId);
    displayInventory()
});
let displayInventory = () => {
    //console.log("SQL Connection Established")

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ")
            //console.log("Item number: ".rainbow + res[i].item_id)
            //console.log("Item: " + res[i].product_name)
            //console.log("Price".italic + ":" + "$ ".cyan + res[i].price)

            const table = new Table();

            table.push(
                { "Item number: ": res[i].item_id }
                , { "Item: ": res[i].product_name }
                , { "Price: ": "$" + res[i].price }
            );
            console.log(table.toString());
        }
        purchase()
    })
};

// validateInput makes sure that the user is supplying only positive integers for their inputs
let validateInput = (value) => {
    var integer = Number.isInteger(parseFloat(value))
    var sign = Math.sign(value)

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.'
    }
}

// purchase function to prompt the customer for an item to purchase
let purchase = () => {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Select the desired product to purchase by id number.",
        validate: validateInput,
        filter: Number
    },
    {
        type: "input",
        name: "quantity",
        message: "How many of this item would you like to purchase?",
        validate: validateInput,
        filter: Number
    }
    ])
        .then(function (purchase) {

            let item = purchase.item_id
            let quantity = purchase.quantity

            let queryStr = 'SELECT * FROM products WHERE ?';


            connection.query(queryStr, { item_id: item }, function (err, res) {
                if (err) throw err

                if (res.length === 0) {
                    console.log("ERROR: Invalid Item ID. Please select a valid Item ID.")
                    displayInventory()
                } else {

                    // set the results to the variable of productInfo
                    let productInfo = res[0]

                    if (quantity <= productInfo.stock_quantity) {
                        console.log(productInfo.product_name + " is in stock! Placing order now!")
                        console.log("\n")

                        // the updating query string
                        var updateQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item
                        // console.log('updateQueryStr = ' + updateQueryStr);

                        // Update the inventory
                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log("Your order has been placed!");
                            console.log("Your total is $" + productInfo.price * quantity)
                            console.log("Thank you for shopping with bamazon!")
                            console.log(" - - - - - - - - - - - - - - - ")
                            console.log("To shop again with us please input 'node bamazonCustomer.js' into your command line again.")
                            console.log("\n")

                            // End the database connection and close the app
                            connection.end();
                        })
                    } else {
                        console.log("Sorry, there is not enough " + productInfo.product_name + " in stock.")
                        console.log("Your order can not be placed as is.")
                        console.log("Please modify your order or select another item.")
                        console.log("\n")

                        // After 3 seconds display the inventory again so that the customer can make a new selcetion.
                        setTimeout(function () { displayInventory() }, 3000)
                    }
                }

                })
                // .then(function (answer) {
                //     connection.query("INSERT INTO products SET?", {
                //         item_number: answer.item_id,
                //         product_name: answer.product_name,
                //         department_name: answer.department_name,
                //         price: price,
                //     });

            })




        }
