describe('Account', () => {
 'use strict'
 var account;
 var date;
 var printer;
 var date2;

 beforeEach(() => {
   printer = {
     printStatement: function(accountHistory){
       return "Printed statement"
     }
   };
   account = new Account(printer);
   date = '15/06/2020'
 });

 it('initialises with a balance of 0', () => {
   expect(account.balance).toEqual(0);
 });

 it('initialises with empty account history', () => {
   expect(account.accountHistory).toEqual([]);
 });

 describe('formatDate', () => {
   it('formats the date into a string', () => {
     date2 = new Date().toLocaleDateString();
     expect(account.formatDate(new Date())).toEqual(date2);
   });
 });

 describe('makeDeposit', () => {
   it('returns error if amount is less than 0', () => {
     expect(function() { account.makeDeposit(-10); }).toThrowError(TypeError, 'You must input a positive integer.');
   });

   it('returns error if amount is less than 0', () => {
     expect(function() { account.makeDeposit('test'); }).toThrowError(TypeError, 'You must input a positive integer.');
   });

   it('creates transaction object with date and credit amount to account history', () => {
     spyOn(account, "formatDate").and.returnValue('15/06/2020');
     account.makeDeposit(500);
     expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
      amount: 500
    }));
    expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
     date: '15/06/2020'
    }));
    expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
     type: 'Deposit'
    }));
   });
 });

 describe('makeWithdrawal', () => {
   it('returns error if amount is less than 0', () => {
     expect(function(){ account.makeWithdrawal(-10); }).toThrowError(TypeError, 'You must input a positive integer.');
   });

   it('returns error if amount is a string', () => {
     expect(function(){ account.makeWithdrawal('test'); }).toThrowError(TypeError, 'You must input a positive integer.');
   });

   it('creates transaction object with date and debit amount to account history', () => {
     spyOn(account, "formatDate").and.returnValue('15/06/2020');
     account.makeWithdrawal(500);
     expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
      amount: 500
    }));
    expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
     date: '15/06/2020'
    }));
   expect(account.accountHistory[0]).toEqual(jasmine.objectContaining({
    type: 'Withdrawal'
    }));
   });
 })

 describe('viewStatement', () => {
   it('prints statement in table', () => {
     account.makeDeposit(1500);
     account.makeWithdrawal(500);
     expect(account.viewStatement()).toBe("Printed statement")
   });
 })

 describe('getBalance', () => {
   it('calculates balance and stores in array', () => {
     account.makeDeposit(1500);
     account.makeWithdrawal(500);
     account.getBalance();
     expect(account.balanceRecord[0]).toEqual(1500)
     expect(account.balanceRecord[1]).toEqual(1000)
   });
 });
})
