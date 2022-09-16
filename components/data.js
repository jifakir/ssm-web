export const titles = {
    title: 'Title(s) ?',
    name: 'titles',
    required: true,
    options: [
        {
            label: 'Ph.D.',
            value: 'phd'
        },
        {
            label: 'Psy.D.',
            value: 'psyd'
        },
        {
            label: 'M.A.',
            value: 'ma'
        },
        {
            label: 'M.S.',
            value: 'ms'
        },
        {
            label: 'M.S.W.',
            value: 'msw'
        },
        {
            label: 'M.D.',
            value: 'md'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};

export const sexual_orientation = {
    name: 'sexual_orientation',
    required: true,
    options: [
        {
            label: 'Straight',
            value: 'straight'
        },
        {
            label: 'Lesbian',
            value: 'lesbian'
        },
        {
            label: 'Gay',
            value: 'gay'
        },
        {
            label: 'Bi-Sexual',
            value: 'Assexual'
        },
        {
            label: 'Pansexual',
            value: 'pansexual'
        },
        {
            label: 'Prefer not to answer',
            value: 'not_prefer'
        },
    ]
};


export const gender = {
    name: 'gender',
    options: [
        {
            label: 'Male',
            value: 'male'
        },
        {
            label: 'Female',
            value: 'female'
        },
        {
            label: 'Transgender Male',
            value: 'trans_male'
        },
        {
            label: 'Transgender Female',
            value: 'trans_female'
        },
        {
            label: 'Prefer not to say',
            value: 'not_preferred'
        },
    ]
};

export const personality = [
    {
        title: 'Mind (select one)',
        name: 'mind',
        options: [
            {
                label: 'Introvert',
                value: 'introvert'
            },
            {
                label: 'Extrovert',
                value: 'extrovert'
            },
        ]
    },
    {
        title: 'Energy (select one)',
        name: 'energy',
        options: [
            {
                label: 'Observant',
                value: 'observant'
            },
            {
                label: 'Intuitive',
                value: 'intuitive'
            },
        ]
    },
    {
        title: 'Nature (select one)',
        name: 'nature',
        options: [
            {
                label: 'Feeling',
                value: 'feeling'
            },
            {
                label: 'Thinking',
                value: 'thinking'
            },
        ]
    },
    {
        title: 'Tactics (select one)',
        name: 'tactics',
        options: [
            {
                label: 'Judging',
                value: 'judgin'
            },
            {
                label: 'Prospecting',
                value: 'prospecting'
            },
        ]
    },
    {
        title: 'Identity (select one)',
        name: 'identity',
        options: [
            {
                label: 'Assertive',
                value: 'assertive'
            },
            {
                label: 'Turbulent',
                value: 'turbulent'
            },
        ]
    },
];

export const age_preference = {
    name: 'age_preference',
    options: [
        {
            label: '26-30 years',
            value: '26-30'
        },
        {
            label: '31-35 years',
            value: '31-35'
        },
        {
            label: '36-40 years',
            value: '36-40'
        },
        {
            label: '41-45 years',
            value: '41-45'
        },
        {
            label: '46-50 years',
            value: '46-50'
        },
        {
            label: '51-55 years',
            value: '51-55'
        },
        {
            label: '56+years',
            value: '56+'
        },
    ]
};

export const is_religion_biased = {
    name: 'is_religion_biased',
    options: [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

export const is_spiritual_biased = {
    name: 'is_spiritual_biased',
    options: [
        {
            label: 'Yes',
            value: true
        },
        {
            label: 'No',
            value: false
        },
    ]
};

export const session_type = {
    name: 'session_type',
    options: [
        {
            label: 'Virtual',
            value: 'virtual'
        },
        {
            label: 'In-person',
            value: 'in_person'
        },
        {
            label: 'No preference',
            value: 'not_prefer'
        },
    ]
};

export const specific_concerns = {
    name: 'specific_concerns',
    options: [
        {
            label: 'Changes in my behavior',
            value: 'Changes in my behaviour '
        },
        {
            label: 'Life events',
            value: 'Life events'
        },
        {
            label: 'Potential or diagnosed disorder',
            value: 'Potential or diagnosed disorder'
        },
        {
            label: 'Relationship issues',
            value: 'Relationship issues'
        },
        {
            label: 'Life goals',
            value: 'Life goals'
        },
        {
            label: 'Prefer not to say',
            value: 'Prefer not to say'
        },
    ]
};

export const therapy_specializations = {
    name: 'therapy_specializations',
    options: [
        {
            label: 'Psychodynamic therapy',
            value: 'psychodynamictherapy'
        },
        {
            label: 'Cognitive behavioral therapy',
            value: 'Cognitive behavioral therapy'
        },
        {
            label: 'Behavioral therapy',
            value: 'Behavioral therapy'
        },
        {
            label: 'Humanistic therapy',
            value: 'Humanistic therapy'
        },
        {
            label: 'Substance abuse counseling',
            value: 'Substance abuse counseling'
        },
        {
            label: 'Emotion-Focused Therapy (EFT)',
            value: 'Not applicable'
        },
        {
            label: 'Prefer not to say',
            value: 'not_preferred'
        },
    ]
};

export const race_preference = {
    
    name: 'race_preference',
    options: [
        {
            label: 'Black/African descent',
            value: 'black'
        },
        {
            label: 'Asian',
            value: 'asian'
        },
        {
            label: 'Hispanic',
            value: 'hispanic'
        },
        {
            label: 'White',
            value: 'white'
        },
        {
            label: 'Other',
            value: 'other'
        },
    ]
};

export const week = [
    {
        label: 'Monday',
        value: 'monday'
    },
    {
        label: 'Tuesday',
        value: 'tuesday'
    },
    {
        label: 'Wednesday',
        value: 'wednesday'
    },
    {
        label: 'Thursday',
        value: 'thursday'
    },
    {
        label: 'Friday',
        value: 'friday'
    },
    {
        label: 'Saturday',
        value: 'saturday'
    },
    {
        label: 'Sunday',
        value: 'sunday'
    },
]

export const pmTime = [
    {
        label: '01:00 PM',
        value: '01:00pm',
    },
    {
        label: '01:30 PM',
        value: '01:30pm',
    },
    {
        label: '02:00 PM',
        value: '02:00pm',
    },
    {
        label: '02:30 PM',
        value: '02:30pm',
    },
    {
        label: '03:00 PM',
        value: '03:00pm',
    },
    {
        label: '03:30 PM',
        value: '03:30pm',
    },
    {
        label: '04:00 PM',
        value: '04:00pm',
    },
    {
        label: '04:30 PM',
        value: '04:30pm',
    },
    {
        label: '05:00 PM',
        value: '05:00pm',
    },
    {
        label: '05:30 PM',
        value: '05:30pm',
    },
    {
        label: '06:00 PM',
        value: '06:00pm',
    },
    {
        label: '06:30 PM',
        value: '06:30pm',
    },
    {
        label: '07:00 PM',
        value: '07:00pm',
    },
    {
        label: '07:30 PM',
        value: '07:30pm',
    },
    {
        label: '08:00 PM',
        value: '08:00pm',
    },
    {
        label: '08:30 PM',
        value: '08:30pm',
    },
    {
        label: '09:00 PM',
        value: '09:00pm',
    },
    {
        label: '09:30 PM',
        value: '09:30pm',
    },
    {
        label: '10:00 PM',
        value: '10:00pm',
    },
    {
        label: '10:30 PM',
        value: '10:30pm',
    },
    {
        label: '11:30 PM',
        value: '11:30pm',
    },
    {
        label: '12:00 PM',
        value: '12:00pm',
    },
    {
        label: '12:30 PM',
        value: '12:30pm',
    },
];


export const amTime = [
    {
        label: '01:00 AM',
        value: '01:00am',
    },
    {
        label: '01:30 AM',
        value: '01:30am',
    },
    {
        label: '02:00 AM',
        value: '02:00am',
    },
    {
        label: '02:30 AM',
        value: '02:30am',
    },
    {
        label: '03:00 AM',
        value: '03:00am',
    },
    {
        label: '03:30 AM',
        value: '03:30am',
    },
    {
        label: '04:00 AM',
        value: '04:00am',
    },
    {
        label: '04:30 AM',
        value: '04:30am',
    },
    {
        label: '05:00 AM',
        value: '05:00am',
    },
    {
        label: '05:30 AM',
        value: '05:30am',
    },
    {
        label: '06:00 AM',
        value: '06:00am',
    },
    {
        label: '06:30 AM',
        value: '06:30am',
    },
    {
        label: '07:00 AM',
        value: '07:00am',
    },
    {
        label: '07:30 AM',
        value: '07:30am',
    },
    {
        label: '08:00 AM',
        value: '08:00am',
    },
    {
        label: '08:30 AM',
        value: '08:30am',
    },
    {
        label: '09:00 AM',
        value: '09:00am',
    },
    {
        label: '09:30 AM',
        value: '09:30am',
    },
    {
        label: '10:00 AM',
        value: '10:00am',
    },
    {
        label: '10:30 AM',
        value: '10:30am',
    },
    {
        label: '11:00 AM',
        value: '11:00am',
    },
    {
        label: '11:30 AM',
        value: '11:30am',
    },
    {
        label: '12:00 AM',
        value: '12:00am',
    },
    {
        label: '12:30 AM',
        value: '12:30am',
    },
];