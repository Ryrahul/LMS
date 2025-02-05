import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.choice.deleteMany(),
    prisma.question.deleteMany(),
    prisma.test.deleteMany(),
    prisma.studyMaterial.deleteMany(),
    prisma.attendance.deleteMany(),
    prisma.feedback.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.course.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const hashedPassword = await bcrypt.hash('password123', 10);

  const teachers = await Promise.all([
    prisma.user.create({
      data: {
        username: 'prof_smith',
        email: 'smith@education.com',
        password: hashedPassword,
        role: 'Teacher',
        Verified: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'prof_johnson',
        email: 'johnson@education.com',
        password: hashedPassword,
        role: 'Teacher',
        Verified: true,
      },
    }),
  ]);

  const students = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          username: `student${i + 1}`,
          email: `student${i + 1}@student.com`,
          password: hashedPassword,
          role: 'Student',
          Verified: true,
        },
      }),
    ),
  );

  const courseNames = [
    [
      'Web Development Bootcamp',
      'Comprehensive web development course covering frontend and backend technologies',
    ],
    [
      'Data Science Fundamentals',
      'Introduction to data science, statistics, and machine learning',
    ],
    ['Mobile App Development', 'Learn to build iOS and Android applications'],
    ['Cloud Computing', 'Master AWS, Azure, and Google Cloud Platform'],
    [
      'Cybersecurity Basics',
      'Introduction to network security and ethical hacking',
    ],
    [
      'UI/UX Design',
      'Learn design principles and user experience fundamentals',
    ],
    ['Digital Marketing', 'Master SEO, social media, and content marketing'],
    [
      'Blockchain Development',
      'Learn cryptocurrency and smart contract development',
    ],
    ['Game Development', 'Create games using Unity and Unreal Engine'],
    [
      'AI and Machine Learning',
      'Deep learning, neural networks, and AI applications',
    ],
  ];

  const courses = await Promise.all(
    courseNames.map(([name, description], index) =>
      prisma.course.create({
        data: {
          name,
          description,
          student: {
            connect: students
              .slice(index % 5, (index % 5) + 5)
              .map((student) => ({ id: student.id })),
          },
        },
      }),
    ),
  );

  const subjectTitles = [
    ['HTML & CSS', 'JavaScript', 'Backend Development'],
    ['Python Basics', 'Statistics', 'Machine Learning'],
    ['Swift', 'Kotlin', 'React Native'],
    ['AWS', 'Azure', 'Docker'],
    ['Network Security', 'Cryptography', 'Penetration Testing'],
    ['UI Design', 'UX Research', 'Prototyping'],
    ['SEO', 'Social Media', 'Content Strategy'],
    ['Solidity', 'Web3.js', 'Smart Contracts'],
    ['Unity 3D', 'Game Design', '3D Modeling'],
    ['TensorFlow', 'PyTorch', 'Neural Networks'],
  ];

  const subjects = [];
  for (let i = 0; i < courses.length; i++) {
    const courseSubjects = await Promise.all(
      subjectTitles[i].map((title) =>
        prisma.subject.create({
          data: {
            title,
            courseId: courses[i].id,
          },
        }),
      ),
    );
    subjects.push(...courseSubjects);
  }

  const tests = await Promise.all(
    subjects.map((subject) =>
      prisma.test.create({
        data: {
          title: `${subject.title} Assessment`,
          subjectId: subject.id,
          questions: {
            create: Array.from({ length: 3 }, (_, i) => ({
              text: `Question ${i + 1} for ${subject.title}?`,
              choices: {
                create: [
                  { text: 'Correct Answer', isCorrect: true },
                  { text: 'Wrong Answer 1', isCorrect: false },
                  { text: 'Wrong Answer 2', isCorrect: false },
                ],
              },
            })),
          },
        },
      }),
    ),
  );

  const attendanceDates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  const attendanceRecords = await Promise.all(
    students.flatMap((student) =>
      subjects.slice(0, 10).map((subject) =>
        prisma.attendance.create({
          data: {
            date: attendanceDates[
              Math.floor(Math.random() * attendanceDates.length)
            ],
            studentId: student.id,
            subjectId: subject.id,
          },
        }),
      ),
    ),
  );

  const studyMaterialsData = [
    {
      title: 'HTML5 & CSS3 Complete Guide',
      fileUrl:
        'https://drive.google.com/file/d/1KWGthQeKCt2J9UHtBr_scw3iP38qZvY2/view',
      fileType: 'PDF',
    },
    {
      title: 'Modern JavaScript Tutorial',
      fileUrl: 'https://javascript.info/article/coding-style/code-style.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Node.js Documentation',
      fileUrl:
        'https://nodejs.org/dist/latest-v16.x/docs/api/documentation.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Python for Data Science',
      fileUrl: 'https://scipy-lectures.org/_downloads/ScipyLectures-simple.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Statistics Fundamentals',
      fileUrl: 'https://www.openintro.org/download.php?file=os4_tablet',
      fileType: 'PDF',
    },
    {
      title: 'Machine Learning Basics',
      fileUrl: 'https://www.deeplearningbook.org/contents/ml.html',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Swift Programming Guide',
      fileUrl:
        'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/aboutswift',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Android Development Fundamentals',
      fileUrl:
        'https://developer.android.com/courses/fundamentals-training/overview-v2',
      fileType: 'VIDEO',
    },
    {
      title: 'React Native Basics',
      fileUrl: 'https://reactnative.dev/docs/getting-started.pdf',
      fileType: 'PDF',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      fileUrl:
        'https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Azure Fundamentals',
      fileUrl: 'https://learn.microsoft.com/en-us/azure/azure-fundamentals/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Docker Getting Started',
      fileUrl: 'https://docs.docker.com/get-started/overview/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Network Security Fundamentals',
      fileUrl:
        'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Cryptography Basics',
      fileUrl: 'https://www.crypto101.io/Crypto101.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Ethical Hacking Course',
      fileUrl: 'https://www.hackthebox.com/newsroom/learning-paths-academy',
      fileType: 'VIDEO',
    },
    {
      title: 'UI Design Principles',
      fileUrl: 'https://material.io/design/introduction',
      fileType: 'DOCUMENT',
    },
    {
      title: 'UX Research Methods',
      fileUrl: 'https://www.nngroup.com/articles/which-ux-research-methods/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Figma Prototyping Guide',
      fileUrl:
        'https://help.figma.com/hc/en-us/categories/360002042553-Prototyping',
      fileType: 'VIDEO',
    },
    {
      title: 'SEO Best Practices',
      fileUrl:
        'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Social Media Marketing',
      fileUrl: 'https://buffer.com/library/social-media-marketing-strategy/',
      fileType: 'PRESENTATION',
    },
    {
      title: 'Content Marketing Strategy',
      fileUrl:
        'https://contentmarketinginstitute.com/wp-content/uploads/2021/10/B2B-2022-Research-Final.pdf',
      fileType: 'PDF',
    },
    {
      title: 'Ethereum Development',
      fileUrl: 'https://ethereum.org/en/developers/docs/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Web3.js Documentation',
      fileUrl: 'https://web3js.readthedocs.io/en/v1.8.2/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Smart Contracts Guide',
      fileUrl: 'https://docs.soliditylang.org/en/v0.8.17/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Unity Fundamentals',
      fileUrl: 'https://docs.unity3d.com/Manual/index.html',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Game Design Principles',
      fileUrl: 'https://www.gamedeveloper.com/design/game-design-principles',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Blender 3D Basics',
      fileUrl: 'https://docs.blender.org/manual/en/latest/',
      fileType: 'VIDEO',
    },
    {
      title: 'TensorFlow Guide',
      fileUrl: 'https://www.tensorflow.org/guide',
      fileType: 'DOCUMENT',
    },
    {
      title: 'PyTorch Tutorials',
      fileUrl: 'https://pytorch.org/tutorials/',
      fileType: 'DOCUMENT',
    },
    {
      title: 'Neural Networks Fundamentals',
      fileUrl: 'https://neuralnetworksanddeeplearning.com/index.html',
      fileType: 'DOCUMENT',
    },
  ];

  const studyMaterials = await Promise.all(
    subjects.map((subject, index) =>
      prisma.studyMaterial.create({
        data: {
          title: studyMaterialsData[index].title,
          fileUrl: studyMaterialsData[index].fileUrl,
          fileType: studyMaterialsData[index].fileType,
          subjectId: subject.id,
        },
      }),
    ),
  );

  const feedbackTexts = [
    'Excellent content and delivery!',
    'Very informative and well-structured.',
    'Great practical examples.',
    'Could use more interactive elements.',
    'Outstanding course material.',
    'Helped me understand complex concepts.',
    'Well-paced and comprehensive.',
    'Engaging and practical.',
    'Very thorough coverage of topics.',
    'Clear and concise explanations.',
  ];

  const courseFeedback = await Promise.all(
    Array.from({ length: 25 }, () =>
      prisma.feedback.create({
        data: {
          text: feedbackTexts[Math.floor(Math.random() * feedbackTexts.length)],
          rating: Math.floor(Math.random() * 3) + 3, // Ratings 3-5
          courseId: courses[Math.floor(Math.random() * courses.length)].id,
          authorId: students[Math.floor(Math.random() * students.length)].id,
        },
      }),
    ),
  );

  const subjectFeedback = await Promise.all(
    Array.from({ length: 25 }, () =>
      prisma.feedback.create({
        data: {
          text: feedbackTexts[Math.floor(Math.random() * feedbackTexts.length)],
          rating: Math.floor(Math.random() * 3) + 3, // Ratings 3-5
          subjectId: subjects[Math.floor(Math.random() * subjects.length)].id,
          authorId: students[Math.floor(Math.random() * students.length)].id,
        },
      }),
    ),
  );

  console.log('Seed data created successfully!');
  console.log({
    users: students.length + teachers.length,
    courses: courses.length,
    subjects: subjects.length,
    tests: tests.length,
    attendance: attendanceRecords.length,
    studyMaterials: studyMaterials.length,
    feedback: courseFeedback.length + subjectFeedback.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
