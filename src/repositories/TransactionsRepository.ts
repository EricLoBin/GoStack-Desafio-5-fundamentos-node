import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

let income = 0;
let outcome = 0;
let total = 0;

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactions = JSON.parse(`
    {
      "transactions":
        ${JSON.stringify(this.transactions)},
      "balance": {
        "income": ${income},
        "outcome": ${outcome},
        "total": ${total}
      }
    }`);

    return transactions;
  }

  /* public getBalance({ title }: Request): Balance {
    const Balance: Balance = {
      income,
      outcome,
      total,
    }: Balance;
    /* this.transactions.find(transaction => {
      if (transaction.title === title) {
        if (transaction.type === 'income') {
          Balance.income += transaction.value;
        } else {
          Balance.outcome += transaction.value;
        }
      }
    });
    // TODO
    return Balance;
  } */

  public create({ title, value, type }: Request): Transaction {
    if (type === 'income') {
      income += value;
    } else if (type === 'outcome') {
      if (value > income - outcome) {
        throw Error('Outcome greater than Balance');
      }
      outcome += value;
    }

    total = income - outcome;

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
