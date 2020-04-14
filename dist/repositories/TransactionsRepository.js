"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var income = 0;
var outcome = 0;
var total = 0;
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        var transactions = JSON.parse("\n    {\n      \"transactions\":\n        " + JSON.stringify(this.transactions) + ",\n      \"balance\": {\n        \"income\": " + income + ",\n        \"outcome\": " + outcome + ",\n        \"total\": " + total + "\n      }\n    }");
        return transactions;
    };
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
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        if (type === 'income') {
            income += value;
        }
        else if (type === 'outcome') {
            if (value > income - outcome) {
                throw Error('Outcome greater than Balance');
            }
            outcome += value;
        }
        total = income - outcome;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
