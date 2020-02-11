var mysql = require ("mysql");

var inquirer = require ("inquirer");

var Table = require ("cli-table2");



var connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password:"Caleb050701",

    database: "store_db",

    port: 3306

});

connection.connect();



var display = function() {

    connection.query("select * from products", function(err, res) {

        if (err) throw err;

        console.log("Welcome to this store");

        console.log("We have some electronics");

        console.log("Check out our stock");

        console.log("");

        console.log("");

     



     var table = new Table({

        head: ['Product Id', 'product_name', 'price'],

        colWidths: [10, 50, 7],

        colAligns: ['center', 'left', 'right'],

        style: {

            head: ['green'],

            compact: true

        }

    });

    for (var i = 0; i < res.length; i++) {

        table.push([res[i].id, res[i].product_name, res[i].price])

    };

        console.log(table.toString());

        console.log("");

        shop();

});



};



var shop = function() {

    inquirer.prompt({

        name: "buy",

        type: "input",

        message: "please enter the name of the product you would like to purchase."

    }).then(function(answer){



        var selection = answer.buy;

        connection.query("select * from products where product_name=?", selection, 

        function (err, res){

            if (err) throw err;

            if (res.length ===0) {

                console.log("that product does not exist");

                shop();

            } else {

                inquirer.prompt({

                    name: "quantity",

                    type: "input",

                    message: "how many items would you like to purchase?"

                }).then(function(otherAnswer){

                    var quantity = otherAnswer.quantity;

                    if (quantity > res[0].stock){

                        console.log("We only have" + res[0].stock + "of that item")

                        shop();

                    } else {

                        console.log("");

                        console.log(res[0].product_name + " purchased");





                        var newQuantity = res[0].stock;

                        connection.query(

                            "UPDATE products Set stock * " + newQuantity + "WHERE id * " + res[0].id, function(err, newRes) {

                                if (err) throw err;

                                console.log("");

                                console.log("Your order has been processed");

                                console.log("Thank you for shopping at this store");

                                console.log("");

                                connection.end();

                            } 

                        )

                    }

                })

            }

            

        });

    });

};





display();