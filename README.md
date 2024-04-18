![image](https://github.com/yagoandrade/echosafe/assets/70113380/43e06065-aa24-419f-80bb-7b0c3b3b4ea6)

# EchoSafe - Combatting School Bullying

EchoSafe is a system designed to address the issue of bullying in schools by providing a secure platform for reporting and detailed analysis. Our primary focus is ensuring user privacy while offering comprehensive tools to understand, monitor, and mitigate cases of bullying. We aim to provide thorough analysis of reports, as detailed throughout the text. User privacy, especially that of students, is a priority.

## Issues

1. Difficulty in identifying and giving voice to cases of bullying in schools.
2. Lack of data analysis tools to understand bullying and harassment trends and patterns.
3. Absence of a secure and confidential channel for reporting between students and the school.

## Expectations

1. **Facilitate the identification of bullying in schools.** Also, facilitate student communication with school authorities, ensuring their privacy and encouraging them to report violence situations, whether experienced or witnessed.
2. **Provide detailed analysis on bullying for targeted actions.** The school can observe the following situations:
   - Track the progress of the report, where it has statuses of received, under observation, validated, false, and resolved;
   - Track the categories in which the report fits, such as homophobia, sexism, fatphobia, femicide, transphobia, xenophobia, racism, religious intolerance, etc.;
   - Number of reports categorized by gender, age, and grade;
   - Issue reports to schools detailing the highest incidences of bullying, how it usually occurs, at what time, etc.
3. **Create a safer and more inclusive school environment.** This involves prioritizing student safety at all stages of reporting, from ensuring their privacy to verifying the facts by the school and finally taking action to mitigate the reported problem.

## Personas

**Persona V:** Middle and High School Students (ages 11 to 18)

- **What they do:** Study and interact with peers, potentially experiencing or witnessing situations that could be resolved using the application.
- **What they expect:** A secure means to report bullying incidents without fear of retaliation and with a greater chance of having their situation resolved by a responsible entity at the school.

**Persona X:** Teachers and School Staff

- **What they do:** Teachers and staff responsible for supervising and ensuring student safety.
- **What they expect:** A tool that facilitates the identification and reporting of bullying incidents, allowing for quick and effective intervention.

**Persona Y:** School Administrators

- **What they do:** School administration members responsible for making long-term decisions and ensuring the effectiveness of the bullying prevention program.
- **What they expect:** Comprehensive data and reports to aid in formulating school policies and practices focused on bullying prevention.

**Persona Z:** Mental Health Support Professionals

- **What they do:** Mental health professionals who collaborate with the school to provide support to students affected by bullying, offering specialized interventions, guidance, and coping strategies.
- **What they expect:** Access to relevant and detailed information about bullying reports to provide personalized support to a school's students and utilize tools that facilitate early identification of problems in the school environment, promoting a healthy atmosphere.

## Milestones

### Milestone 1 - 01/29/2024 (Deploy)

- Implementation of anonymous reporting and intuitive interface.
- User registration and login.
- Creation of a simple dashboard for displaying report data.

#### Features:

1. Report form.
2. Listing reports on the platform.
3. User (student) registration.
4. Entity (schools) registration.
5. User (student) login.
6. Entity (schools) login.
7. Creation of dashboard for displaying report data.

#### Release Notes:

- Release a release note explaining what was implemented in Milestone 1.

### Milestone 2 - 03/25/2024

- Integration of data mapping and reporting.
- Efficiency measured by usage metrics and user satisfaction.
- Advancements in the dashboard including location, date, and grade filters, trends, and better insights.
- Notification system for school authorities (via platform and email).
- Integration with AI to analyze the sentiments of each report and categorize the reported offenses.

We believe that Milestone 2, with the integration of data mapping and reporting, will achieve the expected outcome. Effectiveness will be measured by usage metrics and user satisfaction.

#### Features:

1. Data filters and categorizations.
2. Alerts and notifications system for school authorities (via platform and email).
3. Email system for outreach to non-registered schools.
4. Integration with ChatGPT to analyze sentiments and categorize reported offenses in reports.
5. Mapping and analysis of report data by school.
6. Inclusion of additional features related to data analysis and reporting.

#### Release Notes:

- Release a release note explaining what was implemented in Milestone 2.

## Risks

1. **Privacy and Security Issues** (High Severity, Medium Probability)

   **Mitigation:** Implementation of rigorous security and privacy measures.

   - Implementation of rigorous data security and privacy measures, ensuring no user has knowledge of another user's identity (e.g., schools cannot know the author of the report but can know about the accused if their identity is revealed by the report author);
   - Regular system reviews to ensure its ongoing security and improvement based on industry best practices;
   - Ensuring that information shared in reports is treated with utmost confidentiality. Mental health professionals only have access to essential information to provide support, and all measures are taken to preserve the identity of those involved;
   - Maintaining transparency about how data is managed and used on the platform. Maintaining open communication with mental health professionals, educators, students, and guardians, fostering an environment of accountability and trust.

2. **Resistance to app adoption by students and teachers** (Medium Severity, High Probability):

   **Mitigation:** Awareness campaigns, continuous improvement of the app based on constant feedback received from the target community, and encouragement of use.

   - Awareness campaigns and training;
   - Continuous feedback from the school community for improvements;
   - Encouragement of use by proving the app's effectiveness in monitoring school violence rates and mitigating conflicts between students.

## Components

### Web Application

The EchoSafe web application is a comprehensive platform designed for efficient management and analysis of bullying reports in schools. With an intuitive and user-friendly interface, the application aims to provide a seamless experience for users, especially for school authorities responsible for administration and decision-making based on received reports.

#### Key Features:

1. **Main Dashboard:**
   - Provides an overview of report statistics, highlighting the total number of incidents reported and corresponding statuses (received, under observation, validated, false, resolved).
   - Offers charts and visualizations to facilitate understanding of bullying trends.
2. **Report Management:**
   - Allows detailed tracking of each report, with information about the reporter, the accused, the incident category (homophobia, sexism, fatphobia, femicide, transphobia, racism, xenophobia, religious intolerance, etc.), and the history of actions taken.
3. **Filters and Categorizations:**
   - Facilitates data analysis through advanced filters, allowing categorization of reports based on criteria such as gender, age, grade, and other relevant parameters.
4. **Alerts and Notifications:**
   - Implements a system of automatic alerts and notifications for school authorities, using emails, whenever a relevant report is received or there is an update on its status.
5. **Detailed Reports:**
   - Provides comprehensive reports on report statistics, facilitating understanding of bullying dynamics in the school. Includes in-depth analyses of incident categories and other key indicators.
6. **Integration with ChatGPT:**
   - Features integration with ChatGPT to analyze sentiments expressed in reports, categorizing reported offenses more accurately and identifying emotional nuances.
7. **Email System:**
   - Implements an email system for outreach to non-registered schools, encouraging participation and raising awareness about the importance of the application.
8. **Security and Privacy:**
   - Ensures rigorous security and privacy measures, ensuring that reporter information is kept confidential and only relevant authorities have access to specific details.

