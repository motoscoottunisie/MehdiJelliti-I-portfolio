
import { Project, Skill, Testimonial, BlogPost, Integrations, ExperienceItem } from '../types';

export interface Content {
  nav: {
    hello: string;
    portfolio: string;
    about: string;
    blog: string;
    contact: string;
  };
  hero: {
    name: string;
    role: string;
    title: string;
    titleAccent: string;
    description: string;
    viewWork: string;
    downloadCV: string;
    desktopImage: string;
    mobileImage: string;
  };
  about: {
    title: string;
    description1: string;
    descriptionEffortless: string;
    descriptionIntuitive: string;
    descriptionPremium: string;
    description2: string;
    tags: string[];
  };
  skills: {
    label: string;
    title: string;
    items: { name: string; key: string }[];
  };
  portfolio: {
    label: string;
    title: string;
    description: string;
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    filters: {
        all: string;
        web: string;
        mobile: string;
        branding: string;
    }
  };
  projectDetail: {
    backToWork: string;
    gallery: string;
    technologies: string;
    aboutProject: string;
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  testimonials: {
    items: Testimonial[];
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    backToBlog: string;
    posts: BlogPost[];
  };
  contact: {
    title: string;
    benefits: string[];
    name: string;
    email: string;
    phone: string;
    company: string;
    phoneInput: string;
    message: string;
    send: string;
    copyright: string;
  };
  modal: {
    overview: string;
    technologies: string;
    caseStudy: string;
    livePreview: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    username: string;
    password: string;
    loginButton: string;
    returnHome: string;
  };
  integrations: Integrations;
  projects: Project[];
}

const en: Content = {
  nav: { hello: "Hello", portfolio: "Portfolio", about: "About", blog: "Blog", contact: "Contact" },
  hero: {
    name: "Mehdi Jelliti",
    role: "Hi, i am Mehdi Jelliti",
    title: "I think, create",
    titleAccent: "and deliver.",
    description: "I create design experiences built on clarity, precision, and refined visual aesthetics.",
    viewWork: "View My Work",
    downloadCV: "Download CV",
    desktopImage: "https://www.magma-studio.tn/portfolio2/my-photo.webp",
    mobileImage: "https://www.magma-studio.tn/portfolio2/my-photo-mobile.webp"
  },
  about: {
    title: "Entrepreneur. Designer. Creator.",
    description1: "Every detail is crafted with purpose — from the first sketch to the final interaction. I combine UI/UX thinking, modern development, and clean visual design to deliver experiences that feel",
    descriptionEffortless: "effortless",
    descriptionIntuitive: "intuitive",
    descriptionPremium: "unmistakably premium",
    description2: ".",
    tags: ["React front-end", "Custom WordPress", "UI/UX & Product", "Visual Identity"]
  },
  skills: {
    label: "Expertise",
    title: "Tools & Technologies",
    items: [
      { name: 'React', key: 'React' },
      { name: 'Next.js', key: 'Next.js' },
      { name: 'JavaScript', key: 'JavaScript' },
      { name: 'WordPress', key: 'WordPress' },
      { name: 'Elementor', key: 'Elementor' },
      { name: 'UI/UX Design', key: 'UI/UX Design' },
      { name: 'Branding', key: 'Branding' },
      { name: 'Prototyping', key: 'Prototyping' },
    ]
  },
  portfolio: {
    label: "Selected Work",
    title: "Featured Projects",
    description: "A collection of digital products crafted with precision."
  },
  portfolioPage: {
    title: "Work.",
    subtitle: "A curated selection of projects across web, mobile, and brand identity.",
    filters: {
        all: "All Projects",
        web: "Web Design",
        mobile: "Mobile App",
        branding: "Branding"
    }
  },
  projectDetail: {
    backToWork: "Back to Work",
    gallery: "Project Gallery",
    technologies: "Technologies",
    aboutProject: "About the Project"
  },
  experience: {
    title: "Journey",
    items: [
      { 
        id: 1, 
        year: "2024", 
        title: "Founder & Creative Director", 
        organization: "Magma Studio", 
        description: "Leading a design-driven studio focused on crafting premium digital identities and web experiences for international clients.", 
        type: "work" 
      },
      { 
        id: 2, 
        year: "2022", 
        title: "Senior UI/UX Designer", 
        organization: "Freelance", 
        description: "Delivered over 30+ high-fidelity projects, specializing in React-based web applications and custom WordPress themes.", 
        type: "work" 
      },
      { 
        id: 3, 
        year: "2020", 
        title: "License in Multimedia Arts", 
        organization: "Higher Institute of Arts & Multimedia", 
        description: "Graduated with honors, focusing on interactive design, visual communication, and web technologies.", 
        type: "education" 
      },
      { 
        id: 4, 
        year: "2018", 
        title: "Started Web Development", 
        organization: "Self-Initiated", 
        description: "Began the journey into frontend development, mastering HTML, CSS, and JavaScript basics.", 
        type: "achievement" 
      }
    ]
  },
  testimonials: {
    items: [
      {
        id: 1,
        text: "Working with Mehdi felt effortless. The design was beautiful, the build was seamless, and the final product exceeded every expectation.",
        author: "Sarah Jenkins",
        role: "CEO, Modern Living",
        isVisible: true
      },
      {
        id: 2,
        text: "A rare combination of technical expertise and true artistic vision. The website he built transformed our brand perception overnight.",
        author: "David Ross",
        role: "Director, Ross Architecture",
        isVisible: true
      }
    ]
  },
  blog: {
    title: "Thoughts.",
    subtitle: "Insights on design, development, and the future of digital products.",
    readMore: "Read Article",
    backToBlog: "Back to Blog",
    posts: [
      {
        id: 1,
        title: "The Future of React Server Components",
        excerpt: "How the latest React architecture is reshaping the way we build performant web applications.",
        date: "Oct 24, 2024",
        category: "Development",
        readTime: "5 min read",
        image: "https://picsum.photos/800/600?random=10",
        tags: ["React", "Performance", "Web Development"],
        content: [
          "React Server Components (RSC) represent a paradigm shift in how we think about building React applications...",
          "Traditionally, React applications have relied heavily on client-side rendering...",
          "With RSC, developers can now mix server and client components..."
        ]
      },
      {
        id: 2,
        title: "Designing for Accessibility in 2024",
        excerpt: "Why inclusive design is no longer optional and how to implement it without compromising aesthetics.",
        date: "Sep 12, 2024",
        category: "Design",
        readTime: "4 min read",
        image: "https://picsum.photos/800/600?random=11",
        tags: ["Accessibility", "Inclusive Design", "UX"],
        content: [
          "Accessibility (a11y) in web design is often treated as a checklist item...",
          "In 2024, the web is more essential to daily life than ever before...",
          "Implementing accessibility doesn't mean sacrificing aesthetics..."
        ]
      },
      {
        id: 3,
        title: "Why Minimalist UI Converts Better",
        excerpt: "Analyzing the psychological impact of whitespace and clarity on user decision making.",
        date: "Aug 05, 2024",
        category: "UI/UX",
        readTime: "6 min read",
        image: "https://picsum.photos/800/600?random=12",
        tags: ["Minimalism", "Conversion", "Psychology"],
        content: [
            "Minimalism in UI design is more than just a visual trend...",
            "Cognitive load theory suggests that our working memory has limited capacity...",
            "Whitespace, or negative space, is the minimalist's most powerful tool..."
        ]
      }
    ]
  },
  contact: {
    title: "Let’s collaborate",
    benefits: ["A quick, seamless response", "Effortless ways to connect", "Personal guidance from the start"],
    name: "Name",
    email: "Email",
    phone: "+216 21 719 109",
    company: "Company",
    phoneInput: "Phone Number",
    message: "Message",
    send: "Send Message",
    copyright: "© 2024 Mehdi Jelliti. All rights reserved."
  },
  modal: {
    overview: "Overview",
    technologies: "Technologies",
    caseStudy: "Case Study 2024",
    livePreview: "Live Preview"
  },
  admin: {
    loginTitle: "Welcome Back",
    loginSubtitle: "Enter your credentials to access the dashboard.",
    username: "Username",
    password: "Password",
    loginButton: "Sign In",
    returnHome: "Return Home"
  },
  integrations: {
    googleAnalyticsId: "",
    googleSearchConsoleCode: ""
  },
  projects: [
    {
      id: 1,
      title: "Lumina Financial",
      category: "FinTech Web App",
      image: "https://picsum.photos/800/600?random=1",
      description: "Real-time dashboard for high-frequency trading.",
      fullDescription: "A comprehensive financial dashboard built with Next.js and WebSocket integration...",
      technologies: ["React", "TypeScript", "D3.js", "Node.js"],
      gallery: ["https://picsum.photos/800/600?random=101"]
    },
    {
      id: 2,
      title: "Aura Architecture",
      category: "WordPress Portfolio",
      image: "https://picsum.photos/800/600?random=2",
      description: "Minimalist showcase for a boutique architecture firm.",
      fullDescription: "Custom WordPress theme development focusing on large imagery and typography...",
      technologies: ["WordPress", "PHP", "GSAP", "React"],
      gallery: ["https://picsum.photos/800/600?random=201"]
    }
  ]
};

const ar: Content = {
  nav: { hello: "مرحباً", portfolio: "أعمالي", about: "من أنا", blog: "المدونة", contact: "تواصل معي" },
  hero: {
    name: "مهدي جليتي",
    role: "مصمم",
    title: "تصميم.",
    titleAccent: "يرتقي بك.",
    description: "أصنع تجارب تصميم مبنية على الوضوح والدقة والجماليات البصرية الراقية.",
    viewWork: "شاهد أعمالي",
    downloadCV: "تحميل السيرة الذاتية",
    desktopImage: "https://www.magma-studio.tn/portfolio2/my-photo.webp",
    mobileImage: "https://www.magma-studio.tn/portfolio2/my-photo-mobile.webp"
  },
  about: {
    title: "رائد أعمال. مصمم. مبدع.",
    description1: "كل تفصيل مصنوع بدقة وهدف — من المسودة الأولى إلى التفاعل النهائي. أجمع بين التفكير في تجربة المستخدم، والتطوير الحديث، والتصميم البصري النظيف لتقديم تجارب تبدو",
    descriptionEffortless: "سلسة",
    descriptionIntuitive: "بدهية",
    descriptionPremium: "وفاخرة بلا شك",
    description2: ".",
    tags: ["واجهات React", "تطوير WordPress", "تجربة المستخدم", "الهوية البصرية"]
  },
  skills: {
    label: "الخبرات",
    title: "الأدوات والتقنيات",
    items: [
      { name: 'React', key: 'React' },
      { name: 'Next.js', key: 'Next.js' },
      { name: 'JavaScript', key: 'JavaScript' },
      { name: 'WordPress', key: 'WordPress' },
      { name: 'Elementor', key: 'Elementor' },
      { name: 'UI/UX Design', key: 'UI/UX Design' },
      { name: 'Branding', key: 'Branding' },
      { name: 'Prototyping', key: 'Prototyping' },
    ]
  },
  portfolio: {
    label: "مختارات",
    title: "أبرز المشاريع",
    description: "مجموعة من المنتجات الرقمية المصنوعة بدقة."
  },
  portfolioPage: {
    title: "الأعمال.",
    subtitle: "مختارات من المشاريع عبر تصميم الويب، وتطبيقات الجوال، والهوية البصرية.",
    filters: {
        all: "كل المشاريع",
        web: "تصميم ويب",
        mobile: "تطبيقات جوال",
        branding: "هوية بصرية"
    }
  },
  projectDetail: {
    backToWork: "العودة للأعمال",
    gallery: "معرض المشروع",
    technologies: "التقنيات المستخدمة",
    aboutProject: "عن المشروع"
  },
  experience: {
    title: "الرحلة المهنية",
    items: [
      { 
        id: 1, 
        year: "٢٠٢٤", 
        title: "مؤسس ومدير إبداعي", 
        organization: "ماغما ستوديو", 
        description: "قيادة استوديو تصميم يركز على صياغة هويات رقمية وتجارب ويب فاخرة لعملاء دوليين.", 
        type: "work" 
      },
      { 
        id: 2, 
        year: "٢٠٢٢", 
        title: "مصمم واجهات أول", 
        organization: "عمل حر", 
        description: "تسليم أكثر من ٣٠ مشروعاً عالي الدقة، متخصصاً في تطبيقات ويب React وقوالب WordPress المخصصة.", 
        type: "work" 
      },
      { 
        id: 3, 
        year: "٢٠٢٠", 
        title: "إجازة في الفنون المتعددة الوسائط", 
        organization: "المعهد العالي للفنون والوسائط المتعددة", 
        description: "تخرجت بامتياز، مع التركيز على التصميم التفاعلي، والتواصل البصري، وتقنيات الويب.", 
        type: "education" 
      },
      { 
        id: 4, 
        year: "٢٠١٨", 
        title: "بداية تطوير الويب", 
        organization: "مبادرة ذاتية", 
        description: "بدأت الرحلة في تطوير الواجهات الأمامية، وإتقان أساسيات HTML و CSS و JavaScript.", 
        type: "achievement" 
      }
    ]
  },
  testimonials: {
    items: [
      {
        id: 1,
        text: "العمل مع مهدي كان في غاية السلاسة. التصميم كان جميلاً، البناء متقناً، والمنتج النهائي فاق كل التوقعات.",
        author: "سارة جنكينز",
        role: "المدير التنفيذي، مودرن ليفينج",
        isVisible: true
      },
      {
        id: 2,
        text: "مزيج نادر من الخبرة التقنية والرؤية الفنية الحقيقية. الموقع الذي بناه غيّر نظرة العملاء لعلامتنا التجارية بين ليلة وضحاها.",
        author: "ديفيد روس",
        role: "مدير، روس للعمارة",
        isVisible: true
      }
    ]
  },
  blog: {
    title: "أفكار.",
    subtitle: "رؤى حول التصميم والتطوير ومستقبل المنتجات الرقمية.",
    readMore: "اقرأ المقال",
    backToBlog: "العودة للمدونة",
    posts: [
      {
        id: 1,
        title: "مستقبل مكونات خادم React",
        excerpt: "كيف تعيد بنية React الأحدث تشكيل الطريقة التي نبني بها تطبيقات ويب عالية الأداء.",
        date: "٢٤ أكتوبر ٢٠٢٤",
        category: "تطوير",
        readTime: "٥ دقائق قراءة",
        image: "https://picsum.photos/800/600?random=10",
        tags: ["React", "Performance", "Web Development"],
        content: [
            "تمثل مكونات خادم React (RSC) تحولاً نوعياً في طريقة تفكيرنا في بناء تطبيقات React...",
            "تقليدياً، اعتمدت تطبيقات React بشكل كبير على التقديم من جانب العميل...",
            "مع RSC، يمكن للمطورين الآن المزج بين مكونات الخادم والعميل..."
        ]
      },
      // ... (Keeping existing posts) ...
    ]
  },
  contact: {
    title: "لنتعاون معاً",
    benefits: ["استجابة سريعة وسلسة", "طرق تواصل سهلة ومباشرة", "توجيه شخصي منذ البداية"],
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "+216 21 719 109",
    company: "الشركة",
    phoneInput: "رقم الهاتف",
    message: "الرسالة",
    send: "إرسال الرسالة",
    copyright: "© ٢٠٢٤ مهدي جليتي. جميع الحقوق محفوظة."
  },
  modal: {
    overview: "نظرة عامة",
    technologies: "التقنيات المستخدمة",
    caseStudy: "دراسة حالة ٢٠٢٤",
    livePreview: "معاينة حية"
  },
  admin: {
    loginTitle: "مرحباً بعودتك",
    loginSubtitle: "أدخل بيانات الاعتماد للوصول إلى لوحة التحكم.",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    returnHome: "العودة للرئيسية"
  },
  integrations: {
    googleAnalyticsId: "",
    googleSearchConsoleCode: ""
  },
  projects: [
    {
      id: 1,
      title: "لومينا المالية",
      category: "تطبيق ويب مالي",
      image: "https://picsum.photos/800/600?random=1",
      description: "لوحة تحكم فورية للتداول عالي التردد.",
      fullDescription: "لوحة تحكم مالية شاملة مبنية بـ Next.js وتكامل WebSocket...",
      technologies: ["React", "TypeScript", "D3.js", "Node.js"],
      gallery: ["https://picsum.photos/800/600?random=101"]
    },
    {
      id: 2,
      title: "أورا للعمارة",
      category: "معرض أعمال WordPress",
      image: "https://picsum.photos/800/600?random=2",
      description: "عرض بسيط لشركة هندسة معمارية.",
      fullDescription: "تطوير قالب WordPress مخصص يركز على الصور الكبيرة والطباعة...",
      technologies: ["WordPress", "PHP", "GSAP", "React"],
      gallery: ["https://picsum.photos/800/600?random=201"]
    }
  ]
};

export const translations = { en, ar };
