# Internal Tooling Platform

A comprehensive demonstration of custom internal tools built with Devin, showcasing capabilities that replace Microsoft Power Apps with full customization, no licensing constraints, and enterprise-grade features.

## Overview

This prototype demonstrates a modern internal tooling platform with four integrated applications:

- **KYC Review Queue** - Document review with intelligent PDF navigation and approval workflows
- **Support Ticketing** - Ticket management with cross-app integration and message threading
- **Deployment Management** - Multi-environment deployment tracking with Kubernetes logs
- **Audit Logs** - Real-time action tracking and compliance monitoring

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Demonstration Guide

### Role-Based Access Control

The platform includes a role switcher in the navigation bar to demonstrate different permission levels:

| Role | Permissions |
|------|-------------|
| **Admin** | Full access to all applications and features |
| **KYC Reviewer** | View, approve, and reject KYC applications |
| **Support Agent** | View, resolve, and assign support tickets |
| **DevOps** | View deployments and deploy applications |
| **Viewer** | Read-only access to KYC and Support applications |

### Key Demonstrations

#### 1. PDF Document Navigation (Difficult in Power Apps)

1. Navigate to **KYC Review Queue**
2. Click **Review** on any record
3. Use the **Quick Navigation** buttons to jump to document sections
4. Observe smooth scrolling with green highlight on selected section

**Talking Point**: "This PDF navigation feature with intelligent section jumping would be very difficult to implement in Power Apps."

#### 2. Cross-Application Integration

1. Navigate to **Support Tickets**
2. Click **View** on a ticket
3. Click **View KYC** next to the customer name
4. Navigate directly to the customer's KYC record

**Talking Point**: "Our apps are seamlessly integrated with cross-app navigation, something Power Apps struggles with."

#### 3. Deployment Management

1. Switch to **DevOps** role
2. Navigate to **Deployments**
3. Click **View Logs** on any deployment
4. View realistic Kubernetes-style deployment logs

**Talking Point**: "We have full control over deployment workflows with integrated container orchestration logs."

#### 4. Real-Time Audit Trail

1. Switch to **Admin** role
2. Navigate to **Audit Logs**
3. Perform actions in other apps (approve KYC, resolve tickets)
4. Observe real-time action tracking with user, timestamp, and details

**Talking Point**: "Complete audit trails for compliance - every action is logged with full context."

#### 5. Data Migration Capability

1. Switch to **Admin** role
2. Navigate to **KYC Review Queue**
3. Click **Import CSV**
4. Select `sample-customers.csv` from the codebase (`/public/sample-customers.csv`)
5. Observe new records appearing in the table

**Talking Point**: "We can import data from legacy systems, handling messy real-world data formats."

### CSV Import Testing

The sample CSV file for import is located at `/public/sample-customers.csv` in the codebase. This file contains intentionally messy data (inconsistent capitalization, date formats, etc.) to demonstrate the system's ability to handle data from legacy systems like Power Apps.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API

## Advantages Over Power Apps

| Feature | Power Apps | Custom Solution |
|---------|------------|-----------------|
| **Customization** | Limited by platform constraints | Full control over UI/UX |
| **Licensing Cost** | $250K/year for this use case | No licensing fees |
| **Code Ownership** | Platform-dependent | Complete ownership |
| **Integration** | Limited connectors | Easy system integration |
| **Document Workflows** | Basic | Advanced (PDF navigation) |
| **Security** | Platform-level controls | Custom RBAC + audit logs |
| **Data Migration** | Complex | Flexible import capabilities |
| **Deployment** | Platform-managed | Custom deployment workflows |

## Notes

This is a demonstration prototype created to showcase internal tooling capabilities. The mock data and simulated workflows are for demonstration purposes only.
