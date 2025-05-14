# Bynry-Project
Profile Management Web App

This is a React-based web application for managing user profiles, with both user and admin dashboards. The app allows admins to create, edit, and delete profiles, while users can view profiles and see location details on a map. It also includes a search feature for finding profiles based on name, location, or interests.

Features
1. Login Page:
Two types of users:

User: user1 | password: userpass

Admin: admin1 | password: adminpass

After logging in, users are redirected to their respective dashboards:

Admin Dashboard: Allows adding, editing, and deleting user profiles.

User Dashboard: Displays profiles created by the admin.

2. Admin Features:
Add Profile: Admin can add new profiles with the following details:
Name
Photo
Contact Information
Interests
Location

Edit Profile: Admin can update the profile details at any time.
Delete Profile: Admin can remove profiles from the system.

3. User Features:
View Profiles: Users can see the profiles created by the admin.
View Profile Details: When a user clicks on a profile card, they can view detailed information about the profile, including name, contact, interests, and location.
Location on Map: When users click the "Summary" button, the precise location of the selected user is displayed on an interactive map using Leaflet.

4. Search Functionality:
Users and admins can search for profiles based on:
Name
Location
Interests

The search is real-time and displays relevant profiles instantly.

5. Responsive Design:
The app is fully responsive and works well on both mobile and desktop, thanks to Tailwind CSS.

6. State Management:
Redux is used to manage the state of user data, profile information, and search results.

Technologies Used
Frontend: React, Tailwind CSS, Redux, Leaflet (for maps)
State Management: Redux
Map Integration: Leaflet.js
CSS Framework: Tailwind CSS
