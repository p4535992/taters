/**
 *  NPC module
 *  Used for creating descriptive NPCs
 * 
 * Requires following modules:
 *      rulGen.js
 *      seedrandom.js
 *      mRPG.js
 *
 */
// Requires rulGen.js
var rulGenerator = rulGenerator || {};

console.log("Loading NPC library");
var NPC = (function( options ) {

    // Check if seedRandom is part of Math library If not load it.
    var loadingMathSeedRandom = true;
    if (!Math.hasOwnProperty("seedrandom")) {
        // Does not exist, load it.
        return {error: "Missing seedrandom library"};
    }

    var rulGen = rulGenerator;

/*
    // Following to randomly select object property
    Object.prototype.selectRandomProperty = function() {
         var keys = Object.keys(this);
         return keys[ keys.length * Math.random() << 0];
    }    
*/
    function selectRandomProperty(obj) {
        if (typeof(obj) === "object") {
            var keys = Object.keys(obj);
            return keys[ keys.length * Math.random() << 0];
        }
    }

    // Establish our default settings
    var settings = $.extend({
            levelBaseOnAge: true,
            race        : '',
            profession  : '',
            raceFlags   : {
                    'DRACONIC': '/adnd/images/banners/draconicBanner01.png',
                    'DWARVEN': '/adnd/images/banners/dwarvenBanner01.png',
                    'ELVEN': '/adnd/images/banners/elvenBanner01.png',
                    'HALFBREED': '/adnd/images/banners/halfbreedBanner01.png',
                    'HALFLING': '/adnd/images/banners/halflingBanner01.png',
                    'HALF-ORC': '/adnd/images/banners/half_orcBanner01.png',
                    'HUMAN': '/adnd/images/banners/humanBanner01.png',
                    'PLANER': '/adnd/images/banners/planerBanner01.png',
                    'ORC': '/adnd/images/banners/half_orcBanner01.png',
                    'UNDEAD': '/adnd/images/banners/undeadBanner01.png',
                    'MONSTEROUS': '/adnd/images/banners/monsterBanner01.png',
                    'UNKNOWN': '/adnd/images/banners/unknownBanner01.png',
                },
          $npcTemplate  : $("#npcTemplate"),
          npcTemplateSrc: "", // $npcTemplate.text(),
          backgroundSet : {}
          
        }, options);


    // Simple array for profciency bonus computation
    var proficiencyBonus = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

    var npcObject = {

        name: "characterName",
        race: "",
        alignment: "chaotic",
        gender: "Male",
        type: "Humanoid",
        class: {},
        profession: {},
        category: "",
        proficiencyBonus: "2",
        level: "1",
        age: "1",
        
        AC: "10",
        hitpoints: "23",
        movement: "30 ft",
        stats: {
            STR: "15",
            DEX: "14",
            CON: "20",
            INT: "13", 
            WIS: "11",
            CHR: "5",
            modifier:function() {
              return function (text, render) {
                var renderVal = (render(text));
                var modifier= 0;
                if (renderVal > 10) {
                    modifier = Math.floor((renderVal-10)/2);
                } else {
                    modifier= Math.floor(((renderVal-10)/2)+0.5);
                };
                //console.log("Mod:" + modifier);
                var adjustment="+";
                if (modifier < 0) {
                    adjustment="";
                }
                return adjustment+modifier
              }
            },
            mod: function(stat) {
                if (stat > 10) {
                    return Math.floor((stat-10)/2);
                } else {
                    return Math.floor(((stat-10)/2)+0.5);
                }
            }
        },
        backgroundTrait:  '',
        backgroundIdea: '',
        appearance: {
            hair: '',
            hairColor: '',
            speech: '',
            facialFeatures: '',
            characteristics: '',
            personality: '',
            instincts: '',
            knacks: '',
            eyes: '',
            height: '',
            build: ''
        }
       
    }; // END npcObject 

    
    // Method for computing level based on age.
    function computeLevelFromAge(age, raceMinAge) {
        // Number of years to the average NPC takes to advance to the next level
        var years2Advance = [1,2,6,13,25,30,37,47,53,70,50,67,67,83,100,100,133,133,167,167];
        var level = 0;
        var activeAge = raceMinAge;
        var cnt = 0;
        while ((activeAge + years2Advance[level]) <= age) {
            activeAge += years2Advance[level++];
            if (cnt++ > 20) {
                break;
            }
        };
        // Add one because we start at 0;        
        return level+1;
    }


    // ------------------------------------------------------------------------------------------------------------
    // Following object with any or all of the optional parameters
    // characterOptions = {
    //      seed: string used to initlize random generator
    //      race: string
    //      parentRace: string
    //      level: number
    //      profession: string
    //      name: string
    //      levelByAge: true/false (default true)
    //      age: character age
    //
    // }
    // ------------------------------------------------------------------------------------------------------------
    function generateCharacter(characterOptions) {
        
        
        // ---- SEED ----------------------------------------------- Seed random generator if provided
        if ((typeof characterOptions.seed == 'string') && (characterOptions.seed != '')) {
            npcObject.seed = Math.seedrandom(characterOptions.seed);
        } else {
            // generate and store seed
            npcObject.seed = mRPG.generateSeededUUID();
            Math.seedrandom(npcObject.seed);
        }
        
        // ---- RACE ----------------------------------------------- Selects sub race
        if ((typeof characterOptions.race == 'string') && (characterOptions.race != '')) {
            // Use Race
            npcObject.race = race_collection[race_list[characterOptions.race]][characterOptions.race];
        } else if ((typeof characterOptions.parentRace == 'string') && (characterOptions.parentRace != '')) {
            // Use Parent Race to randomly get race
            //npcObject.race = race_collection[characterOptions.parentRace][race_collection[characterOptions.parentRace].selectRandomProperty()];
            console.log(selectRandomProperty(race_collection[characterOptions.parentRace]));
            npcObject.race = race_collection[characterOptions.parentRace][selectRandomProperty(race_collection[characterOptions.parentRace])];
        } else {
            // Randomly determine race
            //var parentRace = race_collection.selectRandomProperty();
            var parentRace = selectRandomProperty(race_collection);
            
            //npcObject.race = race_collection[parentRace][race_collection[parentRace].selectRandomProperty()];
            npcObject.race = race_collection[parentRace][selectRandomProperty(race_collection[parentRace])];
            
        }
        
        // ---- NAME ----------------------------------------------- 
        // Check if race name exists, otherwise check species name
        var racialNameModifier = npcObject.race.name.toLowerCase() + npcObject.gender;
        if (name_set.hasOwnProperty(npcObject.race.name.toLowerCase() + npcObject.gender)) {
            npcObject.name = name_set[npcObject.race.name.toLowerCase() + npcObject.gender].randomElement();
        } else if (name_set.hasOwnProperty(npcObject.race.name.toLowerCase())) {
            npcObject.name = name_set[npcObject.race.name.toLowerCase()].randomElement();
        } else if (name_set.hasOwnProperty(npcObject.race.species.toLowerCase() + npcObject.gender)) {
            npcObject.name = name_set[npcObject.race.species.toLowerCase() + npcObject.gender].randomElement();
        } else if (name_set.hasOwnProperty(npcObject.race.species.toLowerCase())) {
            npcObject.name = name_set[npcObject.race.species.toLowerCase()].randomElement();
        } else {
            npcObject.name = name_set["english"].randomElement();
        } 
        
        // Set race flag
        npcObject.race.flag = settings.raceFlags[npcObject.race.species.toUpperCase()];       
        
        // ---- PROFESSION ----------------------------------------------- Selects sub profession
        if ((typeof characterOptions.profession == 'string') && (characterOptions.profession != '')) {
            // Use Race
            npcObject.profession = professions[characterOptions.profession];
        } else {
            // Randomly determine profession
            //npcObject.profession = professions[professions.selectRandomProperty()];
            npcObject.profession = professions[selectRandomProperty(professions)];
        }

        // ---- STATS ------------------------------------------------
        if (npcObject.profession.hasOwnProperty('stats')) {
            npcObject.stats.STR = npcObject.profession.stats.STR;
            npcObject.stats.DEX = npcObject.profession.stats.DEX;
            npcObject.stats.CON = npcObject.profession.stats.CON;
            npcObject.stats.INT = npcObject.profession.stats.INT;
            npcObject.stats.WIS = npcObject.profession.stats.WIS;
            npcObject.stats.CHR = npcObject.profession.stats.CHR;
            if (npcObject.race.hasOwnProperty('stats')) {
                for(var stat in npcObject.race.stats){
                    npcObject.stats[stat] = npcObject.stats[stat] + npcObject.race.stats[stat];
                }
            }
        }

        // ---- AGE ----------------------------------------------- determine character age
        if ((typeof characterOptions.age == 'number') && (characterOptions.age > 1)) {
            npcObject.age = characterOptions.age;
        } else {
            // Randomly determine age
            var ageadjust =  Math.floor(Math.random() * (npcObject.race.age.maxage - npcObject.race.age.adulthood));
            npcObject.age = npcObject.race.age.adulthood + ageadjust;
        }
        
        // ---- LEVEL ------------------------------------------------
        if ((typeof characterOptions.level  == 'number') && (characterOptions.level > 0)) {
            npcObject.level = characterOptions.level;
        } else  if ((typeof characterOptions.levelByAge  == 'boolean') && (characterOptions.levelByAge)) {
            npcObject.level = computeLevelFromAge(npcObject.age, npcObject.race.age.adulthood); 
        } else  if ((typeof characterOptions.levelByAge  != 'boolean') && (settings.levelBaseOnAge)){
            npcObject.level = computeLevelFromAge(npcObject.age, npcObject.race.age.adulthood); 
        } else {
            npcObject.level = 1;
        }
    
        // ---- HIT POINTS / PASSIVE PERCEPTION  ------------------------------------------------
        npcObject.senses = {};
        npcObject.senses.perception = {};
        npcObject.senses.perception.name = "Passive Perception";
        npcObject.senses.perception.bonus = 10 + proficiencyBonus[npcObject.level] + npcObject.stats.mod(npcObject.stats.WIS);
        npcObject.hitpointsBase = 8 + ((npcObject.level-1) * 5) ;
        npcObject.hitpointsCON = npcObject.level * npcObject.stats.mod(npcObject.stats.CON);
        npcObject.hitpointsCONModifier = npcObject.stats.mod(npcObject.stats.CON);
        npcObject.hitpoints = npcObject.hitpointsBase  + npcObject.hitpointsCON ;
    
        // Determine sex
        var genderRoll = Math.floor((Math.random() * 100));
        if (genderRoll > npcObject.race.gender) {
            npcObject.gender = "Female";
        } else {
            npcObject.gender = "Male";
        }
        
        // Set proficiency
        npcObject.proficiencyBonus = proficiencyBonus[npcObject.level - 1];

        // ---- BACKGROUND and APPEARANCE ------------------------------
        npcObject.appearance.characteristics = appearance.characteristics.randomElement();
        //if (npcObject.appearance.characteristics.hasOwnProperty('hasLocation')) {
        //    npcObject.appearance.characteristics.text = npcObject.appearance.characteristics.text  + " on " + appearance.bodyLocations.randomElement();
        //}
        npcObject.appearance.hair = appearance.hair.randomElement();
        npcObject.appearance.hairColor = appearance.hairColor.randomElement();
        npcObject.appearance.speech = appearance.speech.randomElement();
        npcObject.appearance.facialFeatures = appearance.facialFeatures.randomElement();
        npcObject.appearance.personality = appearance.personality.randomElement();
        npcObject.appearance.instincts = appearance.instincts.randomElement();
        npcObject.appearance.knacks = appearance.knacks.randomElement();
        npcObject.appearance.eyes = appearance.eyes.randomElement();
        npcObject.appearance.height =  appearance.height.randomElement();
        npcObject.appearance.build = appearance.build.randomElement()
        
        npcObject.backgroundTrait =  background_set['traits'].randomElement();
        npcObject.backgroundIdea = background_set['ideas'].randomElement();
            
        // Generate carried items
        var itemsCarried = [];
        var ruleSetModified = "SMALLVALUE";
        if (rule_set.hasOwnProperty(ruleSetModified +  npcObject.profession.category)) {
            ruleSetModified = "SMALLVALUE"  + npcObject.profession.category;
        }
        console.log("Starting items carried for:" + ruleSetModified);
        for (var itemCount = 0; itemCount < 8; itemCount++) {
            var descriptionText = rulGen.generateRul(ruleSetModified, rule_set);
            console.log(descriptionText);
            itemsCarried.push({cnt: itemCount, description: descriptionText});
        }
        npcObject.items = itemsCarried;
        
        // Storyhook/gossip
        npcObject.gossip = rulGen.generateRul("RUMORS", rule_set);

        // Convert Object to HTML text
        var mdStatBlockTemplate = $("#npcTemplate").text();
        npcObject.formattedMarkdown = Mustache.render(mdStatBlockTemplate, npcObject);
        //$("#statblock").html(output2);
        
        console.log(npcObject);
        return npcObject;
    }      // End   generateCharacter()

    

    // Return handles to internal function for public consumption
    return {
        computeLevelFromAge: computeLevelFromAge,
        generateCharacter: generateCharacter
    }
})();  // END NPC



