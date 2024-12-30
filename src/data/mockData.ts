export const mockUsers = [
  {
    id: "1",
    email: "abebe@example.com",
    displayName: "Abebe Kebede",
    photoURL: "/placeholder.svg",
    bio: "Emergency response coordinator in Addis Ababa",
    skills: ["First Aid", "Emergency Management", "Communication"],
    workHistory: [
      {
        company: "Addis Emergency Services",
        position: "Senior Coordinator",
        period: "2020-Present"
      }
    ]
  },
  {
    id: "2",
    email: "tigist@example.com",
    displayName: "Tigist Haile",
    photoURL: "/placeholder.svg",
    bio: "Medical first responder",
    skills: ["Medical Care", "Ambulance Operation", "Crisis Management"],
    workHistory: [
      {
        company: "St. Paul's Hospital",
        position: "Emergency Responder",
        period: "2019-Present"
      }
    ]
  },
  {
    id: "3",
    email: "dawit@example.com",
    displayName: "Dawit Mengistu",
    photoURL: "/placeholder.svg",
    bio: "Fire safety expert",
    skills: ["Fire Fighting", "Rescue Operations", "Safety Training"],
    workHistory: [
      {
        company: "Addis Fire Department",
        position: "Fire Safety Officer",
        period: "2018-Present"
      }
    ]
  }
];

export const mockMessages = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      receiverId: "current",
      content: "Hello! I'm available for emergency coordination.",
      timestamp: new Date("2024-02-20T10:00:00").getTime()
    },
    {
      id: "m2",
      senderId: "current",
      receiverId: "1",
      content: "Great! What's your availability this week?",
      timestamp: new Date("2024-02-20T10:05:00").getTime()
    }
  ],
  "2": [
    {
      id: "m3",
      senderId: "2",
      receiverId: "current",
      content: "I'm on call for medical emergencies today.",
      timestamp: new Date("2024-02-20T09:00:00").getTime()
    }
  ],
  "3": [
    {
      id: "m4",
      senderId: "current",
      receiverId: "3",
      content: "Do you provide fire safety training?",
      timestamp: new Date("2024-02-19T15:00:00").getTime()
    },
    {
      id: "m5",
      senderId: "3",
      receiverId: "current",
      content: "Yes, we offer comprehensive training programs.",
      timestamp: new Date("2024-02-19T15:30:00").getTime()
    }
  ]
};