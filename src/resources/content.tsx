import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "yu",
  lastName: "zhou",
  name: `Joey Zhou`,
  role: "FullStack Engineer",
  avatar: "/images/avatar.jpg",
  email: "joeyzhouaus@gmail.com",
  location: "Australia/Melbourne", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Mandarin"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/JoeyZhouAus/personal_portfolio",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/joeyzhouinaustralia/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building scalable solutions in the cloud</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">PEXA</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Current Role
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Joey, a software engineer with 8+ years of experience in the real estate industry,
      <br /> specializing in property settlement, API development, and AWS cloud solutions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Skilled software engineer with 8 years of experience focused on the real estate industry, specialising in property rental, mortgage origination, and property settlement. Contributed to solution design and development while ensuring high-quality assurance across frontend, backend, and databases. Expertise in API development within an AWS cloud-native environment, utilising CI/CD and Docker for scalable and reliable applications, which improves deployment efficiency and system performance.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "PEXA",
        timeframe: "01/2023 – present",
        role: "Engineer",
        achievements: [
          <>Developed features for the PEXA core exchange app, which streamlined digital property settlement processes across various jurisdictions in Australia, making transactions smoother for users.</>,
          <>Built APIs for containerised applications in Spring Boot using Java and Kotlin, helping clients integrate our API to enhance their banking systems and achieve a fully streamlined digital settlement experience.</>,
          <>Enhanced support for internal teams by developing new features on developer portals and facilitating API gateway migrations using Kong gateway, which significantly improved overall system efficiency.</>,
          <>Collaborated with lead engineers on the migration project to the Kong gateway, ensuring a seamless transition that boosted API performance and reliability.</>,
          <>Conducted extensive automation testing using specialised scripts, which validated the migration's efficacy and led to a remarkably high success rate, ultimately enhancing system reliability.</>,
          <>Mentored and supervised junior team members, fostering their professional growth and development, which strengthened our team's capabilities and overall performance.</>,
        ],
        images: [],
      },
      {
        company: "CoreLogic",
        timeframe: "02/2022 – 12/2022",
        role: "Professional Software Engineer (remote)",
        achievements: [
          <>API development that the majority of banks in Australia and New Zealand rely on regarding property valuation using Java 8, Hibernate, Spring MVC, and Postgres</>,
          <>Continuous improvement on existing GitLab CI/CD pipeline</>,
          <>Practicing Agile methodology with BDD</>,
          <>Automation tests at the heart of development by writing unit tests, integration tests as well as acceptance tests plus maintaining and improving test coverage</>,
          <>Working alongside internal testers or collaborating with stakeholders from different teams to investigate issues and find solutions with minimum impact</>,
          <>Writing Load testing script to find bottlenecks of the system</>,
          <>Supervised and trained junior team members and supporting them along the way</>,
        ],
        images: [],
      },
      {
        company: "ISOTON",
        timeframe: "12/2020 – 01/2022",
        role: "Software Engineer",
        achievements: [
          <>Backend API and Microservices development and work with external App development teams to support many transactions that have an impact on millions of users using Spring Boot</>,
          <>Software releases onto private cloud servers and also the AWS platform through integrations with Bitbucket pipeline and Circle CI/CD or manual deployment</>,
          <>Participating in all phases of the software development cycle including requirements analysis, design, implementation, testing, and post-production support for mobile virtual network owners like TPG Mobile, Lebara, Kogan Mobile, and Felix Mobile</>,
          <>Participating in project planning, providing realistic time estimates for units of work, updating and tracking progress using Jira</>,
          <>Ability to handle highly stressed situations and unexpected errors efficiently</>,
          <>Working independently to meet tight deadlines in a dynamic team environment</>,
        ],
        images: [],
      },
      {
        company: "Virtual Agent",
        timeframe: "11/2019 – 12/2020",
        role: "Software Engineer",
        achievements: [
          <>Developing real estate maintenance solutions that provide a hassle-free communications platform through Landlord, Property managers, tradies, and tenants regarding maintenance work</>,
          <>API Integrations with Third Parties like PropertyMe and PropertyTree software platform</>,
          <>Deploying software releases onto the Azure platform</>,
          <>Requirements gatherings and analysis with stakeholders and users directly to maintain and create new features for the existing platform</>,
          <>Responsible for new project design and architecture with other developers</>,
          <>Developed a Mobile App internally for property managers to book and conduct inspections</>,
        ],
        images: [],
      },
      {
        company: "ISOTON",
        timeframe: "11/2017 – 10/2019",
        role: "Software Engineer",
        achievements: [
          <>Developed and enhanced software for ISOTON, including customer portal, CRM portal, and frontend and backend databases, catering to clients like TPG Mobile, Lebara, Kogan Mobile, and Felix Mobile.</>,
          <>Collaborated with team members to manage complex projects for corporate clients, impacting a large user base.</>,
          <>Demonstrated independent work ability and met strict deadlines in a dynamic team environment.</>,
          <>Prepared and executed comprehensive Dev Test cases.</>,
          <>Coordinated with various departments to ensure smooth project implementation.</>,
          <>Presented completed projects to stakeholders in a polished and professional manner.</>,
          <>Generated code build/release for deployment in multiple environments.</>,
          <>Created BAU and bulk update scripts to address system issues with minimum impact on customers</>,
          <>Provided post-deployment care for projects.</>,
        ],
        images: [],
      },
      {
        company: "ISOTON",
        timeframe: "03/2017 – 11/2017",
        role: "Software Q&A Engineer",
        achievements: [
          <>Carrying out Manual testing (black box testing, usability, user interface, ad-hoc) to discover errors and optimize usability</>,
          <>Creating configurable automation tests using Nightwatch Framework according to different projects for UI Testing</>,
          <>Preparing Manual test cases before testing</>,
          <>Assess and highlight potential project risks and suggest corrective actions or alternatives.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University Of South Australia",
        description: <>Bachelor of Information Technology (Software Development) • 03/2013 – 12/2015</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Backend Development",
        description: (
          <>Expertise in Java, Spring Framework, and API development with 8+ years of experience in enterprise applications.</>
        ),
        tags: [
          { name: "Java", icon: "java" },
          { name: "Spring", icon: "spring" },
          { name: "Kotlin", icon: "kotlin" },
          { name: "Python", icon: "python" },
        ],
        images: [],
      },
      {
        title: "Frontend Development",
        description: (
          <>Building modern web applications with React, JavaScript, HTML, and CSS.</>
        ),
        tags: [
          { name: "React", icon: "react" },
          { name: "JavaScript", icon: "javascript" },
          { name: "HTML", icon: "html5" },
          { name: "CSS", icon: "css3" },
        ],
        images: [],
      },
      {
        title: "Database Technologies",
        description: (
          <>Proficient in various database systems including Oracle, PostgreSQL, and SQL Server.</>
        ),
        tags: [
          { name: "Oracle", icon: "oracle" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MySQL", icon: "mysql" },
        ],
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>AWS cloud-native development with CI/CD pipelines, Docker containerization, and monitoring tools.</>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Docker", icon: "docker" },
          { name: "GitHub Actions", icon: "github" },
          { name: "Linux", icon: "linux" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
