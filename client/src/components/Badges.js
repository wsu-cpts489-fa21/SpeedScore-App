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
      roundTimeLevel1: {qualification: 180,
                        name: "Speed gain",
                        description: "Competed for less than 3 hours"},
      roundTimeLevel2: {qualification: 60,
                        name: "Speed gold",
                        description: "Competed for less than 1 hour"}
   },
   roundStrokes: {
      roundStrokesLevel1: {qualification: 90,
                           name: "Beginner strokes",
                           description: "90 or less strokes in a round"},
      roundStrokesLevel2: {qualification: 80,
                           name: "Intermediate strokes",
                           description: "80 or less strokes in a round"},
      roundStrokesLevel3: {qualification: 70,
                           name: "Master strokes",
                           description: "70 or less strokes in a round"}
   },
   roundsInMonth: {
      roundsInMonthLevel1: {qualification: 2,
                           name: "Occasional player",
                           description: "Played twice in a month"},
      roundsInMonthLevel2: {qualification: 4,
                           name: "Medium perseverance",
                           description: "Played 4 times in a month"},
      roundsInMonthLevel3: {qualification: 8,
                           name: "High perseverance",
                           description: "Played 8 times in a month"}
   }
}

export default badges;