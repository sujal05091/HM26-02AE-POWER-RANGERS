import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'create_step1_photo.dart';
import 'ai_analysis_screen.dart';
import 'home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _checkLostDataAndNavigate();
  }

  Future<void> _checkLostDataAndNavigate() async {
    final prefs = await SharedPreferences.getInstance();
    String? recoveredPath;

    // Retrieve lost image picker data if Android process was recreated by OS
    try {
      final LostDataResponse response = await _picker.retrieveLostData();
      if (!response.isEmpty && response.file != null) {
        recoveredPath = response.file!.path;
        await prefs.setString('last_captured_image_path', recoveredPath);
        await prefs.setBool('is_reporting_active', true);
        CreateStep1PhotoScreen.lastCapturedImagePath = recoveredPath;
        CreateStep1PhotoScreen.isReportingActive = true;
      }
    } catch (_) {}

    await Future.delayed(const Duration(milliseconds: 800));
    if (!mounted) return;

    final storedPath = prefs.getString('last_captured_image_path');
    final isReportingActive = prefs.getBool('is_reporting_active') ?? false;

    final targetPath = recoveredPath ?? storedPath ?? CreateStep1PhotoScreen.lastCapturedImagePath;

    if (targetPath != null && targetPath.isNotEmpty) {
      CreateStep1PhotoScreen.lastCapturedImagePath = targetPath;
      CreateStep1PhotoScreen.isReportingActive = true;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => AiAnalysisScreen(
            category: 'Pothole / Civic Defect',
            description: 'Civic issue evidence photo.',
            lat: 12.3052,
            lng: 76.6553,
            imagePath: targetPath,
          ),
        ),
      );
    } else if (isReportingActive || CreateStep1PhotoScreen.isReportingActive) {
      CreateStep1PhotoScreen.isReportingActive = true;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const CreateStep1PhotoScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            NeuContainer(
              padding: 24,
              borderRadius: 50,
              child: const Icon(Icons.shield_outlined, size: 56, color: NeuColors.primary),
            ),
            const SizedBox(height: 24),
            const Text(
              'CivicRoute',
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: NeuColors.textMain),
            ),
            const SizedBox(height: 8),
            const Text(
              'Report it. Route it. Track it.',
              style: TextStyle(fontSize: 14, color: NeuColors.textMuted, fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 36),
            const CircularProgressIndicator(color: NeuColors.primary),
          ],
        ),
      ),
    );
  }
}
