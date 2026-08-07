# HLD Operations Platform Architecture

## Overview

HLD Operations is an internal operations platform designed for Hagerstown Light Department employees.

The platform will provide a centralized location for daily operations, employee tools, safety workflows, scheduling, reporting, and integrations with existing systems.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Hosting

Prototype:
- Vercel

Future:
- Microsoft 365 / Azure environment

## Database

Prototype:
- Supabase

Future:
- Microsoft SQL / Azure Database

---

# Application Structure

## Authentication

Responsible for:
- Employee login
- User identity
- Permissions
- Role management


## Application Shell

Shared across all authenticated pages.

Includes:

- Sidebar navigation
- Operations header
- User profile
- Notifications


## Dashboard

Primary employee landing page.

Displays:

- System status
- Weather
- Announcements
- Quick actions
- Today's operations


## Modules

Future application areas:

- Operations
- Safety
- Work Orders
- Scheduling
- Employees
- Fleet
- Documents
- Reports
- Administration

---

# Integration Goals

Future integrations:

- Microsoft 365
- SharePoint
- Milsoft OMS
- Milsoft GIS
- IntelliTime
- InvoiceCloud
- Weather APIs
- Email notifications

---

# Development Approach

The platform will be developed in phases:

1. Prototype
2. User Interface
3. Database Integration
4. Authentication
5. System Integrations
6. Production Deployment