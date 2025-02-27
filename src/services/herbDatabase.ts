export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  bloodTypeCompatibility: {
    A: 'beneficial' | 'neutral' | 'avoid';
    B: 'beneficial' | 'neutral' | 'avoid';
    AB: 'beneficial' | 'neutral' | 'avoid';
    O: 'beneficial' | 'neutral' | 'avoid';
  };
  healingProperties: string[];
  dosage: string;
  precautions?: string[];
}

const herbsData: Herb[] = [
  {
    id: '1',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description: 'A powerful anti-inflammatory herb with numerous health benefits.',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    healingProperties: [
      'Anti-inflammatory',
      'Antioxidant',
      'Supports joint health',
      'Aids digestion'
    ],
    dosage: '500-2000mg daily'
  },
  {
    id: '2',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description: 'Traditional herb used for digestive support and inflammation.',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'beneficial',
      AB: 'beneficial',
      O: 'beneficial'
    },
    healingProperties: [
      'Anti-nausea',
      'Digestive aid',
      'Anti-inflammatory',
      'Immune support'
    ],
    dosage: '1-3g daily'
  },
  {
    id: '3',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    description: 'Immune-boosting herb commonly used for cold and flu prevention.',
    bloodTypeCompatibility: {
      A: 'beneficial',
      B: 'neutral',
      AB: 'neutral',
      O: 'beneficial'
    },
    healingProperties: [
      'Immune system support',
      'Anti-viral',
      'Anti-bacterial'
    ],
    dosage: '300-500mg 3x daily'
  }
];

export const getHerbs = (): Promise<Herb[]> => {
  return Promise.resolve(herbsData);
};

export const searchHerbs = (query: string): Promise<Herb[]> => {
  const lowercaseQuery = query.toLowerCase();
  const filteredHerbs = herbsData.filter(herb => 
    herb.name.toLowerCase().includes(lowercaseQuery) ||
    herb.scientificName.toLowerCase().includes(lowercaseQuery) ||
    herb.description.toLowerCase().includes(lowercaseQuery)
  );
  return Promise.resolve(filteredHerbs);
};

export const getHerbById = (id: string): Promise<Herb | undefined> => {
  const herb = herbsData.find(h => h.id === id);
  return Promise.resolve(herb);
};

export const getHerbsByBloodType = (bloodType: 'A' | 'B' | 'AB' | 'O'): Promise<Herb[]> => {
  const compatibleHerbs = herbsData.filter(herb => 
    herb.bloodTypeCompatibility[bloodType] === 'beneficial'
  );
  return Promise.resolve(compatibleHerbs);
}; 