#import csv file in python
import os
import csv

csvpath = os.path.join('Resources/budget_data.csv')
with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')
    #skip the header row
    csv_reader = next(csvreader)
    #set date and profit/loss as separate blank arrays and total profit as 0
    date_column = []
    pl_column = []
    total_pl = 0
    
    #loop through each row of data after the header
    for row in csvreader:
    
        # d is the list of dates extracted from data 
        d = row[0]
        # p is the list of profit/loss extracted from data
        p = row[1]
        #push d and p to date_column and pl_column arrays, so they are separate lists and can be manipulated for calculations later
        date_column.append(d)
        pl_column.append(p)
        #sum the total profits/losses in all rows
        total_pl = total_pl + int(p)
    
    #sum the total number of months included in the dataset
    total_months = len(date_column)
    
    #set profits/losses changes from date to next date as an array
    changes = []

    #The total number of changes is one time less than the total number of dates in the dataset
    #loop through each change
    for i in range(len(date_column)-1):
        #each change equals to the profit/losses on next date minus the profits/losses on previous date
        delta = int(pl_column[i+1]) - int(pl_column[i])
        #push each change to pre-set array
        changes.append(delta)
    #find the average of the changes and round up to 2 decimals
    average_changes = round(sum(changes)/len(changes), 2)
    
    #The greatest increase in profits
    greatest_increase = max(changes)
    #find the index of the position in array with greatest increase value
    value_index1 = changes.index(greatest_increase)
    #find the date with greatest increase value
    greatest_increase_date = date_column[value_index1+1]
    
    #The greatest decrease in profits
    greatest_decrease = abs(min(changes))
    #find the index of the position in array with greatest decrease value
    value_index2 = changes.index(min(changes))
    #find the date with greatest decrease value
    greatest_decrease_date = date_column[value_index2+1]
        
#print all outputs
print("Financial Analysis")
print("-------------------------------")
print(f"Total Months: {total_months}")
print(f"Total: {total_pl}")
print(f"Average Change: ${average_changes}")
print(f"Greatest Increase in Profits: {greatest_increase_date} (${greatest_increase})")
print(f"Greatest Dncrease in Profits: {greatest_decrease_date} (${greatest_decrease})")