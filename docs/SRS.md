# System Requirements Specification
---
## 1. General Description
- **Purpose:**  
- **Scope:**  
- **Context / Background:**  
- **Definitions / Acronyms:**  
  - User (A person who uses the website to search and view events)  
  - Admin (A person who manages content or moderates data on the platform)  
  - Event (Any scheduled activity, meeting, or program listed in the system)  
  - API (Application Programming Interface; a way for the system to get data from external services)  
  - UI (User Interface; the part of the system the user interacts with)  
  - UX (User Experience; overall experience of the user while using the system)  
  - FR (Functional Requirement; a requirement specifying a system function)  
  - NFR (Non-Functional Requirement; a requirement specifying system qualities such as performance, security, reliability)  
## 2. Actors

### 2.1 User
- **Description:**  
- **Permissions:**  
### 2.2 Admin
- **Description:**  
- **Permissions:**  
### 2.3 Actors Requirements
- **Actors:**  
  - Users:  
  - Admin:  
  - External systems:  
- **Goals / Responsibilities:**  
  - Users:  
  - Admin:  
  - External systems:  
## 3. Functional Requirements
- FR-01: Allow users to search for events by location or city.  
- FR-02: Display event details (date, time, location, description, link).  
- FR-03: 
- FR-04: 
- FR-05: 
- FR-06:
- FR-07: 
- FR-08:  
- FR-09:  
## 4. Non-Functional Requirements

- NFR-01: Performance  
  The system should be fast and responsive, e.g., search and list display should occur within {...} seconds.
- NFR-02: Scalability  
  The system must be able to handle increasing numbers of users and event data without significant performance degradation. {?}
- NFR-03: Reliability  
  The service should be stable and available, with minimal downtime, and capable of handling errors from external systems.
- NFR-04: Maintainability  
  The code should be clear and well-documented, and the project structure should allow easy maintenance and future extension.
- NFR-05: Security  
  User data and system resources must be protected against unauthorized access, e.g., authentication, HTTPS, data validation.
- NFR-06: Usability  
  The user interface should be intuitive and mobile-friendly, easy to use and understand for all types of users.
- NFR-07: Notes / Extensions  
  {...} Placeholder for future detailed extensions, e.g., specific latency limits, data security protocols, audit trail requirements.

---
# Use-Cases

{...}

## Technology Stack 

- Frontend:
  - Next.js 14 (App Router)
  - TypeScript
  - TanStack Query 
  - hadcn/ui
  - Hey API (ha OpenAPI spec van)
- Backend: 
	- Database:
- Version Control: Git / GitHub
- Deployment Environment: {...}
- External APIs: {...}

## System Architecture (High-Level)

The system follows a client-server architecture.
The frontend communicates with the backend via REST API.
The backend handles business logic and database communication.

## Target Environment

- Web browser-based application.
- Desktop and mobile devices supported.
- Requires internet connection.

