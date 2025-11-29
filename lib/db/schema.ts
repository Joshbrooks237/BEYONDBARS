/**
 * Database Schema for BeyondBars Platform
 * This defines the data structure for users, inmates, facilities, messages, and transactions
 */

export interface User {
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  phone?: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Facility {
  id: string
  name: string
  type: 'prison' | 'juvenile' // CDCR Prison or Juvenile Hall
  address: string
  city: string
  state: string
  zipCode: string
  county?: string
  phone?: string
  
  // Compliance & Rules
  messagingEnabled: boolean
  commissaryEnabled: boolean
  photoEnabled: boolean
  videoEnabled: boolean
  
  // Message rules
  maxMessageLength?: number
  prohibitedTopics: string[] // e.g., ["gang activity", "escape plans", "criminal activity"]
  requiresApproval: boolean
  approvalTimeHours: number // typical approval time
  
  // Commissary rules
  maxTransactionAmount?: number
  minTransactionAmount?: number
  commissaryFeePercent?: number
  
  createdAt: Date
  updatedAt: Date
}

export interface Inmate {
  id: string
  userId: string // the user who added this inmate
  
  // Inmate Information
  firstName: string
  lastName: string
  inmateNumber: string // CDCR Number or Juvenile ID
  dateOfBirth?: Date
  
  // Facility Information
  facilityId: string
  housingUnit?: string
  
  // Relationship
  relationship: string // e.g., "spouse", "parent", "child", "sibling", "friend"
  
  // Approval status
  verified: boolean // whether the inmate-user relationship is verified
  approvalStatus: 'pending' | 'approved' | 'rejected'
  
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  userId: string
  inmateId: string
  facilityId: string
  
  // Message content
  subject: string
  body: string
  attachments?: string[] // URLs to photos/files
  
  // Compliance
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'delivered'
  rejectionReason?: string
  reviewedAt?: Date
  reviewedBy?: string
  
  // Delivery
  sentAt?: Date
  deliveredAt?: Date
  readAt?: Date
  
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  inmateId: string
  facilityId: string
  
  // Transaction details
  type: 'commissary' | 'phone_credit' | 'other'
  amount: number // in cents
  fee: number // in cents
  totalAmount: number // amount + fee
  
  // Payment
  paymentMethod: 'card' | 'bank_account'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  stripePaymentId?: string
  
  // Delivery
  status: 'pending' | 'processing' | 'completed' | 'failed'
  deliveredAt?: Date
  
  createdAt: Date
  updatedAt: Date
}

export interface ComplianceLog {
  id: string
  entityType: 'message' | 'transaction' | 'user' | 'inmate'
  entityId: string
  
  action: string
  details: Record<string, any>
  performedBy?: string
  ipAddress?: string
  
  createdAt: Date
}

// In-memory database (for development)
// In production, this would be replaced with PostgreSQL/MongoDB
export const db = {
  users: new Map<string, User>(),
  facilities: new Map<string, Facility>(),
  inmates: new Map<string, Inmate>(),
  messages: new Map<string, Message>(),
  transactions: new Map<string, Transaction>(),
  complianceLogs: new Map<string, ComplianceLog>(),
}

