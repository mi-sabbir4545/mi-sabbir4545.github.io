/*
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE TEXT LIVES HERE.
 *  Edit this file to update the portfolio — no HTML/CSS needed.
 *  Keep it truthful: everything here should match your CV.
 * ─────────────────────────────────────────────────────────────
 */
window.PORTFOLIO = {
  greeting: "Hi, I'm",
  name: "Moinul Islam",
  role: "QA Automation & Security Testing Engineer",
  tagline:
    "I break web, mobile and API products before users do — with automation frameworks, " +
    "an attacker's mindset and AI-assisted testing.",
  location: "Dhaka, Bangladesh · Open to remote (UTC+6)",
  availability: "Open to remote roles: QA Automation, SDET, Security QA / VAPT",
  cv: "assets/Moinul_Islam_CV.pdf",

  links: {
    email: "sabbir722722@gmail.com",
    linkedin: "https://www.linkedin.com/in/moinul-islam-a67008182",
    github: "https://github.com/mi-sabbir4545",
  },

  stats: [
    { value: "2021", label: "Testing professionally since" },
    { value: "110+", label: "Mailchimp partner apps reviewed" },
    { value: "3", label: "Companies" },
    { value: "7", label: "Business domains" },
  ],

  about: [
    "I'm a QA Automation Engineer with nearly six years of experience testing web, mobile (iOS/Android) and API products " +
      "for HRMS, e-commerce, logistics and SaaS companies. I've built a UI automation framework from scratch, set up QA " +
      "processes for product teams, and reviewed 110+ third-party apps for the Mailchimp Partner Program.",
    "Today I'm focused on two things: bringing AI into everyday testing with tools like Claude Code and Hermes Agent, " +
      "and growing into security testing and VAPT with Burp Suite, the OWASP Top 10 and Linux.",
  ],

  highlights: [
    "Framework builder — designed UI automation from scratch with Selenium, Java, TestNG and POM on Jenkins CI",
    "Full-stack tester — web, Android, iOS, REST APIs and performance (JMeter, k6)",
    "AI-assisted — Claude Code for test design and scripting; a Hermes Agent bot on Telegram",
    "Security-minded — applying Burp Suite and OWASP Top 10 thinking to the products I test",
  ],

  skills: [
    { group: "Test Automation", items: ["Selenium WebDriver", "Playwright", "Cypress", "Appium", "Katalon Studio", "TestNG", "JUnit", "Pytest", "Robot Framework", "Cucumber (BDD)", "Page Object Model"] },
    { group: "API & Performance", items: ["Postman", "Newman", "Rest Assured", "JMeter", "k6"] },
    { group: "Security Testing", items: ["Burp Suite", "OWASP Top 10", "VAPT fundamentals", "Penetration testing fundamentals", "Authentication testing", "Access-control testing"] },
    { group: "AI & Agents", items: ["Claude Code", "AI-assisted test design", "Prompt engineering", "Hermes Agent", "Telegram bot"] },
    { group: "Linux & Scripting", items: ["Linux (Ubuntu)", "Command line", "Python", "Java", "JavaScript", "SQL (MySQL)"] },
    { group: "CI/CD & DevOps", items: ["Jenkins", "GitHub Actions", "Docker", "Git / GitHub", "Maven", "Gradle"] },
    { group: "QA Process", items: ["Manual testing", "Test strategy", "Requirement analysis", "RTM", "Test case design", "Regression", "Smoke & sanity", "UAT", "Cross-browser", "Mobile testing", "Agile / Scrum"] },
    { group: "Tools", items: ["Jira", "ClickUp", "Bugzilla", "Trello", "Figma (UI validation)"] },
  ],

  domains: [
    "HRMS & Payroll", "Warehouse (WHMS) & Procurement", "Logistics & Parcel Delivery",
    "E-commerce & Payment Gateways", "Supply Chain & BOM", "Email Marketing SaaS", "Digital Advertising",
  ],

  experience: [
    {
      role: "Software Quality Assurance Engineer (Automation)",
      company: "BYSL Global Technology Group",
      period: "Jan 2023 – Present",
      points: [
        "Established the QA process from the ground up: test strategy, test case standards, requirement breakdowns, RTMs and bug triage in ClickUp and Jira.",
        "Designed and built a UI automation framework from scratch with Selenium WebDriver, Java, TestNG and the Page Object Model, running regression suites in Jenkins CI.",
        "Automated API regression with Postman/Newman and Rest Assured, integrated into Jenkins for automated runs and reporting.",
        "Led QA for the enterprise HRMS suite (Employee, Payroll, Leave, Attendance, WHMS and Procurement) on web and Android, including Appium automation for the mobile app.",
        "Validated e-commerce cart, checkout, payment gateway and account flows, plus logistics and BOM products, across web, iPad, iPhone and Android.",
        "Used Claude Code to generate test cases from requirements, scaffold automation scripts and draft clear bug reports.",
      ],
      tags: ["Selenium", "TestNG", "Jenkins", "Appium", "Postman/Newman", "Claude Code"],
    },
    {
      role: "SQA & Test Automation Engineer",
      company: "Quality Up Services",
      period: "Apr 2022 – Dec 2022",
      points: [
        "Reviewed 110+ third-party apps submitted to the Mailchimp Partner Program.",
        "Executed end-to-end testing of the Mailchimp mobile web and native apps on iOS and Android.",
        "Built web and mobile test automation with Python, Selenium and Pytest (BDD/TDD) with HTML and Allure reports.",
        "Performed API testing with Postman and Rest Assured.",
      ],
      tags: ["Python", "Pytest", "Allure", "Rest Assured", "iOS", "Android"],
    },
    {
      role: "SQA Engineer",
      company: "SEBPO",
      period: "Jan 2021 – Mar 2022",
      points: [
        "Tested digital ad creatives and web-based creative tools across browsers and iOS, Android and Windows devices.",
        "Wrote and executed end-to-end test cases from SRS, wireframes and acceptance criteria.",
        "Automated repetitive regression checks with Selenium WebDriver and Katalon Studio.",
        "Ran JMeter performance tests and delivered analysis reports.",
      ],
      tags: ["Selenium", "Katalon", "JMeter", "Cross-browser"],
    },
  ],

  projects: [
    {
      title: "AI Assistant Bot on Telegram",
      kind: "AI · Agents",
      summary:
        "A Hermes Agent (Nous Research) assistant deployed on Nous Portal cloud and connected to Telegram, with persistent memory and scheduled tasks.",
      points: [
        "QA helper: drafts test cases, bug reports and test data",
        "Personal assistant with memory and reminders",
        "Security-learning companion for recon research and notes",
      ],
      stack: ["Hermes Agent", "Nous Portal", "Telegram"],
      link: null,
    },
    {
      title: "Enterprise UI Automation Framework",
      kind: "Test Automation · Work",
      summary:
        "Framework built from scratch at BYSL for HRMS, e-commerce and logistics products. Source code is private to the company.",
      points: [
        "Selenium WebDriver + Java + TestNG with the Page Object Model",
        "Regression suites triggered from Jenkins CI",
        "API regression with Postman/Newman and Rest Assured",
      ],
      stack: ["Selenium", "Java", "TestNG", "Jenkins"],
      link: null,
    },
    {
      title: "This Portfolio — with CI Quality Gates",
      kind: "QA · DevOps",
      summary:
        "A static site that only deploys when automated checks pass: Playwright smoke tests, axe-core accessibility scans and Lighthouse CI on GitHub Actions.",
      points: [
        "Strict Content-Security-Policy, no trackers, self-hosted fonts",
        "Content rendered safely with textContent (no innerHTML)",
        "Tests for broken links, console errors, theme toggle and mobile layout",
      ],
      stack: ["Playwright", "axe-core", "Lighthouse CI", "GitHub Actions"],
      link: { label: "View source", url: "https://github.com/mi-sabbir4545/mi-sabbir4545.github.io" },
    },
  ],

  security: {
    intro:
      "Nearly six years of breaking software taught me to think about what can go wrong. I'm now turning that mindset into " +
      "structured security testing and VAPT.",
    now: [
      { title: "Cyber Security Course", status: "In progress", detail: "Structured training in security testing and penetration testing fundamentals." },
      { title: "Web security practice", status: "Practising", detail: "Burp Suite, OWASP Top 10, authentication and access-control testing." },
      { title: "Linux (Ubuntu)", status: "Practising", detail: "Command-line skills for running and scripting security tools." },
    ],
    roadmap: [
      { step: "eJPT", note: "Junior Penetration Tester — hands-on entry certification" },
      { step: "BSCP", note: "Burp Suite Certified Practitioner — web app security" },
      { step: "OSCP", note: "Offensive Security Certified Professional — long-term goal" },
    ],
  },

  training: [
    { title: "Cyber Security Course", detail: "In progress · 2026" },
    { title: "Certification courses", detail: "BITM (BASIS Institute of Technology & Management) and People N Tech" },
  ],

  education: {
    degree: "BSc in Computer Science and Engineering",
    school: "Bangladesh University of Business and Technology (BUBT)",
    year: "2020",
  },
};
