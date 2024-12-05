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
    name: 'Terry Boal',
  },
];

export const StatusIcon: { [key: string]: string } = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};
