import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'ai_analysis_screen.dart';

class CreateStep1PhotoScreen extends StatefulWidget {
  const CreateStep1PhotoScreen({super.key});

  static bool isReportingActive = false;
  static String? lastCapturedImagePath;

  @override
  State<CreateStep1PhotoScreen> createState() => _CreateStep1PhotoScreenState();
}

class _CreateStep1PhotoScreenState extends State<CreateStep1PhotoScreen> {
  final ImagePicker _picker = ImagePicker();
  XFile? _pickedFile;
  bool _hasCapturedPhoto = false;
  String _photoSource = '';

  @override
  void initState() {
    super.initState();
    CreateStep1PhotoScreen.isReportingActive = true;
    _saveReportingState();
    _retrieveLostData();
  }

  Future<void> _saveReportingState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('is_reporting_active', true);
    } catch (_) {}
  }

  Future<void> _retrieveLostData() async {
    try {
      final LostDataResponse response = await _picker.retrieveLostData();
      if (!response.isEmpty && response.file != null) {
        final path = response.file!.path;
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('last_captured_image_path', path);
        await prefs.setBool('is_reporting_active', true);

        CreateStep1PhotoScreen.lastCapturedImagePath = path;
        setState(() {
          _pickedFile = response.file;
          _hasCapturedPhoto = true;
          _photoSource = 'Camera Evidence (Recovered)';
        });
        _proceedToAiScan(path);
        return;
      }
    } catch (_) {}

    try {
      final prefs = await SharedPreferences.getInstance();
      final storedPath = prefs.getString('last_captured_image_path');
      final path = storedPath ?? CreateStep1PhotoScreen.lastCapturedImagePath;

      if (path != null && path.isNotEmpty) {
        setState(() {
          _pickedFile = XFile(path);
          _hasCapturedPhoto = true;
          _photoSource = 'Evidence Photo (Restored)';
        });
      }
    } catch (_) {}
  }

  Future<void> _proceedToAiScan(String pathOrUrl) async {
    CreateStep1PhotoScreen.lastCapturedImagePath = pathOrUrl;
    CreateStep1PhotoScreen.isReportingActive = true;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('last_captured_image_path', pathOrUrl);
      await prefs.setBool('is_reporting_active', true);
    } catch (_) {}

    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => AiAnalysisScreen(
            category: 'Pothole / Civic Defect',
            description: 'Civic issue captured via evidence camera.',
            lat: 12.3052,
            lng: 76.6553,
            imagePath: pathOrUrl,
          ),
        ),
      );
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? photo = await _picker.pickImage(
        source: source,
        maxWidth: 800,
        maxHeight: 800,
        imageQuality: 70,
      );
      if (photo != null) {
        CreateStep1PhotoScreen.lastCapturedImagePath = photo.path;
        setState(() {
          _pickedFile = photo;
          _hasCapturedPhoto = true;
          _photoSource = source == ImageSource.camera ? 'Device Camera' : 'Phone Gallery';
        });

        await _proceedToAiScan(photo.path);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Camera notice: $e. Please pick an image from gallery.')),
        );
      }
    }
  }

  Widget _buildImagePreview() {
    final path = _pickedFile?.path ?? CreateStep1PhotoScreen.lastCapturedImagePath;
    if (path == null || path.isEmpty) {
      return Container(
        height: 220,
        width: double.infinity,
        color: NeuColors.background,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.add_a_photo_outlined, size: 56, color: NeuColors.primary),
            SizedBox(height: 12),
            Text(
              'No photo captured yet',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: NeuColors.textMain),
            ),
            SizedBox(height: 4),
            Text(
              'Tap Open Camera or Gallery below to take a picture of the issue',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: NeuColors.textMuted),
            ),
          ],
        ),
      );
    }

    if (path.startsWith('http')) {
      return Image.network(
        path,
        height: 220,
        width: double.infinity,
        fit: BoxFit.cover,
      );
    } else if (kIsWeb) {
      return Image.network(
        path,
        height: 220,
        width: double.infinity,
        fit: BoxFit.cover,
      );
    } else {
      return Image.file(
        File(path),
        height: 220,
        width: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (ctx, err, stack) => Container(
          height: 220,
          color: Colors.grey[300],
          child: const Center(child: Icon(Icons.broken_image, size: 48)),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Step 1 of 4: Capture Evidence', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    NeuContainer(
                      padding: 16,
                      borderRadius: 20,
                      child: Column(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(16),
                            child: _buildImagePreview(),
                          ),
                          const SizedBox(height: 12),
                          if (_hasCapturedPhoto)
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.check_circle, color: NeuColors.success, size: 18),
                                const SizedBox(width: 6),
                                Text('Photo Captured via $_photoSource', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: NeuColors.success)),
                              ],
                            ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              Expanded(
                                child: NeuButton(
                                  text: '📷 Open Camera',
                                  isPrimary: true,
                                  onPressed: () => _pickImage(ImageSource.camera),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: NeuButton(
                                  text: '🖼️ Gallery',
                                  onPressed: () => _pickImage(ImageSource.gallery),
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'Run AI Vision 5s Scan →',
                isPrimary: true,
                onPressed: () {
                  final finalPath = _pickedFile?.path ?? CreateStep1PhotoScreen.lastCapturedImagePath;
                  if (finalPath == null || finalPath.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please capture or select a photo first using Camera or Gallery.')),
                    );
                    return;
                  }
                  _proceedToAiScan(finalPath);
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}

