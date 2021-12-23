# ikeAR

Augmented reality app that leverages computer vision to speed up assembling IKEA furniture by highlighting required components and overlaying instructional animations at each assembly step.

1. Team Name: ikeAR
2. Names: Shreeyak Sajjan (sss2297), Drew Sirenko (ays2130)
3. Submission Date: 22/12/2021
4. Development Platform: Snap Spectacles; Lens Studio
5. iPhone XR: iOS 14.6.1, MacBook Pro: Mac OS 12.0.1, Lens Studio: 4.7.2
6. Project Title: ikeAR
7. Project directory overview

/Public: Where all scripts and models go for a Lens

	/Lens/Scripts/LensController.js: Manages overall lens state (Switching between plane tracking and assembly modes. Would also manage multiple people in a connected lens)

	/System/Hud.js: Helper functions for managing the display text 

	/BuildLocation: Folder for managing the selection of build location and textures for it
		/Scripts/BuildLocationController.js: Code for forcing user to select horizontal surface as buildLocation. Also includes basic smooth animation.
		
		/Scripts/PlaneTracker.js: *LENS STUDIO CODE* Plane tracking API

	/Pieces/PiecesManager.js: State machine for displaying the instructions for our furniture
	/Pieces/TouchpadInput.js: Logic for interpreting swipes as input

	/Pointing/point.js: Raytrace based logic for pointing to parts of the model. 

	/Tween *LENS STUDIO CODE* for simple linear-interpolation-based animations 
	
	/chair_with_anim: meshes and animations for parts of our assembly chair


8. Deploying 
9. N/A
10. ___
11. As of December 2021,Lens Studio has not updated a few features to work on their Spectacles. Therefore we could not implement the following features:
    1. Voice Recognition based commands for hands free building
    2. “Connected Lenses” where multiple people can join the same build session so they can collaborate on the task.
12. N/A
13. Asset Sources:
	N/A
