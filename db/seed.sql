insert into patients (
  first_name,
  last_name,
  date_of_birth,
  gender,
  phone,
  email,
  address,
  condition,
  status,
  last_visit,
  notes
) values
  (
    'Anaya',
    'Sharma',
    '1991-08-14',
    'Female',
    '+91 98765 43210',
    'anaya.sharma@example.com',
    'Sector 21, Gurgaon',
    'Asthma follow-up',
    'Monitoring',
    '2026-03-28',
    'Inhaler adherence improving. Review again in two weeks.'
  ),
  (
    'Rohan',
    'Menon',
    '1984-01-09',
    'Male',
    '+91 91234 56780',
    'rohan.menon@example.com',
    'Koramangala, Bengaluru',
    'Post-operative check',
    'Active',
    '2026-04-05',
    'Wound healing well. Continue reduced activity.'
  ),
  (
    'Mira',
    'Patel',
    '1978-11-22',
    'Female',
    '+91 99887 66554',
    'mira.patel@example.com',
    'Navrangpura, Ahmedabad',
    'Hypertension review',
    'Discharged',
    '2026-02-18',
    'Blood pressure stable across the last three visits.'
  );
