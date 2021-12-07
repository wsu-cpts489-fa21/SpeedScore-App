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
      badge: badge1,
      notBadge: notBadge1,
      name: "The Player",
      level: "level0",
      level1: {qualification: 1,
                           name: "Beginner competitor",
                           description: "Played 1 rounds"},
      level2: {qualification: 10,
                           name: "Intermediate competitor",
                           description: "Played 10 rounds"},
      level3: {qualification: 20,
                           name: "Advanced competitor",
                           description: "Played 20 rounds"}
   },
   roundTime: {
      badge: badge2,
      notBadge: notBadge2,
      name: "The Tenacious",
      level: "level0",
      level1: {qualification: 180,
                           name: "Speed bronze",
                           description: "Finished a round in less than 3 hours"},
      level2: {qualification: 120,
                           name: "Speed silver",
                           description: "Finished a round in less than 2 hours"},
      level3: {qualification: 60,
                           name: "Speed gold",
                           description: "Finished a round in less than 1 hour"}
   },
   roundStrokes: {
      badge: badge3,
      notBadge: notBadge3,
      name: "The Competitor",
      level: "level0",
      level1: {qualification: 90,
                           name: "Beginner strokes",
                           description: "90 or less strokes in a round"},
      level2: {qualification: 80,
                           name: "Intermediate strokes",
                           description: "80 or less strokes in a round"},
      level3: {qualification: 70,
                           name: "Master strokes",
                           description: "70 or less strokes in a round"}
   },
   roundsInMonth: {
      badge: badge4,
      notBadge: notBadge4,
      name: "The Frequenter",
      level: "level0",
      level1: {qualification: 2,
                           name: "Occasional player",
                           description: "Played twice in a month"},
      level2: {qualification: 4,
                           name: "Medium perseverance",
                           description: "Played 4 times in a month"},
      level3: {qualification: 8,
                           name: "High perseverance",
                           description: "Played 8 times in a month"}
   }
}

export default badges;