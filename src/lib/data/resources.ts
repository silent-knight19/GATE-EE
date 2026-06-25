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

export const contributor = {
  name: 'GATE EE Community',
  linkedin: 'https://www.linkedin.com',
  youtube: 'https://www.youtube.com',
}

export const subjectResources: SubjectResources[] = [
  {
    id: 'ec',
    name: 'Electric Circuits',
    shortName: 'Circuits',
    youtubePlaylists: [
      { title: 'Network Theory by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm-5K2yNJ3_9yMPY2Rw3GzR2' },
    ],
    revisionPyqs: [
      { title: 'Network Theory PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHhQtPQL0RHfX7SQ03aD5JFn' },
    ],
    nptelLectures: [
      { title: 'Basic Electric Circuits (IIT Kharagpur)', url: 'https://youtube.com/playlist?list=PLFW6lRTa1g81LohrWnYo_hsVB-RIzJDRm' },
    ],
    textbooks: [
      { name: 'Engineering Circuit Analysis by William Hayt, Jack Kemmerly', edition: '8E', chapters: 'ch 1-13' },
      { name: 'Circuit Theory: Analysis & Synthesis by Abhijit Chakrabarti', chapters: 'ch 1-10' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Network Theory Test 1', url: 'https://gateoverflow.in/exam/1933/network-theory-test-1' },
      { title: 'Network Theory Test 2', url: 'https://gateoverflow.in/exam/1934/network-theory-test-2' },
    ],
  },
  {
    id: 'emft',
    name: 'Electromagnetic Fields',
    shortName: 'EMFT',
    youtubePlaylists: [
      { title: 'Full EMFT Playlist by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm-YG1HMHZxTzJgkC2lSpZqf' },
    ],
    revisionPyqs: [
      { title: 'EMFT Revision & PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHjKsL5HbUGYBk9pICQ0n3Wj' },
    ],
    nptelLectures: [
      { title: 'Electromagnetic Fields (IIT Madras)', url: 'https://youtube.com/playlist?list=PLyqSpQzTE6M8iPpBExG2Vh8Gy_RD4gOeJ' },
    ],
    textbooks: [
      { name: 'Electromagnetics by John D. Kraus, Daniel A. Fleisch', chapters: 'ch 1-8' },
      { name: 'Elements of Electromagnetics by Matthew N.O. Sadiku', edition: '6E', chapters: 'ch 1-9' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'EMFT Test', url: 'https://gateoverflow.in/exam/1935/emft-test-1' },
    ],
  },
  {
    id: 'ss',
    name: 'Signals and Systems',
    shortName: 'S&S',
    youtubePlaylists: [
      { title: 'Signals & Systems by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm8mKZqPmZfN2tPnbCIqnBn8' },
    ],
    revisionPyqs: [
      { title: 'Signals & Systems PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHhKvDhP4KA7Y8PHZx3F3v7k' },
    ],
    nptelLectures: [
      { title: 'Principles of Signals & Systems (IIT Kanpur)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJSI0E-8KU-qBObvdNLx5pjI' },
    ],
    textbooks: [
      { name: 'Signals and Systems by Alan V. Oppenheim', edition: '2E', chapters: 'ch 1-11' },
      { name: 'Signals and Systems by Tarun Kumar Rawat', chapters: 'ch 1-6' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Signals & Systems Test 1', url: 'https://gateoverflow.in/exam/1936/signals-test-1' },
      { title: 'Signals & Systems Test 2', url: 'https://gateoverflow.in/exam/1937/signals-test-2' },
    ],
  },
  {
    id: 'emach',
    name: 'Electrical Machines',
    shortName: 'E. Machines',
    youtubePlaylists: [
      { title: 'Electrical Machines by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm_JeoGPH3VIMJ32tCiBhZSn' },
    ],
    revisionPyqs: [
      { title: 'Electrical Machines PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHgTvWqRqyLPYG48HMt4S8Qw' },
    ],
    nptelLectures: [
      { title: 'Electrical Machines I (IIT Kharagpur)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJRiG8K2dFtMhP2tLXNPmMhG' },
      { title: 'Electrical Machines II (IIT Kharagpur)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQoX6InOGVDswAeoEDpwn1G' },
    ],
    textbooks: [
      { name: 'Electrical Machinery by P.S. Bimbhra', chapters: 'ch 1-9' },
      { name: 'Electric Machinery by A.E. Fitzgerald, Charles Kingsley, Stephen Umans', edition: '6E', chapters: 'ch 1-9' },
      { name: 'Electrical Machines by I.J. Nagrath, D.P. Kothari', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Electrical Machines Test 1', url: 'https://gateoverflow.in/exam/1938/em-test-1' },
      { title: 'Electrical Machines Test 2', url: 'https://gateoverflow.in/exam/1939/em-test-2' },
    ],
  },
  {
    id: 'ps',
    name: 'Power Systems',
    shortName: 'Power Sys.',
    youtubePlaylists: [
      { title: 'Power Systems by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm8i0Rsv1HNSGv4z7CXVKYwz' },
    ],
    revisionPyqs: [
      { title: 'Power Systems PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHhX8JRoQJ4GPrKxlOqqbY0J' },
    ],
    nptelLectures: [
      { title: 'Power System Analysis (IIT Kanpur)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQNkFjXGJhG5DkYHSC3F7gC' },
      { title: 'Power System Operation & Control (IIT Bombay)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJTmKJzCj_6mKqCqGkMZLhKn' },
    ],
    textbooks: [
      { name: 'Modern Power System Analysis by I.J. Nagrath, D.P. Kothari', edition: '4E', chapters: 'ch 1-9' },
      { name: 'Power System Engineering by D.P. Kothari, I.J. Nagrath', edition: '3E', chapters: 'ch 1-11' },
      { name: 'Elements of Power System Analysis by William D. Stevenson Jr.', edition: '4E', chapters: 'ch 1-12' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Power Systems Test 1', url: 'https://gateoverflow.in/exam/1940/ps-test-1' },
      { title: 'Power Systems Test 2', url: 'https://gateoverflow.in/exam/1941/ps-test-2' },
    ],
  },
  {
    id: 'csys',
    name: 'Control Systems',
    shortName: 'Control Sys.',
    youtubePlaylists: [
      { title: 'Control Systems by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm9pF5QYvF7V_x6FF4asXbM5' },
    ],
    revisionPyqs: [
      { title: 'Control Systems PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHjVjHEuD8K0rQqGZJm4bQ0K' },
    ],
    nptelLectures: [
      { title: 'Control Systems (IIT Madras)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQoX6InOGVDswAeoEDpwn1G' },
    ],
    textbooks: [
      { name: 'Control Systems Engineering by Norman S. Nise', edition: '6E', chapters: 'ch 1-12' },
      { name: 'Modern Control Engineering by Katsuhiko Ogata', edition: '5E', chapters: 'ch 1-10' },
      { name: 'Control Systems by I.J. Nagrath, M. Gopal', edition: '4E', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Control Systems Test 1', url: 'https://gateoverflow.in/exam/1942/cs-test-1' },
      { title: 'Control Systems Test 2', url: 'https://gateoverflow.in/exam/1943/cs-test-2' },
    ],
  },
  {
    id: 'eem',
    name: 'Electrical and Electronic Measurements',
    shortName: 'Measurements',
    youtubePlaylists: [
      { title: 'Measurements by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm8C7KQmhLmh-XOK0WXG0Q5o' },
    ],
    revisionPyqs: [
      { title: 'Measurements PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHhVv_1JMkGqJ_YJQj0Zrj7b' },
    ],
    nptelLectures: [
      { title: 'Electrical Measurements (IIT Madras)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQPiFZXuQmGp0MI7KlzGm_M' },
    ],
    textbooks: [
      { name: 'Electrical & Electronic Measurements & Instrumentation by A.K. Sawhney', edition: '19E', chapters: 'ch 1-15' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Measurements Test', url: 'https://gateoverflow.in/exam/1944/measurements-test-1' },
    ],
  },
  {
    id: 'ade',
    name: 'Analog and Digital Electronics',
    shortName: 'Analog & Digital',
    youtubePlaylists: [
      { title: 'Analog Electronics by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm_mi3AQBxE0yP1GJCcDMGN7' },
      { title: 'Digital Electronics by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm8W1nX9X6X5Q2gY6pQ2ZJ5c' },
    ],
    revisionPyqs: [
      { title: 'Analog Electronics PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHjUu2IYSPnZ6tJYXc5GkYmC' },
      { title: 'Digital Electronics PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHhqBqQx9VXnKiMqKxJxGvR6' },
    ],
    nptelLectures: [
      { title: 'Analog Circuits (IIT Delhi)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJS_0rBcFjGSDj9rq9GZ8pBk' },
      { title: 'Digital Integrated Circuits (IIT Madras)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJT3cJ1f6B0OdqGq_-0Cq5JH' },
    ],
    textbooks: [
      { name: 'Microelectronic Circuits by Adel S. Sedra, Kenneth C. Smith', edition: '7E', chapters: 'ch 1-13' },
      { name: 'Electronic Devices and Circuit Theory by Robert Boylestad, Louis Nashelsky', edition: '11E', chapters: 'ch 1-15' },
      { name: 'Digital Design by M. Morris Mano', edition: '5E', chapters: 'ch 1-8' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Analog Electronics Test', url: 'https://gateoverflow.in/exam/1945/analog-test-1' },
      { title: 'Digital Electronics Test', url: 'https://gateoverflow.in/exam/1946/digital-test-1' },
    ],
  },
  {
    id: 'pe',
    name: 'Power Electronics',
    shortName: 'Power Elec.',
    youtubePlaylists: [
      { title: 'Power Electronics by Kreatryx', url: 'https://youtube.com/playlist?list=PLm_MSClsnwm8iYjyl2BmQJHJ10VQ1Xb1F' },
    ],
    revisionPyqs: [
      { title: 'Power Electronics PYQs', url: 'https://youtube.com/playlist?list=PLIPZ2_p3RNHiFHmRPO5HOH5y7J5fXx7p5' },
    ],
    nptelLectures: [
      { title: 'Fundamental Power Electronics (IISc Bangalore)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQeJv8gG6XK8p5YZ6q3rH7c' },
      { title: 'Power Electronics (IIT Delhi)', url: 'https://youtube.com/playlist?list=PLbMVogVj5nJQ5g1q8JfZt0p6VHlX0k4Pp' },
    ],
    textbooks: [
      { name: 'Power Electronics by P.S. Bimbhra', edition: '5E', chapters: 'ch 1-10' },
      { name: 'Power Electronics: Circuits, Devices and Applications by Muhammad H. Rashid', edition: '4E', chapters: 'ch 1-14' },
    ],
    topicwisePyqs: [
      { title: 'Topicwise PYQs (GitHub)', url: 'https://github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025' },
    ],
    freeTests: [
      { title: 'Power Electronics Test 1', url: 'https://gateoverflow.in/exam/1947/pe-test-1' },
      { title: 'Power Electronics Test 2', url: 'https://gateoverflow.in/exam/1948/pe-test-2' },
    ],
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    shortName: 'Apt.',
    youtubePlaylists: [],
    revisionPyqs: [],
    nptelLectures: [],
    textbooks: [],
    topicwisePyqs: [],
    freeTests: [
      { title: 'General Aptitude Test 1', url: 'https://gateoverflow.in/exam/36/go2017-aptitude-1' },
      { title: 'General Aptitude Test 2', url: 'https://gateoverflow.in/exam/64/general-aptitude-set-2' },
    ],
    additional: [
      { title: 'Resources, Short Notes & Topic List Video', url: 'https://youtu.be/IADuDzccEOI?si=nNrS9v50ORGVxLgN' },
    ],
  },
]

export const generalResources: GeneralResources = {
  fullLengthMocks: [
    { title: 'Made Easy GATE EE Mock 1', url: 'https://gateoverflow.in/exam/1949/ee-mock-1' },
    { title: 'Made Easy GATE EE Mock 2', url: 'https://gateoverflow.in/exam/1950/ee-mock-2' },
    { title: 'Ace Academy GATE EE Mock 1', url: 'https://gateoverflow.in/exam/1951/ee-mock-3' },
    { title: 'Test by Ruturaj Mock 1', url: 'https://gateoverflow.in/exam/126/test-by-ruturaj-mock-1' },
  ],
  previousYearPapers: [
    { title: 'GATE EE 2024', url: 'https://gateoverflow.in/exam/1952/gate-ee-2024' },
    { title: 'GATE EE 2023', url: 'https://gateoverflow.in/exam/1953/gate-ee-2023' },
    { title: 'GATE EE 2022', url: 'https://gateoverflow.in/exam/1954/gate-ee-2022' },
    { title: 'GATE EE 2021', url: 'https://gateoverflow.in/exam/1955/gate-ee-2021' },
    { title: 'GATE EE 2020', url: 'https://gateoverflow.in/exam/1956/gate-ee-2020' },
    { title: 'GATE EE 2019', url: 'https://gateoverflow.in/exam/1957/gate-ee-2019' },
    { title: 'GATE EE 2018', url: 'https://gateoverflow.in/exam/1958/gate-ee-2018' },
    { title: 'GATE EE 2017', url: 'https://gateoverflow.in/exam/1959/gate-ee-2017' },
  ],
  notes: [
    { title: 'GATE EE Notes from Standard Books', url: 'https://drive.google.com/drive/folders/example-ee-notes' },
    { title: 'Handwritten Notes (GitHub)', url: 'https://github.com/example/ee-gate-notes' },
  ],
}
