const Modal = {
    open(){
        //abrir modal
        //add a class active ao modal
        document
        .querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        //fechar modal 
        // remover a class active do modal
        document
        .querySelector('.modal-overlay')
        .classList.remove('active')

    }
}

const transactions =[
    {
    id: 1,
    description: 'luz',
    amount: -50000,
    date: '23/01/2021',
    } ,

    {
        id: 1,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    } ,

    {
            id: 1,
            description: 'Internet',
            amount: -25000,
            date: '23/01/2021',
    } 
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)
        
    },

    incomes(){
        let income = 0;

        //pegar todas as transações
        //para cada trasação,
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if(transaction.amount > 0){
                //somar a variable 
                income += transaction.amount
            }
        })
    
        return income
    },

    expenses(){
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount
            }
        })
       return expense
    },
    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}

//substituir os dados do HTML com os dados js

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction){
        const CSSClass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="descripcion">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>      
        `
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })

        return signal + value
    }
}


transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)

    DOM.updateBalance(transaction)
})