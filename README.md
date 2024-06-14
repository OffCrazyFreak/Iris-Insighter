# Iris Insighter

Iris Insighter is a user-friendly, accurate, and reliable basic eye-tracking software that can be integrated into various web applications. It is capable of tracking and recording eye movement patterns, which can be analyzed for various purposes such as usability testing, psychological research, or educational tools.

### Key Features
- Eye Movement Tracking - Utilizes trainable regression model to track eye movements with good accuracy and low latency, ensuring real-time tracking capabilities.
- Hardware Compatibility - Optimized for compatibility with standard laptop camera hardware, facilitating easy deployment across different devices.
- User-Friendly Interface - Features an intuitive and responsive interface, making it accessible for users with varying levels of technical expertise.

### Possible application fields
- Accessibility - Assists in developing accessibility tools for users with limited mobility, leveraging
eye movements as input.
- Academic Research - Aids in human-computer interaction studies, offering valuable data on user
behavior and interaction patterns.
- User Experience Design - Useful for UX designers to test and improve the usability of websites
and applications.
- Gaming - Enhances gaming experiences by providing developers with insights into player attention and engagement.

## Hardware and software requirements
- Operating System - Compatible with major operating systems including Windows, macOS, and Linux when Node.js installed.
- Camera Requirements - Standard laptop cameras or external webcams with a minimum resolution specification of 720p.
- Processor and Memory - Tested on AMD Ryzen 5 5625U with single DIM with 8GB of 3200 MHz RAM.

## Manual

### Startup instructions

To run the application, you need Node.js, which can be downloaded from the link https://nodejs.org/en/download/. After installing Node.js on your computer, in the root folder of the app, you need to execute the following commands to download and install the necessary dependencies and start the local server on which the application will be launched:
- cd app
- npm install .
- npm run serve

After running these commands, a new tab in your browser should be launched in which you can access the application.

### Welcome screen
When the app launches the user is greeted with a simple welcome screen with the app logo, app name and a short description. Along the top right of the screen there is a navigation bar with which the user can access the calibration page, demo page, or return to this (home) page.

![Home](https://github.com/OffCrazyFreak/Iris-Insighter/assets/44674613/52be6a65-c658-47c0-8bb7-4b0c4e2c6fc0)
*Home page with welcome screen and navigation*

### Calibration and accuracy measurement

Selecting the Calibration link in navigation the user is routed to the calibration page and is offered additional actions. Additionally, on this page, there is a camera preview of the user with a rectangle in which the model can best predict the users gaze. When the user is correctly positioned, this rectangle will turn from red to green. The user’s predicted gaze is the small moving dot located where the user is looking.

In the menu of calibration page there are 3 additional buttons in the navigation: Recalibrate, Test accuracyand Help. Recalibrate button deletes the existing calibration data if any exists and restarts the calibrationsetup by setting up the canvas calibration points for calibration. Test accuracy button sets up the canvasfor the accuracy test. Help button opens a modal with a simple UI description and instructions on how tocalibrate the model.

The model can be calibrated simply by clicking the calibration points multiple times until they changecolor. After calibrating the first 8 points, a middle and final calibration will appear in the middle of screen.After the user calibrates all 9 points, the accuracy test will begin.

![Callibration](https://github.com/OffCrazyFreak/Iris-Insighter/assets/44674613/bcd3595e-aaea-42a9-b349-ddd81683dae2)
*Calibration page with calibration points*

The accuracy test consists of the user looking at the middle point for 5 seconds while the model predicts where on the screen the user’s eyes are looking. By calculating the average Euclidean distance between the prediction and the middle point, the user is given an estimated accuracy prediction.

![Accuracy](https://github.com/OffCrazyFreak/Iris-Insighter/assets/44674613/faa68bb8-263b-47ed-b2d8-ed093c4b40d0)
*Calibration page after accuracy testing*

### Demo

Selecting the Demo link in navigation the user is routed to the demo page and is offered additional actions. Just link on the calibration page, there is a camera preview of the user with a rectangle in which the model can best predict the users gaze. When the user is correctly positioned, this rectangle will turn from red to green. The user’s predicted gaze is the small moving dot located where the user is looking.

In the menu of calibration page there is only 1 additional button Help which opens a modal with a simple UI description and instructions on how to calibrate the model and how to try out the demo.

The model can be calibrated by clicking anywhere on screen while the user is looking at the cursor. The more clicks on different parts of screen, the better the prediction will be. The goal of the demo is for the user to try to separate the balls via gaze only while they are continually attracted to the middle of the screen.

The ball’s movements can be tested with the cursor instead of the user’s gaze.

![Demo](https://github.com/OffCrazyFreak/Iris-Insighter/assets/44674613/c737e3f7-34fb-47d2-9858-bdbfc763cbbd)
*Demo page*
