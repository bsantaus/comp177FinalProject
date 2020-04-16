freq = open("newFrequency.tsv", "r")
newFreq = open("frequency.tsv", "w+")
first = True

carGames = ["Any Number", "Balance Game '06", "Barker's Bargain Bar", "Bonus Game", "Bullseye '76", "Card Game", "Check-Out",
            "Cliff Hangers", "Cover Up", "Dice Game", "Double Prices", "Five Price Tags", "Gas Money", "Golden Road",
            "Gridlock!", "Grocery Game", "Hi Lo", "Hole in One", "Let 'em Roll", "Line em Up", "Lucky $even", "Master Key",
            "Money Game", "Most Expen$ive", "Now....or Then", "On the Spot", "One Away", "Pass The Buck", "Pathfinder",
            "Pick-a-Number", "Pocket Change", "Push Over", "Race Game", "Range Game", "Rat Race", "Safe Crackers", "Secret \"X\"",
            "Shell Game", "Spelling Bee", "Squeeze Play", "Stack the Deck", "Switch?", "Switcheroo", "Temptation", "10 Chances",
            "That's Too Much!", "3 Strikes", "Triple Play", "2 for the Price of 1", "Vend-O-Price", "More or Less"]
cashGames = ["Grand Game", "1/2 Off", "Hot Seat", "It's in the Bag", "Pay the Rent", "Plinko", "Punch an Bunch", "Time i$ Money"]
smallGames = ["Bonus Game", "Cliff Hangers", "Five Price Tags", "1/2 Off", "Hot Seat", "Joker", "Master Key", "On the Spot", 
              "Pathfinder:", "Plinko", "Punch a Bunch", "Rat Race", "Secret \"X\"", "Shell Game", "Spelling Bee", "Switcheroo"]
oneGames = ["Balance Game", "Bonkers", "Check Game", "Coming or Going", "Double Prices", "Flip Flop", "Freeze Frame", "Pick-a-Number",
            "Push Over", "Range Game", "Side by Side", "Squeeze Play"]
twoGames = ["Barker's Bargain Bar", "Clock Game", "Do the Math", "Double Cross", "Magic #", "Make Your Move", "1 Right Price", "Safe Crackers",
            "Switch?", "2 for the Price of 1"]
threeGames = ["Barker's Marker$", "Buy or Sell", "Clearance Sale", "Eazy az 1 2 3", "Most Expen$ive", "1 Wrong Price"]
fourGames = ["Credit Card", "Danger Price", "Poker Game", "Race Game", "Shopping Spree", "Step Up", "Swap Meet", "Take Two", "More or Less"]
groceryGames = ["Bullseye '76", "Check-Out", "Grand Game", "Hi Lo", "Hit Me", "Hole in One", "It's in the Bag", "Let 'em Roll",
                "Now....or Then", "Pass The Buck", "Pay the Rent", "Penny Ante", "Pick-a-Pair", "Stack the Deck", "Time i$ Money",
                "Vend-O-Price"]

for line in freq:
    if first == True:
        line = line.splitlines()[0] + "\tCategory\n"
        newFreq.write(line)
        first = False
    else:
        game = line.split("\t")[0]
        cats = []
        if game in carGames:
            cats.append("CarGames")
        if game in cashGames:
            cats.append("CashGames")
        if game in smallGames:
            cats.append("SmallPrizeGames")
        if game in groceryGames:
            cats.append("GroceryProductGames")
        if game in oneGames:
            cats.append("OnePrizeGames")
        if game in twoGames:
            cats.append("TwoPrizeGames")
        if game in threeGames:
            cats.append("ThreePrizeGames")
        if game in fourGames:
            cats.append("FourFivePrizeGames")
        ct = 0
        cf = True
        cat = ""
        for c in cats:
            if cf == True:
                cat = c
                cf = False
                ct = ct + 1
            else:
                cat = cat + "," + c
                ct = ct + 1
        print(ct)

        
        line = line.splitlines()[0] + '\t' + cat + '\n'
        newFreq.write(line)
