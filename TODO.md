# TODO

## Both

- Cad and print MVP to demo
- Get training data with blenderproc? (worst case many videos) (data augmentation)
- Get test data by photographing real chair 
- Transfer learn on YOLO or Mobilenet or both (Drew for CV?)

## Drew

- Write starter swift app glue
- Play with AR foundation anchors and object tracking (once we get bounding boxes)

## Shreeyak


# Misc Notes

Streaming depth data from TrueDepth Cam: https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/streaming_depth_data_from_the_truedepth_camera

Object Detection IOS: https://developer.apple.com/documentation/vision/recognizing_objects_in_live_capture
https://www.youtube.com/watch?v=0uXMgLIlXoE


Create ML: https://developer.apple.com/documentation/createml


Stratify what success looks like
	0.	categories of object
	0.	additional or relative features to get down to object level
	0.	Dataset goals
	0.	buy object
	0.	move to different rooms

Trouble: 
	⁃	Training data to fine tune is hard to get
	⁃	Domain Transfer learning
	⁃	bounding box or maybe masks
	⁃	Incorporating depth maps and size as extra features
	⁃	If have same visual appearance, call into same category of object, BUT then resolve based off of size
	⁃	If not using LIDAR, can look up ikea tutorial 
	⁃	Aspect ratio (affine transformation) 
	⁃	IF everything is on the floor, maybe you can do surface logic after categorical identification




WHAT MODEL TO TRANSFER LEARN ON : https://machinelearningmastery.com/object-recognition-with-deep-learning/


Model quantization

	0.	Run model on device (object detection pipeline)
	0.	AR Foundation to do stuff like tracking and plane detection
	0.	Gif in corner
	0.	or transparent floating gifs

Overlay with VR?




