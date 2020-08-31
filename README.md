# PrepHQ Grader

This is the static front end code for the grading processed used at [PrepHQ](www.theprephq.com) camps. I built the simple form and accompanying back end (not publicly hosted) to speed up student scoring of ACT/SAT exams in our weekend camps where often we have 50+ students who need to convert and register their scores.

The simple application has made the camp experience smoother and has elimianting a major source of errors as students routinely incorrectly converted their *number correct* to the official ACT/SAT score out of 36/1600 respectively.

Furthermore, this programmatic data collection has facilitated our custom emailing service based on student score imrpovement as well as our school-facing analytics dashboard built in the python libary Dash.

The backend is a simple flask app, a PostgreSQL database, and emails powered by the SendGrid API.

`Check out what our students see:` www.theprephq.com/grader.



