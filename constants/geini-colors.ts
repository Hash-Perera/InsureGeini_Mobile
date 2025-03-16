import { MaterialIcons } from "@expo/vector-icons";

const statusColors: Record<string, { text: string; bg: string }> = {
  Pending: { text: "text-gray", bg: "bg-yellow-200" },
  Approved: { text: "text-black", bg: "bg-green-200" },
  Rejected: { text: "text-white", bg: "bg-red-200" },
  InProgress: { text: "text-white", bg: "bg-blue-200" },
  "Fraud Detected": { text: "text-gray", bg: "bg-yellow-200" },
};

const insuranceIcons: (keyof typeof MaterialIcons.glyphMap)[] = [
  "directions-car", // 🚗 Car icon
  "airport-shuttle", // 🚌 Shuttle / Van
  "two-wheeler", // 🏍 Motorcycle
  "local-taxi", // 🚕 Taxi
  "directions-bus", // 🚌 Bus
  "commute", // 🚎 Public Transport
  "assignment", // 📄 Insurance Claims
  "article", // 📑 Policy Document
  "fact-check", // ✅ Verification
  "verified-user", // 🛡 Insurance Protection
  "local-police", // 🚔 Police Report
  "description", // 📜 Document/Claim
  "attach-file", // 📎 File Attachment
  "engineering", // 🔧 Car Repair / Mechanic
  "build", // 🔨 Workshop / Repair
  "support-agent", // 🎧 Customer Support
  "history", // 📜 Claim History
  "handyman", // 🛠 Fix/Mechanic
  "report-problem", // ⚠️ Accident Report
  "car-repair", // 🚘 Vehicle Repair
];

export { statusColors, insuranceIcons };
