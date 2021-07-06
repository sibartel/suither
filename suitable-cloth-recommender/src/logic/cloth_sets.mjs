export let cloth_sets = [
  {
    description: 'Walking shorts, short-sleeved shirt',
    category: ['sport', 'casual'],
    insulation: 0.36,
    file_identifier: 'shortshort'
  },
  {
    description: 'Walking shorts, short-sleeved shirt plus long-sleeve sweater',
    category: ['sport', 'casual'],
    insulation: 0.36,
    file_identifier: 'shortsweater',
    variants: [
      {
        description: 'sweater on',
        insulation: 0.61
      }
    ],
  },
  {
    description: 'Walking shorts, long-sleeved shirt',
    category: ['sport', 'casual'],
    insulation: 0.40,
    file_identifier: 'shortlong',
  },
  {
    description: 'Trousers, short-sleeved shirt',
    category: ['sport', 'casual'],
    insulation: 0.57,
    file_identifier: 'longshort'
  },
  {
    description: 'Trousers, short-sleeved shirt plus sweater',
    category: ['sport', 'casual'],
    insulation: 0.57,
    file_identifier: 'longsweater',
    variants: [
      {
        description: 'sweater on',
        insulation: 0.82
      }
    ],
  },
  {
    description: 'Trousers, short-sleeved shirt plus jacket',
    category: ['sport', 'casual'],
    insulation: 0.57,
    file_identifier: 'longjacket',
    variants: [
      {
        description: 'jacket on',
        insulation: 0.92,
        waterproof: true
      }
    ],
  },
  {
    description: 'Trousers, long-sleeved shirt',
    category: ['sport', 'casual'],
    insulation: 0.61,
    file_identifier: 'trouserslong'
  },
  {
    description: 'Trousers, long-sleeved shirt plus sweater',
    category: ['sport', 'casual'],
    insulation: 0.61,
    file_identifier: 'longlongsweater',
    variants: [
      {
        description: 'sweater on',
        insulation: 0.86
      }
    ],
  },
  {
    description: 'Trousers, long-sleeved shirt plus jacket',
    category: ['sport', 'casual'],
    insulation: 0.61,
    file_identifier: 'trouserslongjacket',
    variants: [
      {
        description: 'jacket on',
        insulation: 0.96,
        waterproof: true
      }
    ]
  },
  {
    description: 'Trousers, long-sleeved shirt, long-sleeved sweater, T-shirt',
    category: ['casual'],
    insulation: 1.01,
    file_identifier: 'trouserslonglong'
  },
]
