export const GenderOptions: string[] = ['male', 'female', 'other'];

export const IdentificationTypes: string[] = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

/*Dr Ova Ree, Dr L. Bow  , Dr D. Livery, */

export const Doctors: { image: string; name: string }[] = [
  {
    image: '/assets/images/dr-m-01.png',
    name: 'Ben Dover',
  },
  {
    image: '/assets/images/dr-f-01.png',
    name: 'Tess Tickl',
  },
  {
    image: '/assets/images/dr-m-02.png',
    name: 'Sal Ami',
  },
  {
    image: '/assets/images/dr-m-03.png',
    name: 'Seymour Butts',
  },
  {
    image: '/assets/images/dr-f-02.png',
    name: 'Ophelia Payne',
  },
  {
    image: '/assets/images/dr-m-04.png',
    name: 'Moe Lester',
  },
  {
    image: '/assets/images/dr-f-03.png',
    name: 'Lou Naticly',
  },
  {
    image: '/assets/images/dr-f-04.png',
    name: 'Sue Flay',
  },
  {
    image: '/assets/images/dr-m-05.png',
    name: 'Terry Boyle',
  },
];

export const buttonLabels = {
  cancel: 'Cancel Appointment',
  schedule: 'Schedule Appointment',
  create: 'Submit Appointment',
  default: 'Submit Appointment',
};

export const StatusIcon: { [key: string]: string } = {
  total: '/assets/icons/calendar.svg',
  scheduled: '/assets/icons/appointments.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};

export const statusObj: { [key: string]: StatusType | 'all' } = {
  cancel: 'cancelled',
  schedule: 'scheduled',
  create: 'pending',
  default: 'pending',
  total: 'all',
};
//----------------
export const confirmMsg = {
  original: 'Your appointment has been confirmed for ',
  option1: 'Your appointment is confirmed for ',
  option2: 'Your appointment has been successfully scheduled for ',
  option3: 'We have scheduled your appointment for ',
  option4: 'Your booking is confirmed for ',
  option5: 'Your appointment has been set for ',
};

export const cancelMsg = {
  original: 'This is to inform that your appointment for ',
  option1: 'We would like to inform you that your appointment for ',
  option2: 'This is to notify you that your appointment for ',
  option3: 'We are reaching out to confirm your appointment for ',
  option4: 'Please be advised that your appointment for ',
  option5: 'We are writing to let you know that your appointment for ',
};
