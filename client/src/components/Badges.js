/* Keeps the Badges information organized */

const badges = {
   rounds: {
      roundsLevel1: {qualification: 10,
                     name: "Beginner competitor",
                     description: "Played 10 rounds"},
      roundsLevel2: {qualification: 20,
                     name: "Intermediate competitor",
                     description: "Played 20 rounds"},
      roundsLevel3: {qualification: 30,
                     name: "Advanced competitor",
                     description: "Played 30 rounds"}
   },
   roundTime: {
      roundTimeLevel1: {qualification: 120,
                        name: "Outlast a game",
                        description: "Competed for 2 hours"},
      roundTimeLevel2: {qualification: 240,
                        name: "Outlast a long game",
                        description: "Competed for 4 hours"},
      roundTimeLevel3: {qualification: 360,
                        name: "Never get tired",
                        description: "Competed for 6 hours"}
   },
   roundStrokes: {
      roundStrokesLevel1: {qualification: 10,
                           name: "Beginner strokes",
                           description: "10 strokes in a round"},
      roundStrokesLevel2: {qualification: 50,
                           name: "Intermediate strokes",
                           description: "50 strokes in a round"},
      roundStrokesLevel3: {qualification: 100,
                           name: "Master strokes",
                           description: "100 strokes in a round"}
   },
   roundsInMonth: {
      roundsInMonthLevel1: {qualification: 2,
                           name: "Occasional player",
                           description: "Played twice in a month"},
      roundsInMonthLevel2: {qualification: 4,
                           name: "Intermediate frequency",
                           description: "Played 4 times in a month"},
      roundsInMonthLevel3: {qualification: 8,
                           name: "High frequency",
                           description: "Played 8 times in a month"}
   }
}

export default badges;