export const problemStatements = [
  {
    code: "WEB01",
    category: "web",
    title: "Verified Disaster Resource Portal",
    problem:
      "Emergency information about shelters, food, medicine, volunteers and blocked roads is often scattered and unverified. Develop a portal that collects this information, marks its verification status and helps people request and track assistance.",
    mvp: [
      "Public resource listing",
      "Assistance requests",
      "Coordinator verification",
      "Last-updated information",
      "Request priority",
      "Assistance status tracking",
      "Coordinator dashboard",
    ],
    goal:
      "Create one place where people can view emergency resources and request help while coordinators verify and update information. Suggested roles are Public User, Resource Provider and Coordinator.",
    flow:
      "Add a resource with location, quantity or capacity, contact method and last-updated time. Mark it Unverified, Verified, Unavailable or Outdated. A person can submit an assistance request, and a coordinator can assign priority and update its progress.",
    rules:
      "Public users must clearly see whether information is verified. Old information should not appear as current. Sensitive requester information must not be displayed publicly. Real government integration and live emergency dispatch are not required.",
    judgeTest:
      "Add resources, verify one, mark another outdated, submit an urgent request and track it until completion.",
  },
  {
    code: "WEB02",
    category: "web",
    title: "Scholarship Eligibility Portal",
    problem:
      "Students struggle to understand eligibility, required documents and deadlines from lengthy scholarship notices. Develop a portal that checks a student profile against clearly recorded scholarship rules and explains the result.",
    mvp: [
      "Student profile",
      "Scholarship directory",
      "Rule-based eligibility result",
      "Reason for result",
      "Document checklist",
      "Deadline tracking",
      "Original notice reference",
    ],
    goal:
      "Help a student understand which listed scholarships may match their profile and what documents are required. Suggested roles are Student and Administrator.",
    flow:
      "An administrator adds a scholarship with eligibility rules, deadline, required documents and original notice link. A student completes a profile, receives Eligible, Possibly Eligible or Not Eligible results and sees the exact reason for every result. The student can maintain a document checklist.",
    rules:
      "Eligibility must be calculated from visible rules, not a hidden or unexplained score. The portal does not submit applications and cannot guarantee official approval. The original notice must always be available for confirmation.",
    judgeTest:
      "Create one scholarship and test profiles that pass, fail and have missing information.",
  },
  {
    code: "WEB03",
    category: "web",
    title: "Public Issue Resolution Tracker",
    problem:
      "Citizens may submit repeated complaints without knowing whether the responsible authority has received, assigned or resolved them. Develop a portal that records issues, identifies possible duplicates and provides public progress updates.",
    mvp: [
      "Complaint submission",
      "Location and category",
      "Possible duplicate grouping",
      "Department assignment",
      "Priority level",
      "Status history",
      "Public tracking",
      "Authority dashboard",
    ],
    goal:
      "Allow citizens to report public issues and follow their progress while authorities organise repeated reports. Suggested roles are Citizen and Department Officer or Administrator.",
    flow:
      "A citizen submits an issue with category, location, description and optional evidence. The system should show possible existing reports before creating a duplicate. An authorised user assigns the department and priority, then updates statuses such as Submitted, Acknowledged, In Progress and Resolved.",
    rules:
      "Duplicate reports should be grouped or linked, not silently deleted. Resolution should include a note or evidence. Personal information must remain private. Real municipal integration is not required.",
    judgeTest:
      "Submit two similar issues, group them, assign a department and track one through resolution.",
  },
  {
    code: "WEB04",
    category: "web",
    title: "Rural Produce Surplus Exchange",
    problem:
      "Farmers and sellers may lose perishable produce because nearby buyers are unaware of available stock. Develop a portal where sellers list surplus produce and buyers reserve available quantities before arranging collection.",
    mvp: [
      "Produce listing",
      "Quantity, price and location",
      "Harvest or expiry information",
      "Buyer reservation",
      "Available-quantity update",
      "Grouped pickup",
      "Completed transaction record",
    ],
    goal:
      "Connect nearby sellers holding surplus produce with interested buyers before the produce becomes unusable. Suggested roles are Seller, Buyer and Coordinator.",
    flow:
      "A seller lists produce with quantity, unit, price, location, available-until time and pickup information. A buyer reserves all or part of the available quantity. Confirmed reservations must reduce the remaining stock and expire or cancel correctly. Compatible reservations may be grouped into a common pickup plan.",
    rules:
      "The system must prevent reservation beyond available quantity and keep cancelled quantities accurate. Online payment, real vehicle tracking and food-quality certification are not required.",
    judgeTest:
      "List produce, create partial reservations from two buyers, cancel one and verify the remaining quantity and pickup plan.",
  },
  {
    code: "WEB05",
    category: "web",
    title: "Volunteer Skill and Task Allocation Portal",
    problem:
      "During events, community programmes and emergencies, volunteers may be assigned without considering their skills, availability, preferred time or task location. Develop a portal that records volunteer details and suggests suitable assignments.",
    mvp: [
      "Volunteer profiles",
      "Skills and availability",
      "Task requirements",
      "Suitable volunteer suggestions",
      "Accept or reject assignment",
      "Schedule-conflict prevention",
      "Attendance",
      "Task completion status",
    ],
    goal:
      "Help coordinators assign suitable and available volunteers to tasks. Suggested roles are Volunteer and Coordinator.",
    flow:
      "Volunteers record skills, available time and preferred location. Coordinators create tasks with required skills, time, location and capacity. The system suggests volunteers using clear matching rules, such as skill overlap and availability. Volunteers accept or reject assignments, and coordinators record attendance and completion.",
    rules:
      "Prevent overlapping accepted assignments and assignments beyond task capacity. The system should explain why a volunteer was suggested. Identity checks, professional certification and employment management are not required.",
    
  },
  {
    code: "WEB06",
    category: "web",
    title: "Shared Raw Material Procurement and Cost Coordination Portal",
    problem:
      "Small artisans often purchase bamboo, yarn, clay, dyes, metal and packaging materials individually, resulting in higher prices and repeated transport costs. Develop a platform that combines compatible requirements into shared bulk-purchase requests.",
    mvp: [
      "Artisan requirements",
      "Grouping by material and location",
      "Bulk-purchase request",
      "Supplier quotations",
      "Quotation comparison",
      "Participation confirmation",
      "Individual cost calculation",
      "Pickup assignment",
      "Order tracking",
    ],
    goal:
      "Help nearby artisans combine compatible material needs, compare supplier quotations and understand their individual cost before confirming an order. Suggested roles are Artisan, Supplier and Coordinator.",
    flow:
      "Artisans submit material, specification, quantity, unit, location and required date. Only compatible requirements should be grouped. Suppliers submit quotations containing unit price, transport charge and validity. Participants confirm before the final order, and the system calculates each person’s material cost and fair transport share.",
    rules:
      "If a participant withdraws before confirmation, quantities and cost shares must be recalculated. Online payment, supplier certification and real transport tracking are not required.",
   },
  {
    code: "WEB07",
    category: "web",
    title: "Community Equipment Lending and Booking Portal",
    problem:
      "Institutions and community organisations may own useful equipment, but manual registers can cause booking conflicts, delayed returns and missing condition records. Develop a portal for equipment listing, reservation, issue and return tracking.",
    mvp: [
      "User accounts",
      "Equipment catalogue",
      "Availability search",
      "Booking request",
      "Conflict detection",
      "Approval or rejection",
      "Issue and return record",
      "Condition history",
      "Overdue and maintenance status",
    ],
    goal:
      "Allow users to request shared equipment while coordinators prevent booking conflicts and track every issue and return. Suggested roles are Borrower and Equipment Coordinator.",
    flow:
      "Add equipment with category, location, condition and availability. A borrower requests a date and time. The system checks for an overlapping approved booking before approval. During issue and return, the coordinator records time and item condition. Overdue, damaged or maintenance items must not appear as freely available.",
    rules:
      "One item cannot have overlapping approved bookings. Confirmed history must remain available after return. Online deposits, GPS devices and institutional-system integration are not required.",
    },
  {
    code: "WEB08",
    category: "web",
    title: "Temporary Worker Work, Attendance and Payment Record Portal",
    problem:
      "Daily-wage and temporary workers are often hired through verbal agreements, so assigned work, attendance, rates, advances and payments may not be clearly recorded. Develop a shared record system for workers and employers.",
    mvp: [
      "Worker and employer accounts",
      "Work assignment and agreed rate",
      "Daily or task-based payment",
      "Attendance confirmation",
      "Overtime or extra work",
      "Advances and partial payments",
      "Pending amount calculation",
      "Dispute flag",
      "Complete record history",
    ],
    goal:
      "Create a clear shared record of assigned work, confirmed attendance and payment calculations. Suggested roles are Worker, Employer or Supervisor and Administrator.",
    flow:
      "Record the task, date and agreed daily or task-based rate. The employer records attendance and the worker confirms or disputes it. Add overtime or extra work, advances and partial payments. Show the calculation clearly: earned amount plus approved extra work, minus advances and completed payments, equals the pending amount.",
    rules:
      "Confirmed records must not be silently changed. Both sides should see the same history. This is a record-keeping tool, not a payment service, payroll system or legal dispute authority.",
    },
  {
    code: "ML01",
    category: "ml",
    title: "Multilingual Scam Message Analysis",
    problem:
      "Scam messages may combine English, Assamese, Hindi and informal spellings, which makes them difficult to identify using simple keyword rules. Develop a machine-learning system that analyses a submitted message and estimates its scam risk.",
    mvp: [
      "Risk classification",
      "Suspicious phrase highlighting",
      "Confidence score",
      "Simple result explanation",
      "Text input interface",
      "Evaluation using suitable classification metrics",
    ],
    goal:
      "A user pastes a message and receives a risk category such as Low Risk, Suspicious or High Risk.",
    flow:
      "The model should handle at least English and one additional supported language or commonly used mixed-language text. The team must use a labelled public dataset, explain text cleaning and evaluate the model using precision, recall and F1-score. Suspicious words or phrases should be highlighted where possible.",
    rules:
      "The result is a warning, not proof that the sender is a criminal. An external AI API alone is not sufficient.",
    },
  {
    code: "ML02",
    category: "ml",
    title: "Road Damage Severity Classification",
    problem:
      "Field teams need a faster method of sorting road-damage photographs according to visible severity. Develop an image-based machine-learning system that classifies uploaded road images into defined damage categories.",
    mvp: [
      "Road-image upload",
      "Image classification",
      "Defined severity levels",
      "Confidence score",
      "Invalid-image handling",
      "Manual correction",
      "Model evaluation",
    ],
    goal:
      "A user uploads a road photograph and receives a damage category such as No Visible Damage, Minor, Moderate or Severe. Teams may use different labels when those labels are clearly defined from their dataset.",
    flow:
      "Use a public labelled road-damage dataset, prepare the images, train or fine-tune a suitable model and report evaluation results. Provide a confidence score and allow an authorised user to correct a wrong result. Non-road or unclear images must be handled properly.",
    rules:
      "The model classifies visible damage only. It must not claim that a road or structure is officially safe or unsafe.",
    },
  {
    code: "ML03",
    category: "ml",
    title: "Produce Quality Grading",
    problem:
      "Farmers and sellers need a simple method of sorting fruit produce according to visible quality before sale. Develop an image-based machine-learning system that grades uploaded produce photographs using clearly defined visual categories.",
    mvp: [
      "Produce-image upload",
      "Visible quality category",
      "Confidence score",
      "Rejected-image handling",
      "Manual correction",
      "Model evaluation",
      "Batch or result summary",
    ],
    goal:
      "A seller uploads a produce photograph and receives a visible quality category such as Good, Acceptable or Damaged. A team may focus on one produce type if its dataset is sufficient and the chosen scope is clearly stated.",
    flow:
      "Use a labelled public dataset, explain image preparation and report model performance. The interface should show the predicted grade, confidence and a simple description of that grade. It should reject unrelated or unusable images where possible.",
    rules:
      "The system judges visible appearance only. It cannot certify internal freshness, taste, chemical safety or fitness for consumption.",
    },
  {
    code: "ML04",
    category: "ml",
    title: "Complaint Classification and Routing",
    problem:
      "Public complaints may be sent to the wrong department because they are manually categorised, and citizens may not know which department should receive them. Develop a text-classification system that suggests the complaint category, responsible department and urgency level.",
    mvp: [
      "Complaint-text input",
      "Complaint category",
      "Department suggestion",
      "Urgency level",
      "Confidence score",
      "Manual correction",
      "Model evaluation",
    ],
    goal:
      "A user enters a complaint and the system suggests where it should be sent. Teams must define a clear department list, such as Roads, Water, Electricity, Sanitation or Public Safety, based on the selected dataset.",
    flow:
      "Train and evaluate a text-classification model using labelled complaint data. Show the suggested category, department, urgency and confidence. Allow manual correction so incorrectly routed complaints can be reviewed.",
    rules:
      "The output is a routing suggestion, not an official decision. A chatbot or external AI API without dataset preparation and model evaluation is not sufficient.",
    },
  {
    code: "ML05",
    category: "ml",
    title: "Notice Information Extraction",
    problem:
      "People repeatedly check official websites for notices and may miss important dates or requirements. Develop a machine-learning system that extracts important information from public notices and presents it in a short, structured form.",
    mvp: [
      "Notice text, PDF or image input",
      "Title and issuing authority",
      "Important dates",
      "Eligibility or intended audience",
      "Required documents",
      "Short summary",
      "Source-text reference",
      "Interest-based notice list or alert simulation",
    ],
    goal:
      "A user supplies notice text, a public PDF or a clear notice image. The system extracts fields such as title, issuing authority, intended audience, eligibility, required documents, important dates, contact details and source link. It should also create a short summary and preserve the original source text for checking.",
    flow:
      "Teams must test extraction quality on several notices and clearly show missing fields instead of inventing values. OCR may be used for images or scanned PDFs. Interest selection and an in-app alert simulation may be added, but real push-notification delivery is not required.",
    rules:
      "The original notice remains the final reference. Restricted-site scraping is not required.",
    },
  {
    code: "ML06",
    category: "ml",
    title: "Waste Material Classification for Better Segregation",
    problem:
      "Waste is often mixed because people may not correctly identify whether an item is recyclable, organic, electronic, hazardous or general waste. Develop an image-based system that classifies uploaded waste photographs and gives a suitable disposal instruction.",
    mvp: [
      "Public waste-image dataset",
      "Image preparation and augmentation",
      "At least four waste categories",
      "Image upload or camera input",
      "Confidence score",
      "Unclear-image handling",
      "Disposal instruction",
      "Confusion matrix",
      "Prediction summary",
    ],
    goal:
      "A user uploads a waste photograph and receives one of at least four clearly defined categories. The interface should also display a simple disposal instruction linked to the predicted category.",
    flow:
      "Use a public labelled dataset, explain image preparation, train or fine-tune a model and report evaluation results including a confusion matrix. Display confidence and return Uncertain when an image is unclear or unsupported rather than forcing a result. Disposal instructions may be rule-based after classification.",
    rules:
      "The system must not claim to certify hazardous material or replace local waste-handling instructions.",
    },
  {
    code: "ML07",
    category: "ml",
    title: "Student Academic Support Risk Classification",
    problem:
      "Low attendance, falling marks and incomplete assignments may indicate that a student requires additional academic support. Develop a machine-learning system that classifies students into support-priority categories using academic and attendance records.",
    mvp: [
      "Public student-performance dataset",
      "Data cleaning",
      "Support-priority prediction",
      "Model comparison",
      "Important contributing factors",
      "Evaluation metrics",
      "Manual record input",
      "Support dashboard",
    ],
    goal:
      "The system should identify records that may require academic support and classify them into categories such as Regular Monitoring, Support Recommended or Immediate Review.",
    flow:
      "Use an anonymised public dataset containing academic indicators such as attendance, marks, assignment completion or study-related factors. Explain data cleaning, compare suitable models and show the major factors connected with each result. The user should be able to enter a sample record and view the predicted support priority.",
    rules:
      "The prediction must not punish students, determine admission, remove a student or make an automatic academic decision. Avoid unnecessary personal attributes.",
    },
  {
    code: "ML08",
    category: "ml",
    title: "Solar Power Generation Forecasting",
    problem:
      "Solar-power production changes according to sunlight, temperature, cloud cover, season and time. Develop a machine-learning system that uses historical generation and weather data to estimate future solar-power output.",
    mvp: [
      "Historical solar-generation dataset",
      "Weather and time preprocessing",
      "Hourly or daily forecast",
      "Actual versus predicted comparison",
      "MAE or RMSE",
      "Low-generation warning",
      "Forecast dashboard",
    ],
    goal:
      "Predict solar-power generation for a clearly stated future period, such as the next hour or next day, using previous generation values and available weather or time features.",
    flow:
      "Use a public time-based dataset, explain preprocessing and split training and testing data by time so future records are not used to predict the past. Compare predicted values with actual values and report MAE or RMSE. Show a graph and a simple low-generation warning.",
    rules:
      "The result is an estimate and must not control electrical equipment or claim guaranteed generation.",
    judgeTest:
      "Provide a recent sequence of records, generate a forecast and compare it with held-out actual values.",
  },
];

export const categoryDetails = {
  web: {
    label: "Web Development",
    shortLabel: "Web",
    description: "Build a complete working portal with clear roles, stored data and a usable end-to-end flow.",
  },
  ml: {
    label: "Machine Learning",
    shortLabel: "ML",
    description: "Prepare a public dataset, train and evaluate a model, and present predictions through a working interface.",
  },
};
