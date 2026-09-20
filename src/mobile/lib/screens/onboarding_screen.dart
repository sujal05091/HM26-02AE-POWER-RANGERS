import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'login_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int _currentIndex = 0;

  final List<Map<String, String>> _pages = [
    {
      'title': 'Report Civic Issues',
      'desc': 'Capture a photo and tell us what needs fixing in your area.',
      'icon': 'camera_alt'
    },
    {
      'title': 'Automatic Civic Routing',
      'desc': 'We determine responsible ward, department, officer, and tender.',
      'icon': 'alt_route'
    },
    {
      'title': 'Track & Verify',
      'desc': 'Follow SLA countdowns and inspect before/after resolution evidence.',
      'icon': 'verified_user'
    }
  ];

  @override
  Widget build(BuildContext context) {
    final page = _pages[_currentIndex];

    return Scaffold(
      backgroundColor: NeuColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topRight,
                child: TextButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => const LoginScreen()),
                    );
                  },
                  child: const Text('Skip to Login', style: TextStyle(color: NeuColors.primary, fontWeight: FontWeight.bold)),
                ),
              ),
              const Spacer(),
              NeuContainer(
                padding: 32,
                borderRadius: 100,
                child: Icon(
                  _currentIndex == 0
                      ? Icons.camera_alt_outlined
                      : _currentIndex == 1
                          ? Icons.alt_route
                          : Icons.verified_user_outlined,
                  size: 64,
                  color: NeuColors.primary,
                ),
              ),
              const SizedBox(height: 32),
              Text(
                page['title']!,
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: NeuColors.textMain),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                page['desc']!,
                style: const TextStyle(fontSize: 14, color: NeuColors.textMuted, height: 1.4),
                textAlign: TextAlign.center,
              ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  _pages.length,
                  (index) => Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: _currentIndex == index ? 24 : 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: _currentIndex == index ? NeuColors.primary : Colors.grey.shade400,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: _currentIndex == _pages.length - 1 ? 'Get Started — Sign In' : 'Next',
                  isPrimary: true,
                  onPressed: () {
                    if (_currentIndex < _pages.length - 1) {
                      setState(() => _currentIndex++);
                    } else {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (context) => const LoginScreen()),
                      );
                    }
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
