export const patientProfile = {
  name: "Ananya Sharma",
  id: "VIORA-2418-9021",
  age: 29,
  gender: "Female",
  bloodGroup: "O+",
  email: "ananya.sharma@viora.health",
  phone: "+91 98102 44119",
  avatar: "AS",
  healthScore: 87,
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Mild Asthma"],
};

export const doctorProfile = {
  name: "Dr. Rohan Verma",
  hospital: "Aurora Medical Center",
  specialty: "Cardiology",
  id: "MED-VRM-2019",
  avatar: "RV",
  patientsToday: 14,
  rating: 4.9,
};

export const vitals = [
  { label: "Heart Rate", value: "72", unit: "bpm", trend: "+2%", color: "viora-pink" },
  { label: "Steps", value: "8,412", unit: "today", trend: "+12%", color: "viora-blue" },
  { label: "Sleep", value: "7h 24m", unit: "last night", trend: "+8%", color: "viora-purple" },
  { label: "Calories", value: "2,140", unit: "kcal", trend: "-3%", color: "viora-amber" },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", trend: "stable", color: "viora-green" },
  { label: "Blood Sugar", value: "94", unit: "mg/dL", trend: "stable", color: "viora-blue" },
];

export const heartRateData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  bpm: 60 + Math.round(Math.sin(i / 3) * 8 + Math.random() * 6 + (i > 8 && i < 20 ? 10 : 0)),
}));

export const stepsData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  steps: 4000 + Math.round(Math.random() * 8000),
}));

export const medicines = [
  { name: "Montelukast 10mg", time: "8:00 AM", taken: true, type: "Tablet" },
  { name: "Vitamin D3", time: "9:00 AM", taken: true, type: "Capsule" },
  { name: "Salbutamol Inhaler", time: "1:00 PM", taken: false, type: "Inhaler" },
  { name: "Omega-3", time: "8:00 PM", taken: false, type: "Softgel" },
  { name: "Melatonin 3mg", time: "10:30 PM", taken: false, type: "Tablet" },
];

export const appointments = [
  { doctor: "Dr. Rohan Verma", specialty: "Cardiology", date: "Tue, 19 Nov", time: "10:30 AM", mode: "In-person", hospital: "Aurora Medical Center" },
  { doctor: "Dr. Priya Kaul", specialty: "Pulmonology", date: "Fri, 22 Nov", time: "2:15 PM", mode: "Video", hospital: "Viora Cloud Clinic" },
  { doctor: "Dr. Ahmed Iqbal", specialty: "Dermatology", date: "Mon, 25 Nov", time: "5:00 PM", mode: "Video", hospital: "Viora Cloud Clinic" },
];

export const records = [
  { title: "Complete Blood Count", type: "Lab Report", date: "12 Nov 2025", source: "Metropolis Labs", tag: "Normal" },
  { title: "Chest X-Ray", type: "Radiology", date: "08 Nov 2025", source: "Aurora Medical", tag: "Reviewed" },
  { title: "Lipid Profile", type: "Lab Report", date: "02 Nov 2025", source: "Thyrocare", tag: "Attention" },
  { title: "Prescription — Dr. Verma", type: "Prescription", date: "28 Oct 2025", source: "Aurora Medical", tag: "Active" },
  { title: "MRI Brain", type: "Radiology", date: "14 Oct 2025", source: "Apollo Diagnostics", tag: "Normal" },
  { title: "HbA1c", type: "Lab Report", date: "01 Oct 2025", source: "Metropolis Labs", tag: "Normal" },
];

export const timeline = [
  { date: "12 Nov 2025", title: "Blood Test Completed", detail: "CBC shows normal values across the board.", type: "lab" },
  { date: "08 Nov 2025", title: "Consulted Dr. Rohan Verma", detail: "Follow-up for palpitations. ECG unremarkable.", type: "visit" },
  { date: "02 Nov 2025", title: "Started Omega-3 supplement", detail: "Recommended for cardiovascular support.", type: "medicine" },
  { date: "22 Oct 2025", title: "Flu vaccination", detail: "Seasonal influenza vaccine administered.", type: "vaccine" },
  { date: "14 Oct 2025", title: "MRI Brain performed", detail: "No abnormalities detected.", type: "lab" },
  { date: "01 Oct 2025", title: "Annual physical", detail: "Overall excellent. Continue current lifestyle.", type: "visit" },
];

export const familyMembers = [
  { name: "Rohit Sharma", relation: "Spouse", age: 32, score: 91, avatar: "RS" },
  { name: "Aarav Sharma", relation: "Son", age: 6, score: 96, avatar: "AS" },
  { name: "Meena Sharma", relation: "Mother", age: 58, score: 74, avatar: "MS" },
];

export const doctors = [
  { name: "Dr. Rohan Verma", specialty: "Cardiology", rating: 4.9, exp: "14y", fee: 1200 },
  { name: "Dr. Priya Kaul", specialty: "Pulmonology", rating: 4.8, exp: "11y", fee: 900 },
  { name: "Dr. Ahmed Iqbal", specialty: "Dermatology", rating: 4.9, exp: "9y", fee: 800 },
  { name: "Dr. Sara Menon", specialty: "Endocrinology", rating: 4.7, exp: "16y", fee: 1500 },
  { name: "Dr. Kabir Nanda", specialty: "General Physician", rating: 4.8, exp: "8y", fee: 600 },
];

export const notifications = [
  { title: "Time for Salbutamol Inhaler", detail: "Scheduled 1:00 PM · take with water", time: "5 min ago", type: "medicine" },
  { title: "Lab report ready", detail: "Lipid Profile from Thyrocare is available.", time: "1 hr ago", type: "lab" },
  { title: "Upcoming appointment", detail: "Dr. Rohan Verma on Tue at 10:30 AM.", time: "3 hr ago", type: "appointment" },
  { title: "Elevated resting heart rate", detail: "Detected 89 bpm at rest. Take a moment to breathe.", time: "Yesterday", type: "alert" },
  { title: "Insurance renewal in 12 days", detail: "Star Health · Policy VH-8823", time: "Yesterday", type: "insurance" },
];

export const wearables = [
  { name: "Apple Health", connected: true, lastSync: "2 min ago" },
  { name: "Google Health Connect", connected: true, lastSync: "8 min ago" },
  { name: "Fitbit", connected: false, lastSync: "—" },
  { name: "Garmin", connected: false, lastSync: "—" },
  { name: "Samsung Health", connected: true, lastSync: "15 min ago" },
];

export const insurance = [
  { provider: "Star Health", policy: "VH-8823", cover: "₹ 10,00,000", renewal: "01 Dec 2025", status: "Active" },
  { provider: "HDFC Ergo", policy: "AC-2044", cover: "₹ 5,00,000", renewal: "22 Mar 2026", status: "Active" },
];

export const patients = [
  { name: "Ananya Sharma", id: "VIORA-2418", age: 29, condition: "Asthma follow-up", risk: "Low", last: "Today" },
  { name: "Vikram Iyer", id: "VIORA-3320", age: 54, condition: "Post-MI monitoring", risk: "High", last: "2 days ago" },
  { name: "Neha Kapoor", id: "VIORA-4109", age: 41, condition: "Hypertension", risk: "Medium", last: "3 days ago" },
  { name: "Rahul Chawla", id: "VIORA-5288", age: 36, condition: "Chest pain workup", risk: "Medium", last: "5 days ago" },
  { name: "Divya Rao", id: "VIORA-6142", age: 62, condition: "Arrhythmia", risk: "High", last: "1 week ago" },
  { name: "Sanjay Bhat", id: "VIORA-7053", age: 48, condition: "Annual checkup", risk: "Low", last: "1 week ago" },
  { name: "Aditi Menon", id: "VIORA-7788", age: 33, condition: "Palpitations", risk: "Low", last: "2 weeks ago" },
];

export const aiInsights = [
  { title: "Sleep quality trending up", detail: "Deep sleep improved by 18% over the last 2 weeks. Keep the wind-down routine.", tag: "Lifestyle" },
  { title: "Consider a vitamin B12 test", detail: "Based on your recent fatigue reports and diet log.", tag: "Preventive" },
  { title: "Hydration below target", detail: "You've averaged 1.4 L/day. Try 2.2 L for your bodyweight.", tag: "Wellness" },
  { title: "Cardio risk profile: Excellent", detail: "Your lipid, BP and heart-rate variability trend favorably.", tag: "Cardio" },
];
