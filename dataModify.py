freq = open("frequency.tsv", "r")
newFreq = open("nrequency.tsv", "w+")
first = True
for line in freq:
    nl = line.split()
    if first:
        first = False
        nl = '\t'.join(nl) + '\n'
        newFreq.write(nl)
        continue
    i = 1
    while (nl[i] != '-') and (not nl[i].isdecimal()):
        print(nl[i])
        i = i + 1
    name = ' '.join(nl[:i])
    data = '\t'.join(nl[i:])
    nl = name + '\t' + data + '\n'
    newFreq.write(nl)