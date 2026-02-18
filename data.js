const subjects = [
  {
    id: "k12",
    title: "K-12 Tutoring",
    description:
      "Personalized support in math, reading, science, and writing for every grade.",
    grades: ["Elementary", "Middle School", "High School"],
    tags: ["Homework help", "Study skills", "Confidence building"]
  },
  {
    id: "college",
    title: "College Tutoring",
    description:
      "One-on-one coaching for core courses, advanced placement, and major prep.",
    grades: ["Undergraduate", "Graduate"],
    tags: ["STEM", "Humanities", "Exam strategy"]
  },
  {
    id: "test-prep",
    title: "Test Preparation",
    description:
      "Focused test prep for SAT, ACT, AP, and state exams with proven results.",
    grades: ["High School", "College"],
    tags: ["Timed practice", "Score analysis", "Targeted drills"]
  }
];

const tutors = [
  {
    id: "maria-holt",
    name: "Maria Holt",
    specialty: "Mathematics",
    credentials: "M.S. Applied Mathematics, 8 years experience",
    rating: 4.9,
    bio: "Data-driven lessons that build confidence and mastery."
  },
  {
    id: "david-park",
    name: "David Park",
    specialty: "Reading & Writing",
    credentials: "M.Ed. Literacy, former curriculum specialist",
    rating: 4.8,
    bio: "Strategic reading and writing support for every learner."
  },
  {
    id: "alina-singh",
    name: "Alina Singh",
    specialty: "Science & Test Prep",
    credentials: "Ph.D. Chemistry, 10 years tutoring",
    rating: 5.0,
    bio: "Goal-oriented tutoring that turns concepts into results."
  }
];

const testimonials = [
  {
    id: "t1",
    quote:
      "Our son's grades jumped two letter levels in one semester. The sessions were focused and encouraging.",
    name: "Jamie L.",
    role: "Parent of 9th grader"
  },
  {
    id: "t2",
    quote:
      "The SAT prep plan was clear, practical, and effective. I felt ready on test day.",
    name: "Khalil M.",
    role: "Senior, College-bound"
  },
  {
    id: "t3",
    quote:
      "Flexible scheduling and amazing tutors. The learning plan kept us on track all year.",
    name: "Erica D.",
    role: "Parent of 6th grader"
  }
];

module.exports = {
  subjects,
  tutors,
  testimonials
};

