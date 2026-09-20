import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../neumorphic/neumorphic_ui.dart';
import '../services/api_service.dart';
import 'create_step1_photo.dart';
import 'home_screen.dart';

class RoutingResultScreen extends StatefulWidget {
  final String category;
  final String description;
  final double lat;
  final double lng;
  final String imagePath;

  const RoutingResultScreen({
    super.key,
    required this.category,
    required this.description,
    required this.lat,
    required this.lng,
    this.imagePath = '',
  });

  @override
  State<RoutingResultScreen> createState() => _RoutingResultScreenState();
}

class _RoutingResultScreenState extends State<RoutingResultScreen> {
  bool _submitted = false;

  @override
  void initState() {
    super.initState();
    _submitToFirebase();
  }

  Future<void> _submitToFirebase() async {
    String? uploadedUrl;
    if (widget.imagePath.isNotEmpty) {
      uploadedUrl = await ApiService.uploadImageToCloudinary(widget.imagePath);
    }

    await ApiService.submitComplaint(
      category: widget.category,
      description: widget.description,
      lat: widget.lat,
      lng: widget.lng,
      imageUrl: uploadedUrl,
    );

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('last_captured_image_path');
      await prefs.setBool('is_reporting_active', false);
      CreateStep1PhotoScreen.lastCapturedImagePath = null;
      CreateStep1PhotoScreen.isReportingActive = false;
    } catch (_) {}

    if (mounted) {
      setState(() => _submitted = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Complaint Registered & Routed', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Red High Priority / Escalated Alert Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEF2F2),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFEF4444), width: 2),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x33EF4444),
                      blurRadius: 16,
                      spreadRadius: 2,
                    )
                  ],
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: const BoxDecoration(
                        color: Color(0xFFEF4444),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.warning_amber_rounded, color: Colors.white, size: 24),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'HIGH PRIORITY — IMMEDIATE DISPATCH',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF991B1B)),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Report auto-routed via AI & mapped to MCC Ward 42 Road Engineering Division.',
                            style: TextStyle(fontSize: 11, color: Color(0xFFB91C1C)),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Routing Details Card
              NeuContainer(
                padding: 20,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(widget.category, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        const NeuBadge(status: 'HIGH PRIORITY'),
                      ],
                    ),
                    const SizedBox(height: 4),
                    const Text('Ticket ID: #HM-1026 • Synced with Firebase', style: TextStyle(fontSize: 12, color: NeuColors.primary, fontWeight: FontWeight.bold)),
                    const Divider(height: 24),

                    const Text('RESPONSIBLE AUTHORITY', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMuted)),
                    const SizedBox(height: 2),
                    const Text('Mysuru City Corporation (MCC)', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                    const SizedBox(height: 12),

                    const Text('RESPONSIBLE DEPARTMENT', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMuted)),
                    const SizedBox(height: 2),
                    const Text('Road Engineering & Infrastructure Division', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                    const SizedBox(height: 12),

                    const Text('ASSIGNED OFFICER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMuted)),
                    const SizedBox(height: 2),
                    const Text('Eng. Rajesh Kumar (Senior AEE, Ward 42)', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                    const SizedBox(height: 12),

                    const Text('ACTIVE SERVICE CONTRACT / TENDER', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMuted)),
                    const SizedBox(height: 2),
                    const Text('Tender RM-2042 — Mysore Infrastructure Corp', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                    const SizedBox(height: 12),

                    const Text('EXPECTED RESOLUTION SLA', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMuted)),
                    const SizedBox(height: 2),
                    const Text('24 Hours SLA Clock (Active Escrow Monitoring)', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFFDC2626))),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: _submitted ? 'Track Report Status & Done' : 'Saving to Firebase...',
                  isPrimary: true,
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (context) => const HomeScreen()),
                      (route) => false,
                    );
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
