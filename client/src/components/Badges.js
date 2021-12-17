/* Keeps the Badges information organized */
import badge1 from '../images/badge1.png';
import badge2 from '../images/badge2.png';
import badge3 from '../images/badge3.png';
import badge4 from '../images/badge4.png';
import badge5 from '../images/badge5.png';
import badge6 from '../images/badge6.png';
import notBadge1 from '../images/~badge1.png';
import notBadge2 from '../images/~badge2.png';
import notBadge3 from '../images/~badge3.png';
import notBadge4 from '../images/~badge4.png';
import notBadge5 from '../images/~badge5.png';
import notBadge6 from '../images/~badge6.png';

const badges = {
   rounds: {
      badge: badge3,
      notBadge: notBadge3,
      name: "The Experience Badge",
      level: "level0",
      level1: {qualification: 1,
                           name: "The Hacker",
                           description: "Log your 1st round!"},
      level2: {qualification: 10,
                           name: "The Golfer",
                           description: "Log 10 rounds!"},
      level3: {qualification: 20,
                           name: "The Pro",
                           description: "Log 20 rounds!"}
   },
   roundCourseCount: {
      badge: badge5,
      notBadge: notBadge5,
      name: "The Traveller Badge",
      level: "level0",
      level1: {qualification: 2,
                           name: "The Tourist",
                           description: "Play at 2 Different Courses!"},
      level2: {qualification: 5,
                           name: "The Frequenter",
                           description: "Play at 5 Different Courses!"},
      level3: {qualification: 10,
                           name: "The Well Travelled",
                           description: "Play at 10 Different Courses!"}
   },
   roundTournamentCount: {
      badge: badge4,
      notBadge: notBadge4,
      name: "The Champion Badge",
      level: "level0",
      level1: {qualification: 2,
                           name: "The Participant",
                           description: "Play in 2 Tournaments!"},
      level2: {qualification: 5,
                           name: "The Podium Placer",
                           description: "Play in 5 Tournaments!"},
      level3: {qualification: 10,
                           name: "The Champion",
                           description: "Play in 10 Tournaments!"}
   },
   roundTime: {
      badge: badge6,
      notBadge: notBadge6,
      name: "The Time Badge",
      level: "level0",
      level1: {qualification: 180,
                           name: "The Jogger",
                           description: "Finish a round in less than 3 hours!"},
      level2: {qualification: 120,
                           name: "The Sprinter",
                           description: "Finish a round in less than 2 hours!"},
      level3: {qualification: 60,
                           name: "The Marathoner",
                           description: "Finish a round in less than 1 hour!"}
   },
   roundStrokes: {
      badge: badge1,
      notBadge: notBadge1,
      name: "The Competitor Badge",
      level: "level0",
      level1: {qualification: 80,
                           name: "The Double Bogey",
                           description: "Hit 80 or less strokes in a round!"},
      level2: {qualification: 72,
                           name: "The Birdie",
                           description: "Hit 72 or less strokes in a round!"},
      level3: {qualification: 65,
                           name: "The Albatross",
                           description: "Hit 65 or less strokes in a round!"}
   },
   roundsInMonth: {
      badge: badge2,
      notBadge: notBadge2,
      name: "The Frequenter Badge",
      level: "level0",
      level1: {qualification: 2,
                           name: "The Ehh? I Guess",
                           description: "Played twice in a month!"},
      level2: {qualification: 4,
                           name: "The Yeah I Can Make Some Time",
                           description: "Played 4 times in a month!"},
      level3: {qualification: 8,
                           name: "The Hardcore",
                           description: "Played 8 times in a month!"}
   }
}

export default badges;