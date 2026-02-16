##  Use Cases

### 1 Account Management (Registration, Login, Profile)

#### UC-01: Register Account
- **Actor:** Guest User
- **Description:** Guest user creates an account to access personalized features.
- **Preconditions:** Guest user is on the registration page.
- **Basic Flow:**
    1. User clicks “Register” and fills out the registration form (email, password, optional profile info).
    2. System validates input and creates the account.
    3. System sends confirmation email if required.
- **Postconditions:** User account is created; the user can log in.
#### UC-02: Log In / Log Out
- **Actor:** Registered User
- **Description:** Registered user logs in to access personalized features or logs out when done.
- **Preconditions:** User has an existing account.
- **Basic Flow (Log In):**
    1. User enters email and password.
    2. System validates credentials.
    3. System grants access to the user dashboard.
- **Basic Flow (Log Out):**
    1. User clicks “Log Out.”
    2. System terminates the session.        
- **Postconditions:** User session is active (log in) or terminated (log out).
#### UC-03: Edit Profile
- **Actor:** registered User
- **Description:** User updates personal information such as profile picture, display name, or other settings.
- **Preconditions:** User is logged in.
- **Basic Flow:**
    1. User navigates to profile settings.
    2. User updates profile picture, name, or other editable fields.
    3. System validates changes and updates the profile.
- **Postconditions:** Profile information is updated and reflected in the system.
---
### 2 Social Interaction / Connections

#### UC-04: Manage Friend Connections
- **Actor:** Registered User
- **Description:** User adds or removes friends on the platform.
- **Preconditions:** User is logged in.
- **Basic Flow:**
    1. User searches for other users.
    2. User sends friend requests or removes existing friends.
    3. System updates friend list accordingly.    
- **Postconditions:** Friend connections are updated; notifications sent where applicable.
#### UC-05: Share Event with Friends
- **Actor:** Registered User
- **Description:** User shares an event with selected friends.
- **Preconditions:** User is logged in, has friends added, and views an event.
- **Basic Flow:**
    1. User clicks “Share” on an event.
    2. User selects friends to share with.
    3. System sends notifications or messages with event details to selected friends.
- **Postconditions:** Friends receive the shared event notification.
#### UC-06: Manage Friend Connections
- **Actor:** Registered User
- **Description:** User adds or removes friends on the platform and manages incoming friend requests.
- **Preconditions:** User is logged in.
- **Basic Flow:**
    1. User searches for other users.
    2. User sends a friend request to another user.
    3. Recipient sees the pending friend request.
    4. Recipient can **accept** or **reject** the request.
    5. System updates friend lists based on the action (accepted → added to friends; rejected → request removed).
    6. User can also remove existing friends at any time.
- **Postconditions:** Friend connections are updated; notifications are sent where applicable.
---
### 3 Event Discovery / Search

#### UC-06: Search Events
- **Actor:** Registered User, Guest User
- **Description:** User searches for events or programs in Budapest based on keywords, categories, or dates.
- **Preconditions:** The system is accessible, and events are available in the database.
- **Basic Flow:**
    1. User navigates to the search page.
    2. User enters search criteria (keywords, category, date).
    3. System displays a list of matching events.
    4. User selects an event to view detailed information.
- **Postconditions:** User sees event details and can decide to bookmark or share (if registered).
#### UC-07: Bookmark / Save Event
- **Actor:** Registered User
- **Description:** User saves favorite events to view later.
- **Preconditions:** User is logged in and viewing event details.
- **Basic Flow:**
    1. User clicks the “Bookmark” or “Save” button on an event.
    2. System adds the event to the user’s saved events list.
- **Postconditions:** Event is saved and accessible in the user’s profile.
