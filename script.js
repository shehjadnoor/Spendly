let transactions=[];

document.getElementById("showPass")
.addEventListener("change",function(){

let password=
document.getElementById("password");

if(this.checked){

password.type="text";

}else{

password.type="password";

}

});

function login(){

let email=
document.getElementById("email").value;

let password=
document.getElementById("password").value;

let emailPattern=
/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(email==""||password==""){

document.getElementById("loginMessage")
.innerText="Please fill all fields";

return;
}

if(!email.match(emailPattern)){

document.getElementById("loginMessage")
.innerText="Invalid Email";

return;
}

if(
email=="admin@gmail.com"
&&
password=="123456"
){

document.getElementById("loginPage")
.style.display="none";

document.getElementById("mainPage")
.style.display="block";

}else{

document.getElementById("loginMessage")
.innerText=
"Wrong Email or Password";

}

}

function logout(){

document.getElementById("mainPage")
.style.display="none";

document.getElementById("loginPage")
.style.display="flex";

}

document.getElementById("transactionForm")
.addEventListener("submit",function(e){

e.preventDefault();

let title=
document.getElementById("title").value;

let amount=
document.getElementById("amount").value;

let category=
document.getElementById("category").value;

let type=
document.querySelector(
'input[name="type"]:checked'
).value;

let important=
document.getElementById("important").checked;

if(
title==""
||
amount==""
||
category==""
){

document.getElementById("formMessage")
.innerText=
"Please fill all fields";

return;
}

let transaction={

id:Date.now(),

title:title,

amount:Number(amount),

category:category,

type:type,

important:important
};

transactions.push(transaction);

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

displayTransactions();

document.getElementById("transactionForm")
.reset();

document.getElementById("formMessage")
.innerText=
"Transaction Added Successfully";

});

function displayTransactions(){

let transactionList=
document.getElementById("transactionList");

transactionList.innerHTML="";

let income=0;

let expense=0;

for(let i=0;i<transactions.length;i++){

let item=transactions[i];

if(item.type=="Income"){

income+=item.amount;

}else{

expense+=item.amount;
}

let div=
document.createElement("div");

div.classList.add("transaction");

div.innerHTML=`

<h3>${item.title}</h3>

<p>Amount: ৳ ${item.amount}</p>

<p>Category: ${item.category}</p>

<p>Type: ${item.type}</p>

<p>Important:
${item.important ? "Yes" : "No"}
</p>

<button
class="edit-btn"
onclick="editTransaction(${item.id})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteTransaction(${item.id})">
Delete
</button>

`;

transactionList.appendChild(div);

}

document.getElementById("income")
.innerText="৳"+income;

document.getElementById("expense")
.innerText="৳"+expense;

document.getElementById("balance")
.innerText=
"৳"+(income-expense);

document.getElementById("counter")
.innerText=
transactions.length;

}

function deleteTransaction(id){

let newTransactions=[];

for(let i=0;i<transactions.length;i++){

if(transactions[i].id!=id){

newTransactions.push(transactions[i]);

}

}

transactions=newTransactions;

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

displayTransactions();

}

function editTransaction(id){

let newTitle=
prompt("Enter New Title");

for(let i=0;i<transactions.length;i++){

if(transactions[i].id==id){

transactions[i].title=
newTitle;

}

}

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

displayTransactions();

}

let visible=true;

function toggleTransactions(){

let list=
document.getElementById("transactionList");

if(visible){

list.style.display="none";

visible=false;

}else{

list.style.display="block";

visible=true;

}

}

function toggleDarkMode(){

document.body.classList.toggle("dark");

}

function convertCurrency(){

let usd=
document.getElementById("usdAmount")
.value;

fetch(
"https://open.er-api.com/v6/latest/USD"
)

.then(response=>response.json())

.then(data=>{

let rate=data.rates.BDT;

let result=usd*rate;

document.getElementById("convertedAmount")
.innerText=
usd+
" USD = "+
result.toFixed(2)+
" BDT";

});

}

let savedTransactions=
JSON.parse(
localStorage.getItem("transactions")
);

if(savedTransactions){

transactions=savedTransactions;

displayTransactions();

}