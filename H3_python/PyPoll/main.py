#import csv file in python
import os
import csv

csvpath = os.path.join('03-Python_Homework_Instructions_PyPoll_Resources_election_data.csv')
with open(csvpath, newline='') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')
    #skip the header row
    csv_reader = next(csvreader)
    
    #set voter id, country and candidate as separate blank arrays
    voter_id = []
    county = []
    candidate = []
    #loop through each row of data after the header
    for row in csvreader:
        # v, c, p are the list of information extracted from each column in data 
        v = row[0]
        c = row[1]
        p = row[2]
        #push v,c and p to voter_id,county and candidate arrays, so they are separate lists and can be manipulated for calculations later
        voter_id.append(v)
        county.append(c)
        candidate.append(p)
    #total number of votes is total data counts 
    total_votes = len(voter_id)
    #find unique candidates names from candidate column and put them into a list
    candidate_unique = []
    for i in candidate:
        if i not in candidate_unique:
            candidate_unique.append(i)
    
    #find the total number of votes for each candidates
    a=candidate.count(candidate_unique[0])
    b=candidate.count(candidate_unique[1])
    c=candidate.count(candidate_unique[2])
    d=candidate.count(candidate_unique[3])
    
    #find the percentage of votes each candidate won
    a_percent = "{0:.2%}".format(round(a/total_votes,2))
    b_percent = "{0:.2%}".format(round(b/total_votes,2))
    c_percent = "{0:.2%}".format(round(c/total_votes,2))
    d_percent = "{0:.2%}".format(round(d/total_votes,2))
    
    #create a list for percentage and total number of votes
    percent_list =[a_percent,b_percent,c_percent,d_percent]
    votes =[a,b,c,d]
    
    #create a dictionary for each candidate
    candidate_dict = dict(zip(candidate_unique,zip(percent_list,votes)))
    #find the candidate with highest number of votes
    most_votes =max(votes)
    index1 = votes.index(most_votes)
    winner = candidate_unique[index1]

    #print outputs
    print("Election Results")
    print("------------------------")
    print(f"Total Votes: {total_votes}")
    print("------------------------")
    print(candidate_dict)
    print("------------------------")
    print(f"Winner: {winner}")
    print("------------------------")