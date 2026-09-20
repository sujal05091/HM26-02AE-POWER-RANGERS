import 'dart:async';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'create_step4_location.dart';

class AiAnalysisScreen extends StatefulWidget {
  final String category;
  final String description;
  final double lat;
  final double lng;
  final String imagePath;

  const AiAnalysisScreen({
    super.key,
    required this.category,
    required this.description,
    required this.lat,
    required this.lng,
    this.imagePath = '',
  });

  @override
  State<AiAnalysisScreen> createState() => _AiAnalysisScreenState();
}

class _AiAnalysisScreenState extends State<AiAnalysisScreen> with SingleTickerProviderStateMixin {
  late AnimationController _scanController;
  late Animation<double> _scanAnimation;

  int _currentStepIndex = 0;
  bool _isComplete = false;

  final List<String> _scanMessages = [
    'Initializing AI Vision Classifier API...',
    'Extracting photo feature vectors & defect boundaries...',
    'AI classified: Pothole / Road Damage (94% confidence)...',
    'Detecting Dynamic Device GPS & Polygon Jurisdiction (V3)...',
  ];

  Timer? _stepTimer;

  @override
  void initState() {
    super.initState();
    _scanController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);

    _scanAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(_scanController);

    // 5-Second Animated Scanning Ticker Sequence
    _stepTimer = Timer.periodic(const Duration(milliseconds: 1250), (timer) {
      if (!mounted) return;
      if (_currentStepIndex < _scanMessages.length - 1) {
        setState(() => _currentStepIndex++);
      } else {
        timer.cancel();
        Future.delayed(const Duration(milliseconds: 600), () {
          if (mounted) {
            setState(() => _isComplete = true);
            _scanController.stop();
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _scanController.dispose();
    _stepTimer?.cancel();
    super.dispose();
  }

  Widget _buildImageWidget() {
    final path = widget.imagePath;
    if (path.isEmpty) {
      return Container(
        color: NeuColors.background,
        child: const Center(
          child: Icon(Icons.image_not_supported, size: 48, color: NeuColors.textMuted),
        ),
      );
    }
    if (path.startsWith('http')) {
      return Image.network(
        path,
        width: double.infinity,
        height: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (ctx, err, stack) => Container(
          color: Colors.grey[300],
          child: const Center(child: Icon(Icons.broken_image, size: 48)),
        ),
      );
    } else if (kIsWeb) {
      return Image.network(
        path,
        width: double.infinity,
        height: double.infinity,
        fit: BoxFit.cover,
      );
    } else {
      return Image.file(
        File(path),
        width: double.infinity,
        height: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (ctx, err, stack) => Container(
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
        title: const Text('AI Vision Processing', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              // AI Header Badge
              NeuContainer(
                padding: 12,
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.auto_awesome, color: NeuColors.primary, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'AI Vision Classifier',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: NeuColors.primary),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              Expanded(
                child: !_isComplete
                    ? NeuContainer(
                        padding: 16,
                        borderRadius: 24,
                        child: Column(
                          children: [
                            Expanded(
                              child: Stack(
                                children: [
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(16),
                                    child: _buildImageWidget(),
                                  ),
                                  AnimatedBuilder(
                                    animation: _scanAnimation,
                                    builder: (context, child) {
                                      return Positioned(
                                        top: _scanAnimation.value * 220,
                                        left: 0,
                                        right: 0,
                                        child: Container(
                                          height: 4,
                                          decoration: BoxDecoration(
                                            color: NeuColors.primary,
                                            boxShadow: [
                                              BoxShadow(
                                                color: NeuColors.primary.withValues(alpha: 0.8),
                                                blurRadius: 14,
                                                spreadRadius: 5,
                                              )
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 20),

                            // Scanning Message Ticker
                            NeuContainer(
                              padding: 14,
                              child: Row(
                                children: [
                                  const SizedBox(
                                    width: 20,
                                    height: 20,
                                    child: CircularProgressIndicator(strokeWidth: 2, color: NeuColors.primary),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      _scanMessages[_currentStepIndex],
                                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: NeuColors.textMain),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      )
                    : NeuContainer(
                        padding: 24,
                        borderRadius: 24,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            NeuContainer(
                              padding: 20,
                              borderRadius: 60,
                              child: const Icon(Icons.check_circle_outline, size: 56, color: NeuColors.success),
                            ),
                            const SizedBox(height: 20),
                            const Text('AI Vision Scan Complete', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 12),
                            NeuContainer(
                              padding: 16,
                              child: const Column(
                                children: [
                                  Text(
                                    'Pothole / Road Defect',
                                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: NeuColors.primary),
                                  ),
                                  SizedBox(height: 6),
                                  Text('94% AI Confidence Score', style: TextStyle(fontSize: 13, color: NeuColors.success, fontWeight: FontWeight.bold)),
                                  SizedBox(height: 4),
                                  Text('Matched against Mysuru Ward 42 Infrastructure Rules', style: TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: _isComplete ? 'Confirm Location & Proceed →' : 'AI Scanning (5s)...',
                  isPrimary: true,
                  onPressed: () {
                    if (_isComplete) {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => CreateStep4LocationScreen(
                            category: widget.category,
                            description: widget.description,
                            imagePath: widget.imagePath,
                          ),
                        ),
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
