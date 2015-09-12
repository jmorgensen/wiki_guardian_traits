import os

savename = "~/.paradoxinteractive/Crusader Kings II/save games/1113.ck2"
MAX_TRAITS = 300

char_count = 0
trait_count = [0 for i in range(MAX_TRAITS)]

for rawline in open(os.path.expanduser(savename)):
	line = rawline.strip()
	if line.startswith("birth_date="):
		birth_year = int(line[12:16])
		yay = 1067 < birth_year < 1096  # born during game AND adult
	if line.startswith("traits="):
		trait_list_str = line[8:-2]
		for t in trait_list_str.split(" "):
			trait_count[int(t)] += 1
		char_count += 1
		yay = False


for i in range(MAX_TRAITS):
	if trait_count[i] != 0:
		print "Trait #%d: %d" % (i, trait_count[i])
print "(out of %d adult characters born during the simulation)" % char_count
