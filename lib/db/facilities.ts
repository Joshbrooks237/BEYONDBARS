/**
 * California CDCR Prisons and Juvenile Facilities
 * This is a curated list of facilities with their rules and capabilities
 */

import { Facility } from './schema'

export const californiaFacilities: Omit<Facility, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // CDCR State Prisons
  {
    name: 'California State Prison, Los Angeles County (Lancaster)',
    type: 'prison',
    address: '44750 60th Street West',
    city: 'Lancaster',
    state: 'CA',
    zipCode: '93536',
    county: 'Los Angeles',
    phone: '(661) 729-2000',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 2000,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content'
    ],
    requiresApproval: true,
    approvalTimeHours: 48,
    maxTransactionAmount: 50000, // $500 in cents
    minTransactionAmount: 500, // $5 in cents
    commissaryFeePercent: 3.5,
  },
  {
    name: 'San Quentin State Prison',
    type: 'prison',
    address: 'San Quentin',
    city: 'San Quentin',
    state: 'CA',
    zipCode: '94964',
    county: 'Marin',
    phone: '(415) 454-1460',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 2000,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content'
    ],
    requiresApproval: true,
    approvalTimeHours: 24,
    maxTransactionAmount: 50000,
    minTransactionAmount: 500,
    commissaryFeePercent: 3.5,
  },
  {
    name: 'California Institution for Men (Chino)',
    type: 'prison',
    address: '14901 S. Central Avenue',
    city: 'Chino',
    state: 'CA',
    zipCode: '91710',
    county: 'San Bernardino',
    phone: '(909) 597-1821',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 2000,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content'
    ],
    requiresApproval: true,
    approvalTimeHours: 48,
    maxTransactionAmount: 50000,
    minTransactionAmount: 500,
    commissaryFeePercent: 3.5,
  },
  {
    name: 'California Institution for Women (Frontera)',
    type: 'prison',
    address: '16756 Chino-Corona Road',
    city: 'Corona',
    state: 'CA',
    zipCode: '92880',
    county: 'Riverside',
    phone: '(909) 597-1771',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 2000,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content'
    ],
    requiresApproval: true,
    approvalTimeHours: 48,
    maxTransactionAmount: 50000,
    minTransactionAmount: 500,
    commissaryFeePercent: 3.5,
  },
  {
    name: 'Pelican Bay State Prison',
    type: 'prison',
    address: '5905 Lake Earl Drive',
    city: 'Crescent City',
    state: 'CA',
    zipCode: '95532',
    county: 'Del Norte',
    phone: '(707) 465-1000',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 2000,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content'
    ],
    requiresApproval: true,
    approvalTimeHours: 72,
    maxTransactionAmount: 50000,
    minTransactionAmount: 500,
    commissaryFeePercent: 3.5,
  },

  // Juvenile Facilities
  {
    name: 'Los Angeles County Juvenile Hall - Central',
    type: 'juvenile',
    address: '1605 Eastlake Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90033',
    county: 'Los Angeles',
    phone: '(323) 226-8301',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 1500,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content',
      'alcohol',
      'tobacco'
    ],
    requiresApproval: true,
    approvalTimeHours: 24,
    maxTransactionAmount: 20000, // $200 for juveniles
    minTransactionAmount: 500,
    commissaryFeePercent: 2.5,
  },
  {
    name: 'Alameda County Juvenile Justice Center',
    type: 'juvenile',
    address: '2500 Fairmont Drive',
    city: 'San Leandro',
    state: 'CA',
    zipCode: '94578',
    county: 'Alameda',
    phone: '(510) 577-3100',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 1500,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content',
      'alcohol',
      'tobacco'
    ],
    requiresApproval: true,
    approvalTimeHours: 24,
    maxTransactionAmount: 20000,
    minTransactionAmount: 500,
    commissaryFeePercent: 2.5,
  },
  {
    name: 'San Diego County Juvenile Detention Facility',
    type: 'juvenile',
    address: '2901 Meadowlark Drive',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92123',
    county: 'San Diego',
    phone: '(858) 514-8400',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 1500,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content',
      'alcohol',
      'tobacco'
    ],
    requiresApproval: true,
    approvalTimeHours: 24,
    maxTransactionAmount: 20000,
    minTransactionAmount: 500,
    commissaryFeePercent: 2.5,
  },
  {
    name: 'Orange County Juvenile Hall',
    type: 'juvenile',
    address: '331 The City Drive',
    city: 'Orange',
    state: 'CA',
    zipCode: '92868',
    county: 'Orange',
    phone: '(714) 935-7000',
    messagingEnabled: true,
    commissaryEnabled: true,
    photoEnabled: true,
    videoEnabled: false,
    maxMessageLength: 1500,
    prohibitedTopics: [
      'gang activity',
      'escape plans',
      'criminal activity',
      'threats',
      'explicit sexual content',
      'drug-related content',
      'alcohol',
      'tobacco'
    ],
    requiresApproval: true,
    approvalTimeHours: 24,
    maxTransactionAmount: 20000,
    minTransactionAmount: 500,
    commissaryFeePercent: 2.5,
  },
]

// Helper function to initialize facilities in the database
export function initializeFacilities() {
  const facilities: Facility[] = californiaFacilities.map((facility, index) => ({
    ...facility,
    id: `facility_${index + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  
  return facilities
}

// Get facility by ID
export function getFacilityById(facilities: Facility[], id: string): Facility | undefined {
  return facilities.find(f => f.id === id)
}

// Get facilities by type
export function getFacilitiesByType(facilities: Facility[], type: 'prison' | 'juvenile'): Facility[] {
  return facilities.filter(f => f.type === type)
}

// Get facilities by county
export function getFacilitiesByCounty(facilities: Facility[], county: string): Facility[] {
  return facilities.filter(f => f.county?.toLowerCase() === county.toLowerCase())
}

