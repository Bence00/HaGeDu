# System Requirements Specification
---
## 1. General Description
- **Purpose:**  
  - The purpose of this system is to provide users with a centralized platform to discover programs and events in Budapest through an optimized and comprehensive search mechanism. The application aims to deliver fast, relevant, and wide-ranging search results presented in a user-friendly and intuitive interface. In addition to event discovery, the system enables users to connect with friends, share programs, and organize shared activities, fostering social interaction around local events.
- **Scope:**  Allows users to find programs and events in Budapest based on various criteria.
- **Context / Background:**  This project is an academic exercise as part of a university course (Software Engineering).
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

## 2.1 Registered User
- **Description:**  
    An individual who has created an account in the system and can access personalized and social features of the application.
- **Permissions:**
    - Create and manage a personal account
    - Log in and log out
    - Edit profile information
    - Search and filter programs and events
    - View detailed event information
    - Save or bookmark events
    - Connect with other users (add/remove friends)
    - Share events with friends
    - View friends’ shared or saved events
## 2.2 Guest User (Unregistered User)
- **Description:**  
    An individual who accesses the application without creating an account. The guest user can browse and search events but does not have access to personalized or social features.
- **Permissions:**
    - Search and filter programs and events
    - View basic event details
    - View publicly available content
    - Register for an account
- **Restrictions:**
    - Cannot save or bookmark events
    - Cannot connect with other users
    - Cannot access personalized recommendations
## 2.3 Admin
- **Description:**  
	    A system administrator responsible for managing platform content, supervising users, and maintaining system integrity.
- **Permissions:**
		Anything under GDPR scopes.

---
# Functional Requirements
- **FR-01:** Allow users to browse and search for events by location, category, date range, price (free/paid), event name, or description.
- **FR-02:** Display a list view of all approved events.
- **FR-03:** Enable sorting of events by date, popularity, or price.
- **FR-04:** Display detailed event information including:
    - Location — shown on a map (e.g., Google Maps)
    - Time — start and end time
    - Price — ticket prices and free indicator
    - Description — short summary of the event
    - Venue rating — if available (e.g., Google Places rating)
    - Ticket purchase link — redirects to external ticket provider
- **FR-05:** Allow guest users to register an account with email and password to access personalized and social features.
- **FR-06:** Allow registered users to log in and log out of their account securely.
- **FR-07:** Allow registered users to edit profile information, including name, profile picture, saved events, interests, and participation history.
- **FR-08:** Provide weekly event recommendation emails to subscribed users.
- **FR-09:** Allow registered users to indicate “I will attend” for events, share events with friends within the platform, and save events for later viewing.
- **FR-10:** Provide personalized recommendations based on user interests and previous behavior.
- **FR-11:** Admins can manage events by reviewing automatically collected events in pending status, editing them, and approving or rejecting them. Approved events appear on the public interface. Manual event upload is also supported.
- **FR-12:** The system automatically collects events from configured external sources daily, stores them with pending status, and performs deduplication when the same event is received from multiple sources.
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
  User data and system resources must be protected against unauthorized access, e.g., authentication, HTTPS, data validation, CIA triad.
- NFR-06: Usability  
  The user interface should be intuitive, easy to use and understand for all types of users.
- NFR-07: Notes / Extensions  
  {...} Placeholder for future detailed extensions, e.g., specific latency limits, data security protocols, audit trail requirements.

---


## Technology Stack 

- Frontend:
  - Next.js 14 (App Router)
  - TypeScript
  - TanStack Query 
  - shadcn/ui
  - Hey API (ha OpenAPI spec van)
- Backend: Spring Boot
	- Database: PostgreSQL
- Version Control: Git / GitHub
- Deployment Environment: Vercel for frontend
- External APIs: {?}

## Technology Stack – Rationale

The selected technology stack was chosen to ensure scalability, performance, maintainability, and efficient development.

### Frontend

**Next.js 14 (App Router)** was selected for its modern React architecture, server-side rendering capabilities, and strong performance optimization, which are important for a search-focused application.  
**TypeScript** improves reliability through static typing and reduces runtime errors.  
**TanStack Query** enables efficient server-state management and caching for dynamic event data.  
**shadcn/ui** accelerates UI development while maintaining consistency and accessibility.  
**Hey API (OpenAPI-based)** ensures type-safe communication between frontend and backend.

### Backend

**Spring Boot** provides a robust and scalable framework for REST API development.  
**PostgreSQL** was chosen for its reliability and strong support for structured relational data and complex queries.

### Version Control & Deployment

**Git/GitHub** supports collaboration and version management.  
**Vercel** enables optimized and streamlined frontend deployment.
**Backend** deployment is not decided yet.

### External APIs

External services may be integrated for event data aggregation, authentication, or geolocation.

The current stack reflects the project's present requirements; however, technologies may be adjusted in later phases if necessary for scalability, integration needs, or development efficiency.

---

## System Architecture (High-Level)

The system follows a client-server architecture.
The frontend communicates with the backend via REST API.
The backend handles business logic and database communication.

## Target Environment

- Web browser-based application.
- Desktop devices supported.


