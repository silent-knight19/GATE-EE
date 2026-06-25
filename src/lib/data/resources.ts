export interface ResourceLink {
  title: string
  url: string
  description?: string
}

export interface Textbook {
  name: string
  edition?: string
  chapters?: string
}

export interface SubjectResources {
  id: string
  name: string
  shortName: string
  youtubePlaylists: ResourceLink[]
  revisionPyqs: ResourceLink[]
  nptelLectures: ResourceLink[]
  textbooks: Textbook[]
  topicwisePyqs: ResourceLink[]
  freeTests: ResourceLink[]
  notes?: ResourceLink[]
  additional?: ResourceLink[]
}

export interface GeneralResources {
  fullLengthMocks: ResourceLink[]
  previousYearPapers: ResourceLink[]
  notes: ResourceLink[]
}

export interface TopperInsight {
  name: string
  rank: string
  source: string
  sourceUrl: string
  quote: string
}

export const topperInsights: TopperInsight[] = [
  {
    name: 'Tejavath Manoj Kumar',
    rank: 'AIR 1, GATE EE 2026',
    source: 'Careers360',
    sourceUrl: 'https://engineering.careers360.com/articles/gate-2026-topper-interview-tejavath-manoj-kumar-air-1-ee',
    quote: 'I followed Exam Dost. Ankit Sir\'s lectures have immensely helped me. I focused on PYQs and regular revision. My routine included following the lecture, practising with PYQs, and revision.',
  },
  {
    name: 'Anant Narayan Upadhyay',
    rank: 'AIR 26, GATE EE 2026',
    source: 'Physics Wallah',
    sourceUrl: 'https://www.pw.live/gate/exams/gate-2026-air-26-ee',
    quote: 'My main focus was on accuracy during test attempts. I prioritized high accuracy, even if it meant attempting fewer questions.',
  },
  {
    name: 'Vaibhav Mandhyan',
    rank: 'AIR 49, GATE EE & AIR 115 IN, 2026',
    source: 'Physics Wallah',
    sourceUrl: 'https://www.pw.live/gate/exams/gate-2026-air-49-ee-and-air-115-in-vaibhav-mandhyan-success-story-and-strategy',
    quote: 'Understand the exam before attempting to crack it. 20% of the syllabus will account for 80% of the questions. Identify this 20%.',
  },
  {
    name: 'Navneet Kumar',
    rank: 'AIR 42, GATE EE 2026 (improved from AIR 165)',
    source: 'MADE EASY',
    sourceUrl: 'https://blog.madeeasy.in/the-untold-stories-of-gate-ee-top-achievers',
    quote: 'I joined the MADE EASY Test Series, which helped me a lot by providing quality questions and regular practice.',
  },
  {
    name: 'Chiranshu Taneja',
    rank: 'AIR 2, GATE EE 2023',
    source: 'Times Now',
    sourceUrl: 'https://www.timesnownews.com/education/upsc-success-story-its-never-about-how-much-you-study-upsc-air-118-chiranshu-tanejas-mantra-for-success-article-154724914',
    quote: 'It\'s not how much you study that matters, but how well you study.',
  },
  {
    name: 'Sayantan Bhattacharya',
    rank: 'AIR 5, GATE EE',
    source: 'DipsLab',
    sourceUrl: 'https://dipslab.com/gate-ee-study-plan-air-5/',
    quote: 'I used standard textbooks along with Made Easy handwritten notes for proper concept building. I prepared my own descriptive notes of every subject separately for revision.',
  },
]

export const topYoutubeChannels: ResourceLink[] = [
  { title: 'GATE Wallah (Physics Wallah)', url: 'https://www.youtube.com/@GATEWallahbyPW', description: 'Free GATE EE strategy, revision & full courses. Top-rated by students for EE preparation.' },
  { title: 'GATE Wallah EE, EC & CS', url: 'https://www.youtube.com/@GATEWallah_EE_EC_CS', description: 'Branch-specific EE content, marathon sessions & live classes' },
  { title: 'EXAM DOST - Ankit Goyal', url: 'https://www.youtube.com/@ExamDostAnkitGoyal', description: 'Twice AIR 1 (GATE 2014 & 2018). Gold Medalist. Topper-recommended channel.' },
  { title: 'Kreatryx GATE - EE, ECE & IN (Unacademy)', url: 'https://www.youtube.com/@KreatryxGATEEngineers', description: 'Popular GATE EE channel with structured playlists by Ankit Goyal & team' },
  { title: 'MADE EASY', url: 'https://www.youtube.com/@MADE_EASY', description: 'India\'s top GATE coaching. Subject-wise lectures, topper talks & PYQ solutions.' },
  { title: 'NPTEL (IITs & IISc)', url: 'https://www.youtube.com/@nptel', description: 'Free IIT-quality video lectures for every EE subject. 1.69M+ subscribers.' },
  { title: 'Neso Academy', url: 'https://www.youtube.com/@NesoAcademy', description: 'Excellent for conceptual clarity in Signals, Digital/Analog Electronics & Network Theory' },
  { title: 'GATE ACADEMY by Umesh Dhande', url: 'https://www.youtube.com/@GATEACADEMY', description: '19+ years teaching experience. Full coverage of core EE topics.' },
]

export const contributor = {
  name: 'GATE EE Toppers & Community',
  linkedin: 'https://www.linkedin.com',
  youtube: 'https://www.youtube.com',
  sources: 'Topper interviews (Careers360, PW, MADE EASY, Times Now, DipsLab), Student reviews from Testbook, EduRev & Quora',
}

export const subjectResources: SubjectResources[] = [
  {
    id: 'ec',
    name: 'Electric Circuits',
    shortName: 'Circuits',
    youtubePlaylists: [
      { title: 'Network Theory by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvzC3rMFY_Q-1tBwkOc74SIq' },
      { title: 'Network Theory by Ankit Goyal (Kreatryx)', url: 'https://youtube.com/playlist?list=PLngLbOjfski_nD8Rn1riKP5D7xF4d1KKC' },
      { title: 'Network Theory by Neso Academy', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRgLR-hMp7wem-bdVN1iEhsh' },
      { title: 'Network Theory by GATE Academy (Umesh Dhande)', url: 'https://youtube.com/playlist?list=PLgzsL8klq6DJ6fwXWK4TN9T0flIRuVsAb' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
      { title: 'GATE EE PYQs 1991-2025 (gateexam.info)', url: 'https://www.gateexam.info/previous-papers/EE/' },
    ],
    nptelLectures: [
      { title: 'Basic Electrical Circuits (NPTEL IIT Hyderabad)', url: 'https://youtube.com/playlist?list=PL0VuQeqMV0lcM6NGwMUAp4nEUT9u-LKRc' },
      { title: 'Network Analysis (NPTEL IIT Kharagpur)', url: 'https://onlinecourses.nptel.ac.in/noc26_ee48/preview' },
    ],
    textbooks: [
      { name: 'Engineering Circuit Analysis by William Hayt, Jack Kemmerly', edition: '8E', chapters: 'ch 1-13' },
      { name: 'Circuit Theory: Analysis & Synthesis by Abhijit Chakrabarti', chapters: 'ch 1-10' },
      { name: 'Fundamentals of Electric Circuits by Charles Alexander, Matthew Sadiku', edition: '6E', chapters: 'ch 1-13' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
      { title: 'GATE EE Topic-wise PYQs (EduRev)', url: 'https://edurev.in/t/511505/gate-ee-topic-wise-previous-year-questions-with-answers' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'emft',
    name: 'Electromagnetic Fields',
    shortName: 'EMFT',
    youtubePlaylists: [
      { title: 'EMFT by Siddharth Sabharwal (Unacademy)', url: 'https://youtube.com/playlist?list=PLnPUHuqVn2sem5mAJp1vhOQB4kvc6JaC5' },
      { title: 'EMFT (Kreatryx GATE)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r75okkE2V9oXbwJI-8u_z_i' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Applied Electromagnetics for Engineers (NPTEL IIT Kanpur)', url: 'https://onlinecourses.nptel.ac.in/noc25_ee148/preview' },
      { title: 'Electromagnetic Theory (NPTEL IIT Kanpur)', url: 'https://onlinecourses.nptel.ac.in/noc25_ee149/preview' },
    ],
    textbooks: [
      { name: 'Elements of Electromagnetics by Matthew N.O. Sadiku', edition: '6E', chapters: 'ch 1-9' },
      { name: 'Engineering Electromagnetics by William H. Hayt, John A. Buck', edition: '8E', chapters: 'ch 1-10' },
      { name: 'Electromagnetic Field Theory by M. R. Sheshadri', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'ss',
    name: 'Signals and Systems',
    shortName: 'S&S',
    youtubePlaylists: [
      { title: 'Signals & Systems by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvx5QCG7OdYEwRLyDrKUuS6i' },
      { title: 'Signals & Systems (Neso Academy)', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRhG6s35k4FnMErgMkO5W0fP' },
      { title: 'Signals & Systems GATE 2026 (Ankit Goyal)', url: 'https://youtube.com/playlist?list=PLR7krO3VHssSsUoMzIyYrUre_dM4M9LfI' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Principles of Signals & Systems (NPTEL IIT Kanpur)', url: 'https://youtube.com/playlist?list=PLmTxdcdNNf3P3gxNXozwDOqyg3ayi1F3T' },
    ],
    textbooks: [
      { name: 'Signals and Systems by Alan V. Oppenheim, A. Willsky', edition: '2E', chapters: 'ch 1-11' },
      { name: 'Signals and Systems by Tarun Kumar Rawat', chapters: 'ch 1-6' },
      { name: 'Signals and Systems by Simon Haykin, Barry Van Veen', edition: '2E', chapters: 'ch 1-10' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'emach',
    name: 'Electrical Machines',
    shortName: 'E. Machines',
    youtubePlaylists: [
      { title: 'Electrical Machines by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvxpQCpOL701qk4gR0DwDc57' },
      { title: 'Electrical Machines (Ankit Goyal)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5YY5b23uDGrtpo42ezMmGp' },
      { title: 'Electrical Machines (GATE Wallah)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r6Mlz9ObmcKx-SfNbIFfyVh' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Electrical Machines I (NPTEL IIT Kharagpur)', url: 'https://nptel.ac.in/courses/108105017' },
      { title: 'Electrical Machines II (NPTEL IIT Kharagpur)', url: 'https://youtube.com/playlist?list=PLbRMhDVUMngcDrGXlt-hX-ekpldUlC2b6' },
    ],
    textbooks: [
      { name: 'Electrical Machinery by P.S. Bimbhra', chapters: 'ch 1-9' },
      { name: 'Electric Machinery by A.E. Fitzgerald, Charles Kingsley, Stephen Umans', edition: '6E', chapters: 'ch 1-9' },
      { name: 'Electrical Machines by I.J. Nagrath, D.P. Kothari', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'ps',
    name: 'Power Systems',
    shortName: 'Power Sys.',
    youtubePlaylists: [
      { title: 'Power Systems by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvwkfUAGQiUuqWBswJ4VM3Ed' },
      { title: 'Power Systems Full Course (Ankit Goyal)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r6Mlz9ObmcKx-SfNbIFfyVh' },
      { title: 'Power Systems (GATE Wallah)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5ru5m4E-JQ2eNgGui_9571' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Power System Analysis (NPTEL IIT Kharagpur)', url: 'https://onlinecourses.nptel.ac.in/noc25_ee169/preview' },
      { title: 'Power System Analysis Playlist (NPTEL)', url: 'https://youtube.com/playlist?list=PLRdD1c6QbAqK4BEysacu03ladIhTRzHBa' },
    ],
    textbooks: [
      { name: 'Modern Power System Analysis by I.J. Nagrath, D.P. Kothari', edition: '4E', chapters: 'ch 1-9' },
      { name: 'Power System Engineering by D.P. Kothari, I.J. Nagrath', edition: '3E', chapters: 'ch 1-11' },
      { name: 'Elements of Power System Analysis by William D. Stevenson Jr.', edition: '4E', chapters: 'ch 1-12' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'csys',
    name: 'Control Systems',
    shortName: 'Control Sys.',
    youtubePlaylists: [
      { title: 'Control Systems by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvyCgdVfGq1b1HnF3LJ8q7sH' },
      { title: 'Control Systems by Ankit Goyal (One Man Army)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5g0p3sHJs6sRZVJ3o6k5zH' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Control Systems (NPTEL IIT Madras)', url: 'https://youtube.com/playlist?list=PLrpK1inhO61UmJJOTNS8NvoSSW3TgkxrO' },
    ],
    textbooks: [
      { name: 'Control Systems Engineering by Norman S. Nise', edition: '6E', chapters: 'ch 1-12' },
      { name: 'Modern Control Engineering by Katsuhiko Ogata', edition: '5E', chapters: 'ch 1-10' },
      { name: 'Control Systems by I.J. Nagrath, M. Gopal', edition: '4E', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'eem',
    name: 'Electrical and Electronic Measurements',
    shortName: 'Measurements',
    youtubePlaylists: [
      { title: 'Electrical Measurements (GATE Wallah)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5ru5m4E-JQ2eNgGui_9571' },
      { title: 'Siddharth Sabharwal - EE Special Sessions', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5ru5m4E-JQ2eNgGui_9571' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Electrical Measurements (NPTEL IIT Madras)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQPiFZXuQmGp0MI7KlzGm_M' },
    ],
    textbooks: [
      { name: 'Electrical & Electronic Measurements & Instrumentation by A.K. Sawhney', edition: '19E', chapters: 'ch 1-15' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'ade',
    name: 'Analog and Digital Electronics',
    shortName: 'Analog & Digital',
    youtubePlaylists: [
      { title: 'Analog Electronics by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvyU8Dx1lkxZZmMa02qPRqEq' },
      { title: 'Analog Electronics (Neso Academy)', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRiw-G0E1nFj7eoxnE0DhA7i' },
      { title: 'Digital Electronics (Neso Academy)', url: 'https://youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwxzT7Tw7EsdSd' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Analog Electronic Circuit (NPTEL IIT Delhi)', url: 'https://youtube.com/playlist?list=PLp6ek2hDcoNDAw1BehPFazZ5ogPV8UlQa' },
      { title: 'Digital Integrated Circuits (NPTEL IIT Madras)', url: 'https://youtube.com/playlist?list=PL36E832F4CA46D233' },
    ],
    textbooks: [
      { name: 'Microelectronic Circuits by Adel S. Sedra, Kenneth C. Smith', edition: '7E', chapters: 'ch 1-13' },
      { name: 'Electronic Devices and Circuit Theory by Robert Boylestad, Louis Nashelsky', edition: '11E', chapters: 'ch 1-15' },
      { name: 'Digital Design by M. Morris Mano', edition: '5E', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'pe',
    name: 'Power Electronics',
    shortName: 'Power Elec.',
    youtubePlaylists: [
      { title: 'Power Electronics by Genique Education', url: 'https://youtube.com/playlist?list=PL1XaeVNXKsvxRwc-GvqF9WyPN6MW6tqy_' },
      { title: 'Power Electronics by Ankit Goyal (Kreatryx)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5YY5b23uDGrtpo42ezMmGp' },
    ],
    revisionPyqs: [
      { title: 'GATE EE PYQs (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [
      { title: 'Fundamental of Power Electronics (NPTEL IISc)', url: 'https://youtube.com/playlist?list=PLTFstmhqwXp-OEjDuBKmaPac-qJzdfvol' },
    ],
    textbooks: [
      { name: 'Power Electronics by P.S. Bimbhra', edition: '5E', chapters: 'ch 1-10' },
      { name: 'Power Electronics: Circuits, Devices and Applications by Muhammad H. Rashid', edition: '4E', chapters: 'ch 1-14' },
    ],
    topicwisePyqs: [
      { title: 'EE PYQ Platform (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'Online Test Series (MADE EASY)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
      { title: 'GATE EE Mock on GATEOverflow', url: 'https://ee.gateoverflow.in/exams' },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    shortName: 'Apt.',
    youtubePlaylists: [
      { title: 'General Aptitude (GATE Wallah)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r5XJYqJ0H6Xq8QMEJFG_0qK' },
      { title: 'Aptitude Playlist (Kreatryx)', url: 'https://youtube.com/playlist?list=PLs5_Rtf2P2r6Mlz9ObmcKx-SfNbIFfyVh' },
    ],
    revisionPyqs: [
      { title: 'GATE EE GA Questions (GATEOverflow)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    nptelLectures: [],
    textbooks: [
      { name: 'Quantitative Aptitude by R.S. Aggarwal', chapters: 'Full book' },
    ],
    topicwisePyqs: [
      { title: 'GATE EE GA Questions (GATEOverflow)', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    freeTests: [
      { title: 'GATE EE GA Questions on GATEOverflow', url: 'https://ee.gateoverflow.in/previous-years' },
    ],
    additional: [
      { title: 'GO-PDFs: Engineering Mathematics & Aptitude (all branches)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gate-2026-common' },
    ],
  },
]

export const generalResources: GeneralResources = {
  fullLengthMocks: [
    { title: 'Official GATE 2026 Mock Test (IIT Guwahati)', url: 'https://gate2026.iitg.ac.in/mock-test-links.html' },
    { title: 'MADE EASY Anubhav Free Open Mock', url: 'https://www.madeeasyprime.com/open-mock-test/anubhav-gate' },
    { title: 'ACE Academy Free Mock Test', url: 'https://www.aceenggacademy.com/free-mock-test-gate-2026/' },
    { title: 'MADE EASY Online Test Series (All Branches)', url: 'https://onlinetestseriesmadeeasy.in/gate' },
    { title: 'ACE Academy Online Test Series (EE)', url: 'https://www.aceenggacademy.com/gate-2026-mock-test-series/' },
    { title: 'GATEOverflow Full-Length PYQ Mocks', url: 'https://gateoverflow.in/blog/16790/electrical-electronics-engineering-previous-question-available' },
    { title: 'EduRev GATE EE Mock Test Series', url: 'https://edurev.in/test/28350/gate-mock-test-electrical-engineering-ee-9' },
    { title: 'Mockers GATE EE Free Mock Test', url: 'https://www.mockers.in/exam/gate-electrical-mock-test' },
  ],
  previousYearPapers: [
    { title: 'GATE EE 2025 Paper + Solutions (MADE EASY)', url: 'https://www.madeeasy.in/gate-exam-questions-answer-key-solutions' },
    { title: 'GATE EE 2026 Paper (Careers360)', url: 'https://engineering.careers360.com/articles/gate-ee-question-paper-2026-download-solutions-pdf-analysis' },
    { title: 'GATE EE PYQs 2012-2025 (ee.gateoverflow.in)', url: 'https://ee.gateoverflow.in/previous-years' },
    { title: 'GATE EE PYQs 1991-2025 (gateexam.info)', url: 'https://www.gateexam.info/previous-papers/EE/' },
    { title: 'GATE EE PYQs with Solutions 2014-2025 (EduRev)', url: 'https://edurev.in/t/511506/gate-ee-previous-year-papers-with-solutions' },
    { title: 'Official GATE PYQs (2007-2025) IIT Guwahati', url: 'https://gate2026.iitg.ac.in/download.html' },
    { title: 'GATE Overflow GO PDF Viewer', url: 'https://gateoverflow.in/book' },
    { title: 'Made Easy GATE 2025 EE Solutions', url: 'https://www.madeeasy.in/gate-exam-questions-answer-key-solutions' },
  ],
  notes: [
    { title: 'Made Easy & ACE Academy EE Notes (gatenotes.in)', url: 'https://gatenotes.in/gate-electrical-notes.php' },
    { title: 'Made Easy Handwritten Notes (UIET) - ALL Subjects', url: 'https://uietmdu.in/made-easy-handwritten-gate-notes-2024-pdf-ee-ies/' },
    { title: 'ACE Academy Subject-wise Notes (gateexam.info)', url: 'https://www.gateexam.info/notes/ee/ace-academy-gate-study-material-pdf/' },
    { title: 'PW GATE EE Study Notes (Physics Wallah)', url: 'https://www.pw.live/gate/exams/gate-electrical-engineering-notes' },
    { title: 'SelfStudys GATE EE Chapter-wise Notes', url: 'https://www.selfstudys.com/page/gate-electrical-engineering-notes' },
    { title: 'Testbook GATE EE Topic-wise Notes', url: 'https://testbook.com/gate-ee/study-notes' },
    { title: 'Studynama Made Easy & ACE Notes (All Subjects)', url: 'https://www.studynama.com/gate-electrical-engg-made-easy-ace-academy-notes/' },
    { title: 'GO-PDFs: EM & GA (all branches)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gate-2026-common' },
    { title: 'GATE EE Topic-wise PYQs (EduRev)', url: 'https://edurev.in/t/511505/gate-ee-topic-wise-previous-year-questions-with-answers' },
    { title: 'prepp.in GATE EE Test Series (Sectional + Full Mock)', url: 'https://prepp.in/test-series/tests/gate-ee-2026-test-series-(updated)--6641d20448b4bcbda2c7e9e5?examCategory=GATE' },
  ],
}
