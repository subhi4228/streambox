// Fallback data formatted according to the TVMaze API specification (https://api.tvmaze.com)
// Used during network interruption or initial offline rendering

export const MOCK_SHOWS = [
  {
    id: 169,
    name: "Breaking Bad",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Crime", "Thriller"],
    status: "Ended",
    runtime: 60,
    premiered: "2008-01-20",
    officialSite: "http://www.amc.com/shows/breaking-bad",
    schedule: { time: "22:00", days: ["Sunday"] },
    rating: { average: 9.2 },
    network: { name: "AMC" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"
    },
    summary: "<p><b>Breaking Bad</b> follows Walter White, a struggling high school chemistry teacher diagnosed with stage-three lung cancer. Together with his former student Jesse Pinkman, White turns to a life of crime by producing and distributing crystallized methamphetamine to secure his family's financial future before he dies.</p>",
    _embedded: {
      cast: [
        { person: { id: 1, name: "Bryan Cranston" }, character: { name: "Walter White" } },
        { person: { id: 2, name: "Aaron Paul" }, character: { name: "Jesse Pinkman" } },
        { person: { id: 3, name: "Anna Gunn" }, character: { name: "Skyler White" } },
        { person: { id: 4, name: "Dean Norris" }, character: { name: "Hank Schrader" } },
        { person: { id: 5, name: "Betsy Brandt" }, character: { name: "Marie Schrader" } },
        { person: { id: 6, name: "Bob Odenkirk" }, character: { name: "Saul Goodman" } }
      ]
    }
  },
  {
    id: 82,
    name: "Game of Thrones",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Action", "Adventure"],
    status: "Ended",
    runtime: 60,
    premiered: "2011-04-17",
    officialSite: "http://www.hbo.com/game-of-thrones",
    schedule: { time: "21:00", days: ["Sunday"] },
    rating: { average: 9.0 },
    network: { name: "HBO" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg"
    },
    summary: "<p>Based on the bestselling book series by George R.R. Martin, <b>Game of Thrones</b> is an epic drama set in the fantasy continents of Westeros and Essos, where noble families vie for control of the Iron Throne.</p>",
    _embedded: {
      cast: [
        { person: { id: 11, name: "Peter Dinklage" }, character: { name: "Tyrion Lannister" } },
        { person: { id: 12, name: "Emilia Clarke" }, character: { name: "Daenerys Targaryen" } },
        { person: { id: 13, name: "Kit Harington" }, character: { name: "Jon Snow" } },
        { person: { id: 14, name: "Lena Headey" }, character: { name: "Cersei Lannister" } },
        { person: { id: 15, name: "Nikolaj Coster-Waldau" }, character: { name: "Jaime Lannister" } },
        { person: { id: 16, name: "Sophie Turner" }, character: { name: "Sansa Stark" } }
      ]
    }
  },
  {
    id: 2993,
    name: "Stranger Things",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    status: "Running",
    runtime: 60,
    premiered: "2016-07-15",
    officialSite: "https://www.netflix.com/title/80057281",
    schedule: { time: "", days: [] },
    rating: { average: 8.6 },
    network: { name: "Netflix" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/397/994025.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/397/994025.jpg"
    },
    summary: "<p>When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.</p>",
    _embedded: {
      cast: [
        { person: { id: 21, name: "Millie Bobby Brown" }, character: { name: "Eleven" } },
        { person: { id: 22, name: "Finn Wolfhard" }, character: { name: "Mike Wheeler" } },
        { person: { id: 23, name: "Winona Ryder" }, character: { name: "Joyce Byers" } },
        { person: { id: 24, name: "David Harbour" }, character: { name: "Jim Hopper" } },
        { person: { id: 25, name: "Gaten Matarazzo" }, character: { name: "Dustin Henderson" } }
      ]
    }
  },
  {
    id: 526,
    name: "The Office",
    type: "Scripted",
    language: "English",
    genres: ["Comedy"],
    status: "Ended",
    runtime: 30,
    premiered: "2005-03-24",
    officialSite: "http://www.nbc.com/the-office",
    schedule: { time: "21:00", days: ["Thursday"] },
    rating: { average: 8.5 },
    network: { name: "NBC" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/85/213184.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/85/213184.jpg"
    },
    summary: "<p>A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium at Dunder Mifflin paper company.</p>",
    _embedded: {
      cast: [
        { person: { id: 31, name: "Steve Carell" }, character: { name: "Michael Scott" } },
        { person: { id: 32, name: "Rainn Wilson" }, character: { name: "Dwight Schrute" } },
        { person: { id: 33, name: "John Krasinski" }, character: { name: "Jim Halpert" } },
        { person: { id: 34, name: "Jenna Fischer" }, character: { name: "Pam Beesly" } }
      ]
    }
  },
  {
    id: 216,
    name: "Rick and Morty",
    type: "Animation",
    language: "English",
    genres: ["Comedy", "Sci-Fi", "Action"],
    status: "Running",
    runtime: 30,
    premiered: "2013-12-02",
    officialSite: "http://www.adultswim.com/videos/rick-and-morty",
    schedule: { time: "23:00", days: ["Sunday"] },
    rating: { average: 8.8 },
    network: { name: "Adult Swim" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg"
    },
    summary: "<p>An animated series that follows the exploits of a super scientist and his not-so-bright grandson on bizarre adventures across the multiverse.</p>",
    _embedded: {
      cast: [
        { person: { id: 41, name: "Justin Roiland" }, character: { name: "Rick Sanchez" } },
        { person: { id: 42, name: "Chris Parnell" }, character: { name: "Jerry Smith" } },
        { person: { id: 43, name: "Spencer Grammer" }, character: { name: "Summer Smith" } },
        { person: { id: 44, name: "Sarah Chalke" }, character: { name: "Beth Smith" } }
      ]
    }
  },
  {
    id: 1371,
    name: "Westworld",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Sci-Fi", "Western"],
    status: "Ended",
    runtime: 60,
    premiered: "2016-10-02",
    officialSite: "http://www.hbo.com/westworld",
    schedule: { time: "21:00", days: ["Sunday"] },
    rating: { average: 8.2 },
    network: { name: "HBO" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/417/1043977.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/417/1043977.jpg"
    },
    summary: "<p>A dark odyssey about the dawn of artificial consciousness and the evolution of sin, set in a high-tech amusement park populated by android hosts.</p>",
    _embedded: {
      cast: [
        { person: { id: 51, name: "Evan Rachel Wood" }, character: { name: "Dolores Abernathy" } },
        { person: { id: 52, name: "Thandiwe Newton" }, character: { name: "Maeve Millay" } },
        { person: { id: 53, name: "Jeffrey Wright" }, character: { name: "Bernard Lowe" } },
        { person: { id: 54, name: "Ed Harris" }, character: { name: "Man in Black" } }
      ]
    }
  },
  {
    id: 15299,
    name: "The Boys",
    type: "Scripted",
    language: "English",
    genres: ["Action", "Sci-Fi", "Comedy"],
    status: "Running",
    runtime: 60,
    premiered: "2019-07-26",
    officialSite: "https://www.amazon.com/dp/B0875L45GK",
    schedule: { time: "", days: [] },
    rating: { average: 8.4 },
    network: { name: "Prime Video" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/512/1281898.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/512/1281898.jpg"
    },
    summary: "<p>A fun and irreverent take on what happens when superheroes abuse their superpowers rather than use them for good, and the vigilantes known as 'The Boys' who embark on a quest to expose the corrupt heroes.</p>",
    _embedded: {
      cast: [
        { person: { id: 61, name: "Karl Urban" }, character: { name: "Billy Butcher" } },
        { person: { id: 62, name: "Jack Quaid" }, character: { name: "Hughie Campbell" } },
        { person: { id: 63, name: "Antony Starr" }, character: { name: "Homelander" } },
        { person: { id: 64, name: "Erin Moriarty" }, character: { name: "Starlight" } }
      ]
    }
  },
  {
    id: 305,
    name: "Black Mirror",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    status: "Running",
    runtime: 60,
    premiered: "2011-12-04",
    officialSite: "https://www.netflix.com/title/70264888",
    schedule: { time: "", days: [] },
    rating: { average: 8.3 },
    network: { name: "Netflix" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/462/1155986.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/462/1155986.jpg"
    },
    summary: "<p>A contemporary British re-working of The Twilight Zone with stories that tap into the collective unease about our modern world, each stand-alone tale exploring themes of contemporary techno-paranoia.</p>",
    _embedded: {
      cast: [
        { person: { id: 71, name: "Daniel Kaluuya" }, character: { name: "Bing" } },
        { person: { id: 72, name: "Bryce Dallas Howard" }, character: { name: "Lacie" } },
        { person: { id: 73, name: "Jon Hamm" }, character: { name: "Matt" } }
      ]
    }
  },
  {
    id: 170,
    name: "Sherlock",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Thriller", "Crime"],
    status: "Ended",
    runtime: 90,
    premiered: "2010-07-25",
    officialSite: "http://www.bbc.co.uk/programmes/b018ttws",
    schedule: { time: "21:00", days: ["Sunday"] },
    rating: { average: 8.9 },
    network: { name: "BBC One" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/185/463690.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/185/463690.jpg"
    },
    summary: "<p>A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.</p>",
    _embedded: {
      cast: [
        { person: { id: 81, name: "Benedict Cumberbatch" }, character: { name: "Sherlock Holmes" } },
        { person: { id: 82, name: "Martin Freeman" }, character: { name: "Dr. John Watson" } },
        { person: { id: 83, name: "Una Stubbs" }, character: { name: "Mrs. Hudson" } },
        { person: { id: 84, name: "Rupert Graves" }, character: { name: "DI Greg Lestrade" } }
      ]
    }
  },
  {
    id: 39537,
    name: "Chernobyl",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Thriller", "History"],
    status: "Ended",
    runtime: 60,
    premiered: "2019-05-06",
    officialSite: "https://www.hbo.com/chernobyl",
    schedule: { time: "21:00", days: ["Monday"] },
    rating: { average: 9.4 },
    network: { name: "HBO" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/197/493721.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/197/493721.jpg"
    },
    summary: "<p>In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.</p>",
    _embedded: {
      cast: [
        { person: { id: 91, name: "Jared Harris" }, character: { name: "Valery Legasov" } },
        { person: { id: 92, name: "Stellan Skarsgård" }, character: { name: "Boris Shcherbina" } },
        { person: { id: 93, name: "Emily Watson" }, character: { name: "Ulana Khomyuk" } }
      ]
    }
  },
  {
    id: 114,
    name: "Brooklyn Nine-Nine",
    type: "Scripted",
    language: "English",
    genres: ["Comedy", "Crime"],
    status: "Ended",
    runtime: 30,
    premiered: "2013-09-17",
    officialSite: "https://www.nbc.com/brooklyn-nine-nine",
    schedule: { time: "20:00", days: ["Thursday"] },
    rating: { average: 8.3 },
    network: { name: "NBC" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/345/864072.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/345/864072.jpg"
    },
    summary: "<p>Comedy series following the exploits of Det. Jake Peralta and his diverse, lovable colleagues as they police the NYPD's 99th Precinct.</p>",
    _embedded: {
      cast: [
        { person: { id: 101, name: "Andy Samberg" }, character: { name: "Jake Peralta" } },
        { person: { id: 102, name: "Stephanie Beatriz" }, character: { name: "Rosa Diaz" } },
        { person: { id: 103, name: "Terry Crews" }, character: { name: "Terry Jeffords" } },
        { person: { id: 104, name: "Melissa Fumero" }, character: { name: "Amy Santiago" } }
      ]
    }
  },
  {
    id: 38963,
    name: "The Mandalorian",
    type: "Scripted",
    language: "English",
    genres: ["Action", "Sci-Fi", "Adventure"],
    status: "Running",
    runtime: 40,
    premiered: "2019-11-12",
    officialSite: "https://www.disneyplus.com/series/the-mandalorian/3jLIGMDYINqD",
    schedule: { time: "", days: ["Wednesday"] },
    rating: { average: 8.4 },
    network: { name: "Disney+" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/446/1116664.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/446/1116664.jpg"
    },
    summary: "<p>After the fall of the Galactic Empire, a lone gunfighter makes his way through the outer reaches of the lawless galaxy, protecting a mysterious child named Grogu.</p>",
    _embedded: {
      cast: [
        { person: { id: 111, name: "Pedro Pascal" }, character: { name: "The Mandalorian" } },
        { person: { id: 112, name: "Carl Weathers" }, character: { name: "Greef Karga" } },
        { person: { id: 113, name: "Giancarlo Esposito" }, character: { name: "Moff Gideon" } }
      ]
    }
  },
  {
    id: 1,
    name: "Under the Dome",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    status: "Ended",
    runtime: 60,
    premiered: "2013-06-24",
    officialSite: "http://www.cbs.com/shows/under-the-dome/",
    schedule: { time: "22:00", days: ["Thursday"] },
    rating: { average: 6.5 },
    network: { name: "CBS" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
    },
    summary: "<p>Under the Dome is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome.</p>",
    _embedded: {
      cast: [
        { person: { id: 121, name: "Mike Vogel" }, character: { name: "Dale 'Barbie' Barbara" } },
        { person: { id: 122, name: "Rachelle Lefevre" }, character: { name: "Julia Shumway" } }
      ]
    }
  },
  {
    id: 4,
    name: "Arrow",
    type: "Scripted",
    language: "English",
    genres: ["Action", "Drama", "Sci-Fi"],
    status: "Ended",
    runtime: 60,
    premiered: "2012-10-10",
    officialSite: "http://www.cwtv.com/shows/arrow",
    schedule: { time: "21:00", days: ["Tuesday"] },
    rating: { average: 7.4 },
    network: { name: "The CW" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/213/534017.jpg"
    },
    summary: "<p>After a violent shipwreck, billionaire playboy Oliver Queen was missing and presumed dead for five years before being discovered alive on a remote island in the North China Sea.</p>",
    _embedded: {
      cast: [
        { person: { id: 131, name: "Stephen Amell" }, character: { name: "Oliver Queen" } },
        { person: { id: 132, name: "Katie Cassidy" }, character: { name: "Laurel Lance" } }
      ]
    }
  },
  {
    id: 5,
    name: "True Detective",
    type: "Scripted",
    language: "English",
    genres: ["Drama", "Thriller", "Crime"],
    status: "Running",
    runtime: 60,
    premiered: "2014-01-12",
    officialSite: "http://www.hbo.com/true-detective",
    schedule: { time: "21:00", days: ["Sunday"] },
    rating: { average: 8.8 },
    network: { name: "HBO" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/490/1226759.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/490/1226759.jpg"
    },
    summary: "<p>Touch of evil is in the air. An anthology series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.</p>",
    _embedded: {
      cast: [
        { person: { id: 141, name: "Matthew McConaughey" }, character: { name: "Rust Cohle" } },
        { person: { id: 142, name: "Woody Harrelson" }, character: { name: "Marty Hart" } }
      ]
    }
  },
  {
    id: 431,
    name: "Ted Lasso",
    type: "Scripted",
    language: "English",
    genres: ["Comedy", "Drama"],
    status: "Ended",
    runtime: 45,
    premiered: "2020-08-14",
    officialSite: "https://tv.apple.com/show/ted-lasso/umc.cmc.vtoh0mn0xurq926418nvlo58",
    schedule: { time: "", days: ["Wednesday"] },
    rating: { average: 8.5 },
    network: { name: "Apple TV+" },
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/450/1126991.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/450/1126991.jpg"
    },
    summary: "<p>An American football coach is hired to manage a British soccer team. What he lacks in knowledge, he makes up for with optimism, determination... and biscuits.</p>",
    _embedded: {
      cast: [
        { person: { id: 151, name: "Jason Sudeikis" }, character: { name: "Ted Lasso" } },
        { person: { id: 152, name: "Hannah Waddingham" }, character: { name: "Rebecca Welton" } }
      ]
    }
  }
];

export const ALL_MOCK_ITEMS = MOCK_SHOWS;
