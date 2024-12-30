export const mockUsers = [
  {
    id: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
    email: "abebe@example.com",
    displayName: "Abebe Kebede",
    photoURL: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    bio: "Emergency response coordinator in Addis Ababa | Helping communities stay safe",
    skills: ["First Aid", "Emergency Management", "Communication"],
    workHistory: [
      {
        company: "Addis Emergency Services",
        position: "Senior Coordinator",
        period: "2020-Present"
      }
    ],
    friends: 342,
    location: "Addis Ababa, Ethiopia"
  },
  {
    id: "2",
    email: "tigist@example.com",
    displayName: "Tigist Haile",
    photoURL: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bio: "Medical first responder | Always ready to help",
    skills: ["Medical Care", "Ambulance Operation", "Crisis Management"],
    workHistory: [
      {
        company: "St. Paul's Hospital",
        position: "Emergency Responder",
        period: "2019-Present"
      }
    ],
    friends: 523,
    location: "Addis Ababa, Ethiopia"
  },
  {
    id: "3",
    email: "dawit@example.com",
    displayName: "Dawit Mengistu",
    photoURL: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    bio: "Fire safety expert | Training communities in emergency preparedness",
    skills: ["Fire Fighting", "Rescue Operations", "Safety Training"],
    workHistory: [
      {
        company: "Addis Fire Department",
        position: "Fire Safety Officer",
        period: "2018-Present"
      }
    ],
    friends: 289,
    location: "Addis Ababa, Ethiopia"
  }
];

export const mockMessages = {
  "8P1QYUvU1FNyxJb5K3JM3BzoR213": [
    {
      id: "m1",
      senderId: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
      receiverId: "2",
      content: "Hello! I'm available for emergency coordination.",
      timestamp: new Date("2024-02-20T10:00:00").getTime()
    },
    {
      id: "m2",
      senderId: "2",
      receiverId: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
      content: "Great! What's your availability this week?",
      timestamp: new Date("2024-02-20T10:05:00").getTime()
    }
  ],
  "2": [
    {
      id: "m3",
      senderId: "2",
      receiverId: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
      content: "I'm on call for medical emergencies today.",
      timestamp: new Date("2024-02-20T09:00:00").getTime()
    }
  ],
  "3": [
    {
      id: "m4",
      senderId: "3",
      receiverId: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
      content: "Do you provide fire safety training?",
      timestamp: new Date("2024-02-19T15:00:00").getTime()
    },
    {
      id: "m5",
      senderId: "8P1QYUvU1FNyxJb5K3JM3BzoR213",
      receiverId: "3",
      content: "Yes, we offer comprehensive training programs.",
      timestamp: new Date("2024-02-19T15:30:00").getTime()
    }
  ]
};