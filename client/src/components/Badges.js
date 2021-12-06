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
      level1: {qualification: 10,
                     name: "Beginner competitor",
                     description: "Played 10 rounds"},
      level2: {qualification: 20,
                     name: "Intermediate competitor",
                     description: "Played 20 rounds"},
      level3: {qualification: 30,
                     name: "Advanced competitor",
                     description: "Played 30 rounds"}
   },
   roundTime: {
      badge: badge2,
      notBadge: notBadge2,
      name: "The Tenacious",
      level1: {qualification: 120,
                        name: "Outlast a game",
                        description: "Competed for 2 hours"},
      level2: {qualification: 240,
                        name: "Outlast a long game",
                        description: "Competed for 4 hours"},
      level3: {qualification: 360,
                        name: "Never get tired",
                        description: "Competed for 6 hours"}
   },
   roundStrokes: {
      badge: badge3,
      notBadge: notBadge3,
      name: "The Competitor",
      level1: {qualification: 10,
                           name: "Beginner strokes",
                           description: "10 strokes in a round"},
      level2: {qualification: 50,
                           name: "Intermediate strokes",
                           description: "50 strokes in a round"},
      level3: {qualification: 100,
                           name: "Master strokes",
                           description: "100 strokes in a round"}
   },
   roundsInMonth: {
      badge: badge4,
      notBadge: notBadge4,
      name: "The Frequenter",
      level1: {qualification: 2,
                           name: "Occasional player",
                           description: "Played twice in a month"},
      level2: {qualification: 4,
                           name: "Intermediate frequency",
                           description: "Played 4 times in a month"},
      level3: {qualification: 8,
                           name: "High frequency",
                           description: "Played 8 times in a month"}
   }
}

export default badges;