/* data.js */

const portfolioData = {
    profile: {
        name: "Reddy Kiranmayi",
        logoName: "Kiranmayi",
        avatarSeed: "Kiranmayi", // Used for the generated avatar
        roles: [
            "Undergraduate Student",
            "Competitive Programmer"
        ],
        resumeLink: "./resume.pdf",
        profileImg: "./profile.jpg",
        heroImg: "./profile.jpg"
    },
    about: {
        title: "About Me",
        points: [
            "Hi, I'm Kiranmayi, a B.Tech Computer Science Engineering student",
            "College : ACE Engineering College",
            "Aspiring Computer Science enthusiast with a passion for innovation, skilled in coding, web development, and AI-driven solutions.",
            "Driven to create impactful technologies, with hands-on experience in smart projects and competitive coding excellence."
        ]
    },
    skills: [
        { name: "Java",    icon: "devicon-java-plain colored" },
        { name: "HTML5",   icon: "devicon-html5-plain colored" },
        { name: "CSS3",    icon: "devicon-css3-plain colored" },
        { name: "React",   icon: "devicon-react-original colored" },
        { name: "Node.js", icon: "devicon-nodejs-plain colored" },
        { name: "MySQL",   icon: "devicon-mysql-plain colored" },
        { name: "DSA",     icon: "fas fa-sitemap", color: "#a855f7" }
    ],
    codingStats: [
        {
            platform: "LeetCode",
            rating: "1238",
            details: "Solved 200+ problems",
            link: "https://leetcode.com/u/rkiranmayisai/"
        },
        {
            platform: "Codechef",
            rating: "1418",
            details: "2-star coder",
            link: "https://www.codechef.com/users/rkiranmayisai"
        },
        {
            platform: "Geeks For Geeks",
            rating: "2nd Rank",
            details: "Solved 300+ problems",
            link: "https://www.geeksforgeeks.org/profile/rkiranmayi36t?tab=activity"
        }
    ],
    projects: [
        {
            id: "01",
            title: "Student Marks Data Visualization",
            description: "Created bar charts and pie charts to represent student performance trends effectively, providing clear visual insights into academic data.",
            image: "./assets/student_marks_visualization.png",
            tags: ["Python", "Matplotlib", "Data Visualization"],
            link: "https://github.com/rkiranmayisai/bootcamp_GenAI/blob/main/student%20marks%20project%20.ipynb"
        },
        {
            id: "02",
            title: "Simple Calculator",
            description: "Developed a console-based calculator that performs basic arithmetic operations. Strengthened understanding of logic building and modular programming in C.",
            image: "./assets/calculator.png",
            tags: ["C Language", "Console App", "Modular Programming"],
            link: "https://github.com/rkiranmayisai/Calculator"
        },
        {
            id: "03",
            title: "Crime Hotspot Detection using Crowdsourced Data",
            description: "Developed a data analysis system to identify crime-prone areas using crowdsourced datasets. Used Pandas, Matplotlib, and Seaborn for preprocessing and visualization. Generated heatmaps and trend analysis to support crime pattern identification.",
            image: "./assets/crime_hotspot.png",
            tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Heatmaps"],
            link: "https://github.com/rkiranmayisai/detection-of-crime-hotspot-website"
        },
        {
            id: "04",
            title: "Personal Portfolio Website",
            description: "Designed and developed a responsive personal portfolio website to showcase projects, skills, and achievements. Implemented interactive UI components and smooth navigation using JavaScript. Optimized the layout for both desktop and mobile devices.",
            image: "./assets/portfolio_website.png",
            tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
            link: "https://github.com/rkiranmayisai/portfolio"
        },
        {
            id: "05",
            title: "Customer Segmentation using Python",
            description: "Built a machine learning project to group customers based on purchasing behavior and demographics. Applied K-Means clustering using Scikit-learn. Visualized customer groups and insights using Matplotlib and Seaborn.",
            image: "./assets/customer_segmentation.png",
            tags: ["Python", "Scikit-learn", "K-Means", "Matplotlib", "Seaborn"],
            link: "https://github.com/rkiranmayisai/Customer-Segmentation-"
        },
        {
            id: "06",
            title: "Global Sales Performance Dashboard",
            description: "An interactive Power BI dashboard visualising worldwide sales performance insights, regions, products, and temporal trends from transactional data.",
            image: "./assets/global_sales_dashboard.png",
            tags: ["Power BI", "Data Analytics", "Power Query", "Data Modeling"],
            link: "https://github.com/rkiranmayisai/FUTURE_DS_01"
        }
    ],
    education: [
        {
            degree: "B Tech",
            period: "2024 - present",
            institution: "ACE Engineering College, Ghatkesar",
            score: "CGPA: 8.99",
            icon: "fas fa-university"
        },
        {
            degree: "Intermediate",
            period: "2022 - 2024",
            institution: "Narayana Junior College, ECIL",
            score: "Percentage: 96%",
            icon: "fas fa-school"
        },
        {
            degree: "10th Class",
            period: "2021 - 2022",
            institution: "Sri Chaitanya Techno School, ECIL",
            score: "GPA: 10/10",
            icon: "fas fa-graduation-cap"
        }
    ],
    social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        email: "r.kiranmayisai@gmail.com"
    },
    certifications: [
        {
            title: "DSA Problem Solving for Interviews using Java",
            issuer: "Scaler Topics",
            date: "2026",
            image: "./assets/scaler_dsa.png",
            link: "https://moonshot.scaler.com/s/sl/rWaoTV4fbm"
        },
        {
            title: "Operating Systems",
            issuer: "NPTEL (SWAYAM)",
            date: "2026",
            image: "./assets/operating_systems.png",
            link: "https://drive.google.com/file/d/1UWCzCBNmt-U9A4hc84gyQxD9WtsySxqY/view?usp=sharing"
        },
        {
            title: "Multimodal Artificial Intelligence & Emerging Innovation",
            issuer: "ACE Engineering College",
            date: "2026",
            image: "./assets/multimodal_ai.png",
            link: "https://drive.google.com/file/d/1ZlC3BVrDFbNLZty0eyStuKtYHHN0R6kz/view?usp=sharing"
        },
        {
            title: "Agent Blazer Champion",
            issuer: "Salesforce",
            date: "2024",
            image: "./assets/agent_blazer.png",
            link: "https://drive.google.com/file/d/1y4nbbVjawVon5OT7Ss3QwTqp4WTQGGvf/view?usp=drive_link"
        },
        {
            title: "Python Programming",
            issuer: "Guvi / Python",
            date: "2024",
            image: "./assets/python_programming.png",
            link: "https://drive.google.com/file/d/1f3flHvMNg13T7aa5dTQzS1foeSYkExEj/view?usp=drive_link"
        },
        {
            title: "Data Analytics Job Simulation",
            issuer: "Deloitte",
            date: "2024",
            image: "./assets/deloitte_data.png",
            link: "https://drive.google.com/file/d/1qWJit9b3IdEBkOxk4wo3KFZtiSDJAw1u/view?usp=drive_link"
        }
    ],
    bootcamp: [
        {
            title: "GenAI Bootcamp Exercises",
            description: "A comprehensive collection of Python programming exercises, list/dictionary manipulations, CRUD operations, and data processing notebooks.",
            image: "./assets/bootcamp_genai_exercises.png",
            link: "https://github.com/rkiranmayisai/bootcamp_GenAI"
        },
        {
            title: "Heart Disease Analysis using Seaborn",
            description: "Analyzed clinical factors associated with heart disease using Python and Seaborn to visualize statistical correlations, distributions, and patterns in medical data.",
            image: "./assets/heart_disease_seaborn.png",
            link: "https://github.com/rkiranmayisai/heart-disease-using-seaborn/blob/main/seaborn_python.ipynb"
        },
        {
            title: "Decision Tree Classification Projects",
            description: "Various Decision Tree classification models analyzing CSV table datasets like play football and weekend decisions using machine learning libraries.",
            image: "./assets/decision_tree_csv.png",
            link: "https://github.com/rkiranmayisai/Decision-Trees-Classification-Projects/blob/main/CSV-Table%20Data%20%281%29.ipynb"
        },
        {
            title: "Regression on Cancer Dataset",
            description: "Applied machine learning regression models on a breast cancer dataset to analyze features and predict numerical target indicators, optimizing model parameters for precision.",
            image: "./assets/cancer_regression.png",
            link: "https://github.com/rkiranmayisai/Regression-on-cancer-dataset/blob/main/cancer%20ml%20algorithms.ipynb"
        },
        {
            title: "Heart Disease Prediction",
            description: "Trained classification algorithms on Cleveland clinic dataset features to identify the likelihood of coronary disease in patients, analyzing model metrics.",
            image: "./assets/heart_disease_prediction.png",
            link: "https://github.com/rkiranmayisai/Heart-disease-prediction/blob/main/project%20heart%20disease.ipynb"
        },
        {
            title: "Decision Tree Classifier - Binary Classification",
            description: "A binary classification project using Decision Trees to classify data samples based on features. Demonstrates dataset training, model splitting, and metric evaluation.",
            image: "./assets/decision_tree_binary.png",
            link: "https://github.com/rkiranmayisai/Decision-Tree-Classifier---Binary-Classification-Problem/blob/main/Untitled4.ipynb"
        },
        {
            title: "Multi-Class Classification Problem",
            description: "Developed and trained classification algorithms to accurately categorize data points into multiple target classes, exploring performance metrics like precision and recall.",
            image: "./assets/multiclass_classification.png",
            link: "https://github.com/rkiranmayisai/Multi-Class-Classification-Problem-Statements/blob/main/Gini-Multi-Class.ipynb"
        },
        {
            title: "Decision Tree - Entropy & Information Gain",
            description: "Implemented a Decision Tree Classifier that utilizes Entropy and Information Gain metrics to determine optimal node splits, maximizing classification accuracy.",
            image: "./assets/decision_tree_entropy.png",
            link: "https://github.com/rkiranmayisai/Decision-Tree-Classifier---Binary-Classification-Problem-Using-Entropy-Criterion-Information-Gain-/blob/main/Decision_Trees_Binary_Entropy-Copy1%20%282%29%20%281%29.ipynb"
        },
        {
            title: "Heart Disease Classification",
            description: "Trained classification algorithms on patient data using scikit-learn models to categorize cardiac health outcomes and output evaluation metrics.",
            image: "./assets/heart_disease_classification.png",
            link: "https://github.com/rkiranmayisai/heart-disease-classification/blob/main/dataset_%281%29.ipynb"
        }
    ],
    websites: [
        {
            title: "Brain Tumor Classifications",
            description: "A web-based classification tool that utilizes deep learning models to identify and classify brain tumor types from MRI scans.",
            image: "./assets/brain_tumor.png",
            link: "https://rkiranmayisai.github.io/Brain-Tumor-Classifications/"
        },
        {
            title: "Plant Disease Classification",
            description: "An AI-powered website that analyzes plant leaves to diagnose diseases and recommend treatments, promoting agricultural health.",
            image: "./assets/plant_disease.png",
            link: "https://rkiranmayisai.github.io/Plant-Disease-classification/"
        },
        {
            title: "Skin Cancer Classification Website",
            description: "Developed a medical classification tool designed to assist in the early detection and classification of skin cancer lesions from images.",
            image: "./assets/skin_cancer.png",
            link: "https://rkiranmayisai.github.io/Skin-Cancer-Classification-Website/"
        },
        {
            title: "Finance Tracker",
            description: "A secure personal finance tracker app to monitor income, visualize expenses, set budgets, and analyze spending patterns over time.",
            image: "./assets/finance_tracker.png",
            link: "https://github.com/rkiranmayisai/Finance-tracker"
        },
        {
            title: "E-Commerce Product Page",
            description: "A responsive, modern e-commerce product page featuring a dynamic gallery, interactive cart addition, and clean visual design.",
            image: "./assets/ecommerce.png",
            link: "https://rkiranmayisai.github.io/E-commerce-product-page/"
        },
        {
            title: "Recipe Finder",
            description: "A handy recipe search application that helps users discover cooking recipes based on ingredients, cuisines, and meal types.",
            image: "./assets/recipe_finder.png",
            link: "https://rkiranmayisai.github.io/Recipe-finder/"
        },
        {
            title: "Fruit & Vegetable Classification",
            description: "An image recognition application designed to accurately identify and classify various types of fruits and vegetables.",
            image: "./assets/fruit_vegetable.png",
            link: "https://rkiranmayisai.github.io/Fruit-Vegetable-Classification/"
        },
        {
            title: "Weather Prediction Website",
            description: "A clean weather forecasting website providing real-time weather details and multi-day predictions based on location searches.",
            image: "./assets/weather_prediction.png",
            link: "https://rkiranmayisai.github.io/Weather-predictio/"
        }
    ],
    contact: {
        phone: "+91 8985488589",
        address: "Hyderabad, Telangana"
    },
    tracking: {
        enabled: true,
        services: {
            ipApi: "https://ipapi.co/json/"
        }
    }
};

// Export for logic use
window.portfolioData = portfolioData;
