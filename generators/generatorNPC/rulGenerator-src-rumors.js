var rule_set = rule_set || {};

   rule_set['RUMORS'] = [
       'I heard that, [WHEN,] WHO was seen with WHAT down near WHERE and nearby there was TARGETWHAT. [I heard it from WHOM.]',
       'I heard that, [WHEN,] WHOMWHO was seen with WHAT down near WHERE and nearby there was TARGETWHAT. [I heard it from WHOM.]',
       'I heard that, [WHEN,] WHOMWHO was seen with WHAT down near WHERE and nearby there was TARGETWHAT. [I heard it from WHOM.]',
       'My RELATIVE has RELATIVEACTION[ in PLACE,][ and rumor is that ORGANIZATION is behind it].',
       '[WHEN ]I have lost an LOSTTOKEN[ LOSTTOKENACTION].',
       'ORGANIZATION is trying to ORGANIZATIONACTION[, organized by WHOM RELATIVEACTIONTWO their RELATIVE].',
       'I have heard rumor of a lost PLACEORITEM[ that ORGANIZATION is seeking].',
       'I have heard rumor of a lost PLACE [ that has MONSTERHUMANOIDS living in it].',
       'I have a [magical ]SMALLVALUE for sale.',
       'I have a [magical ]WEAPONS for sale.',
       'I have a [magical ]BOOK for sale.',
    ];


   rule_set['LOSTTOKENACTION'] = [
       'and believe ORGANIZATION is behind it',
       'and saw WHO with it',
       'and believe it was taken [WHEN ]by MONSTERHUMANOIDS',
       'and believe it was taken [WHEN ]by WHOMWHO',
   ];


   rule_set['PLACE'] = [
        'dungeon[ with a DUNGEONOBJECT in it]',
        'cave[ with a DUNGEONOBJECT in it]',
        'library[ with a BOOK]',
        'town[ with a PLACEOBJECT]',
        'ruins[ with a PLACEOBJECT]',
        'old house[ with a COLOR shingled roof]',
        'abandoned building[ with a COLOR shingled roof]',
        'swamp[ with a NATURALOBJECT in it]',
        'woods[ with a NATURALOBJECT in it]',
        '[SIZE ]tower[ with a COLOR shingled roof]',
   ];
   
   rule_set['DUNGEONOBJECT'] = [
        'giant ANIMAL',
        '[crumbling] tower',
        'secret vault',
   ];
   
   rule_set['PLACEOBJECT'] = [
        'giant ANIMAL',
        '[old ]castle',
        '[crumbling] tower',
        '[old ]library',
        'secret vault',
   ];
   
   rule_set['NATURALOBJECT'] = [
        '[SIZE ][magical ]tree',
        '[SIZE ][magical ]rock',
        '[SIZE ]pond',
        '[SIZE ]sunken log',
        '[SIZE ]ANIMAL',
   ];

   rule_set['PLACEORITEM'] = [
        'PLACE',
        'ARTIFACT',
   ];
   
   rule_set['ARTIFACT'] = [
        'artifcat',
        '[artifcat] WEAPONS',
        '[artifcat] JEWELERY',
        '[artifcat] RAREGEMVALUES',
        'BOOK',

   ];
    
   rule_set['ORGANIZATION'] = [
        'The [local ]church',
        'A [local ]guild',
        'A [local ]competitor',
        'The town',
        'A lord',
        'WHOMWHO'
   ];
    
   rule_set['ORGANIZATIONACTION'] = [
        'force him out',
        'ruin him',
        'buy him out',
        'steal his secrets'
   ];
    
   rule_set['LOSTTOKEN'] = [
        'SMALLVALUE',
        'ARTIFACT',
        'WEAPONS',
   ];
    
   rule_set['RELATIVE'] = [
        'son',
        'neice',
        'daughter',
        'wife',
        'friend',
        'neighbor'
   ];

   rule_set['RELATIVEACTION'] = [
        'been captured',
        'run away',
        'left',
        'been taken hostage',
        'come down with an unknown illness',
        'come down with an unknown disease',
        'been cursed',
        'been killed'
   ];

   rule_set['RELATIVEACTIONTWO'] = [
        'killing',
        'taking',
        'kidnapping',
        'bribing',
   ];

   rule_set['WHEN'] = [

        "NUMBER1TO10 year(s) ago from tonight",
        "one night last LONGDATEPERIOD",
        "twice last month",
        "twice last week",
        "one day last week",
        "one night last week",
        "NUMBER1TO10 nights ago",
        "the day before yesterday",
        "the night before last",
        "yesterday morning",
        "yesterday afternoon",
        "just before sunset",
        "after sunset",
        "after nightfall",
        "before midnight",
        "past midnight",
        "in the wee hours",
        "just before dawn",
        "at daybreak",
        "earlier today",
    ];    
    
   rule_set['NUMBER1TO10'] = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];    
    
   rule_set['LONGDATEPERIOD'] = [
        "week",
        "month",
        "year"
    ];    
    
    
   rule_set['WHOMWHO'] = [
        "WHO",
        "WHOM",
    ];   
    
    
   rule_set['WHO'] = [
        "the king/queen",
        "AWHO",
        "AWHO",
        "AWHO",
        "AWHO",
    ];   
    
   rule_set['AWHO'] = [
        "a [local ]WHOLIST",
    ];   
    
   rule_set['WHOLIST'] = [
        "farmer",
        "merchant",
        "wizard",
        "soldier",
        "cleric",
        "druid",
        "orphan",
        "sailor",
        "thief",
        "miner",
        "lord",
        "knight",
        "dwarf",
        "elf",
        "singer",
        "pirate",
        "witch",
    ];   
    
     
    
   rule_set['WHAT'] = [
        "a prostitute",
        "a drunk",
        "an artifact",
        "a talking WEAPONTYPE",
        "a Drow",
        "a SMALLVALUE",
        "an escaped convict",
        "a vial of poison",
        "a BOOK",
        "a talking ANIMAL",
        "a sack of coins",
        "the prince/princess",
        "a fortune teller",
        "an alchemist",
        "an assassin",
        "a barmaid",
        "a beggar",
        "a saddled horse",
        "a hunting hound",
        "a mule and cart",
        "a fake mustache",
    ];    
    
   rule_set['WHERE'] = [
        "the docks",            
        "the palace",
        "the crafts guild",
        "the mages guild",
        "the brothel",
        "the merchant quarter",
        "the tavern",
        "the prison",
        "the museum",
        "the asylum",
        "the library",
        "the barracks",
        "the gatehouse",
        "the bridge",
        "the temple",
        "the market square",
        "the warehouse district",
        "the garden district",
        "the lighthouse",
        "the riverfront",
    ];    
    
   rule_set['TARGETWHAT'] = [
        "a [dead ][horde of ]CREATURES",
        "an explosion",
        "a [bloody ]WEAPONTYPE",
        "a [damaged ]WEAPONTYPE",
        "a planar gate",
        "a [horde of ]GENERICMONSTER",
        "a [dead ]GENERICMONSTER",
        "an angry mob [of GENERICMONSTER]",
        "a dead noble",
        "an arcane sigil",
        "a frightened crowd",
        "an angel",
        "a series of claw marks",
        "a series of scorch marks",
        "an empty vial",
        "a burned BOOK",
        "a SMALLVALUE",
        "a [dead ]ANIMAL",
        "a CRATESMALL",
        "a CRATEMEDIUM",
    ];    
    
   rule_set['WHOM'] = [
        "a shopkeeper",
        "a basketweaver",
        "a grocer",
        "a peddler",
        "a beggar",
        "an urchin",
        "a barkeep",
        "a serving girl",
        "a squire",
        "a singer",
        "a madame",
        "a watchman",
        "a ship's captain",
        "a peasant woman",
        "a fisherman's wife",
        "a monk",
        "a sellsword",
        "a gambler",
        "some guy in a pub",
        "a little bird",
    ];    
    
   rule_set['EMPTY'] = [
    ];    
    
    