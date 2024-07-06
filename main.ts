#! /usr/bin/env node
import inquirer from "inquirer"
//----------------------------------------- welcome ---------------------------------------------------

console.log("\t*****  Welcome to the Bank  *****");
console.log("Dear checker there are three following accounts in this bank");
console.log("\taccounts = balance");
console.log("\t****1001 = $5000****");
console.log("\t****1002 = $10000****");
console.log("\t****1003 = $20000****");
console.log("\tEnter anyone from it");


//----------------------------------------Bank account interface---------------------------------------------
interface BankAcount{
    accountNumber: number;
    balance: number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}

//----------------------------------------- Bank Account Class --------------------------------------------------
class BankAcount implements BankAcount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance
    }

    //----------------------------------------- Debit Money -----------------------------------------------------
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successful. Remaining balance is $${this.balance}`);
        }else{
            console.log("Insufficient Balance.");   
        }
    }

    //----------------------------------------- Credit Money -------------------------------------------------
    deposit(amount: number): void {
        if(amount > 100){
            amount -=1; // $1 fee charged if more than $100 deposited
        }this.balance += amount
        console.log(`Deposit of $${amount} successful. Remaining Balance: $${this.balance}`);
    }

    //------------------------------------------ Check Balance ----------------------------------------------
    checkBalance(): void {
        console.log(`Current Balance $${this.balance}`);
    }

}

    //---------------------------------------- Creating Customer Class --------------------------------------
    class Customer{
        firstName: string;
        lastName: string;
        gender: string;
        age: number
        mobileNumber: number;
        account: BankAcount;

        constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber:number, account:BankAcount)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.age = age;
            this.mobileNumber = mobileNumber;
            this.account = account
        }
    }

//--------------------------------------------- Creating Bank Accounts --------------------------------------------

const accounts: BankAcount[] = [
    new BankAcount(1001, 5000),
    new BankAcount(1002, 10000),
    new BankAcount(1003, 20000)
];

//------------------------------------------------ Creating Customers ------------------------------------------
const customers: Customer[] = [
    new Customer("Nazia", "Imran", "Female", 35, 123456789, accounts[0]),
    new Customer("Ali", "Khan", "Male", 34, 348099090, accounts[1]),
    new Customer("Sara", "Khan", "Female", 23, 389890492, accounts[2])
]

//------------------------------------------- Fuction to interact with bank account -----------------------------

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt(
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            }
        );

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices:["Deposit","Withdraw","Check Balance","Exit"]
                }
            ]);

            switch(ans.select){
                    case"Deposit" :
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;

                    case"Withdraw" :
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    customer.account.withdraw(withdrawAmount.amount);
                    break;

                    case "Check Balance":
                        customer.account.checkBalance();
                        break;

                    case "Exit":
                        console.log("Exiting Bank Program...");
                        console.log("\n Thank you for using our Bank services. Have a great day!");
                        return             
            }
        }else{
            console.log("Invalid Account number. Please try again.");
            
        }
    }while(true)
}
service()