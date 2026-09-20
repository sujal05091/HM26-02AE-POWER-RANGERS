import 'dart:async';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../neumorphic/neumorphic_ui.dart';
import '../models/complaint.dart';
import '../services/api_service.dart';
import 'create_step1_photo.dart';
import 'complaint_details_screen.dart';
import 'login_screen.dart';
import 'signup_screen.dart';

class HomeScreen extends StatefulWidget {
  final Map<String, dynamic>? userProfile;

  const HomeScreen({super.key, this.userProfile});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Complaint> _complaints = [];
  bool _loading = true;
  int _selectedNavIndex = 0;
  String _activeCategoryFilter = 'All';
  Timer? _pollTimer;

  @override
  void initState() {
    super.initState();
    _loadComplaints();
    // 3-second background polling timer for real-time Web Dashboard status sync
    _pollTimer = Timer.periodic(const Duration(seconds: 3), (_) {
      if (mounted) {
        _loadComplaints(isSilent: true);
      }
    });
  }

  @override
  void dispose() {
    _pollTimer?.cancel();
    super.dispose();
  }

  Future<void> _loadComplaints({bool isSilent = false}) async {
    try {
      if (!isSilent) setState(() => _loading = true);
      final list = await ApiService.fetchComplaints();
      if (mounted) {
        setState(() {
          _complaints = list;
          _loading = false;
        });
      }
    } catch (e) {
      if (mounted && !isSilent) {
        setState(() => _loading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = widget.userProfile;
    final userName = user?['name'] ?? 'Mysuru Resident';
    final userWard = user?['ward'] ?? 'Ward 42 — Devaraja / Agrahara';

    return Scaffold(
      backgroundColor: NeuColors.background,
      body: SafeArea(
        child: IndexedStack(
          index: _selectedNavIndex,
          children: [
            // TAB 0: HOME DASHBOARD
            _buildHomeTab(userName, userWard, user != null),

            // TAB 1: ALL REPORTS VIEW
            _buildReportsTab(),

            // TAB 2: MAP & WARDS VIEW
            _buildMapWardsTab(),

            // TAB 3: USER PROFILE & AUTH VIEW
            _buildProfileTab(user),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedNavIndex,
        onTap: (idx) {
          setState(() => _selectedNavIndex = idx);
          if (idx == 0 || idx == 1) {
            _loadComplaints();
          }
        },
        selectedItemColor: NeuColors.primary,
        unselectedItemColor: NeuColors.textMuted,
        backgroundColor: NeuColors.background,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.description_outlined), label: 'My Reports'),
          BottomNavigationBarItem(icon: Icon(Icons.map_outlined), label: 'Map & Wards'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Profile'),
        ],
      ),
    );
  }

  // TAB 0: Home Dashboard
  Widget _buildHomeTab(String name, String ward, bool isLoggedIn) {
    final localCount = ApiService.localSubmittedComplaints.length;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Header Greeting
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Good day 👋', style: TextStyle(fontSize: 13, color: NeuColors.textMuted)),
                  const SizedBox(height: 2),
                  Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                ],
              ),
              GestureDetector(
                onTap: () {
                  if (!isLoggedIn) {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
                  } else {
                    setState(() => _selectedNavIndex = 3);
                  }
                },
                child: NeuBadge(status: isLoggedIn ? 'Logged In' : 'Sign In'),
              )
            ],
          ),
          const SizedBox(height: 20),

          // Primary Camera Action Banner
          NeuContainer(
            padding: 20,
            color: NeuColors.background,
            onTap: () async {
              CreateStep1PhotoScreen.isReportingActive = true;
              CreateStep1PhotoScreen.lastCapturedImagePath = null;
              try {
                final prefs = await SharedPreferences.getInstance();
                await prefs.setBool('is_reporting_active', true);
                await prefs.remove('last_captured_image_path');
              } catch (_) {}
              if (!mounted) return;
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const CreateStep1PhotoScreen()),
              );
            },
            child: Row(
              children: [
                NeuContainer(
                  padding: 14,
                  borderRadius: 16,
                  color: NeuColors.primary,
                  child: const Icon(Icons.camera_alt, color: Colors.white, size: 28),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Report a Civic Issue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                      SizedBox(height: 4),
                      Text('Open camera & capture photo evidence', style: TextStyle(fontSize: 12, color: NeuColors.primary, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
                const Icon(Icons.arrow_forward_ios, size: 16, color: NeuColors.textMuted),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // User's Submitted Active Reports Summary Card
          NeuContainer(
            padding: 16,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.my_location, size: 18, color: NeuColors.primary),
                        const SizedBox(width: 8),
                        Text(
                          'Your Active Reports ($localCount)',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: NeuColors.textMain),
                        ),
                      ],
                    ),
                    GestureDetector(
                      onTap: () => setState(() => _selectedNavIndex = 1),
                      child: const Text('My Reports Tab →', style: TextStyle(fontSize: 11, color: NeuColors.primary, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  localCount > 0
                      ? 'You have $localCount active report(s) submitted to MCC Ward 42.'
                      : 'No active reports filed yet by you. Tap above to snap a photo issue!',
                  style: const TextStyle(fontSize: 11, color: NeuColors.textMuted),
                ),
                if (ApiService.localSubmittedComplaints.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  _buildComplaintCard(ApiService.localSubmittedComplaints.first),
                ],
              ],
            ),
          ),
          const SizedBox(height: 24),

          // All Firebase Live Reports Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('All Mysuru Civic Reports (${_complaints.length})', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
              GestureDetector(
                onTap: () => setState(() => _selectedNavIndex = 1),
                child: const Text('View All →', style: TextStyle(fontSize: 12, color: NeuColors.primary, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 12),

          if (_loading)
            const Center(child: Padding(
              padding: EdgeInsets.all(32.0),
              child: CircularProgressIndicator(),
            ))
          else if (_complaints.isEmpty)
            const NeuContainer(
              padding: 24,
              child: Center(
                child: Text('No active civic reports found.', style: TextStyle(color: NeuColors.textMuted)),
              ),
            )
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _complaints.length > 5 ? 5 : _complaints.length,
              separatorBuilder: (ctx, idx) => const SizedBox(height: 10),
              itemBuilder: (ctx, idx) {
                final item = _complaints[idx];
                return _buildComplaintCard(item);
              },
            ),
        ],
      ),
    );
  }

  // TAB 1: My Reports & All City Complaints View
  Widget _buildReportsTab() {
    final filters = ['All', 'My Reports', 'In Progress', 'Assigned', 'Reported', 'Resolved', 'Escalated'];
    final user = widget.userProfile;
    final userEmail = user?['email'] ?? 'citizen@civicroute.org';

    List<Complaint> displayList = _complaints;
    if (_activeCategoryFilter == 'My Reports') {
      displayList = ApiService.localSubmittedComplaints.isNotEmpty
          ? ApiService.localSubmittedComplaints
          : _complaints.take(2).toList();
    } else if (_activeCategoryFilter != 'All') {
      displayList = _complaints.where((c) => c.status.toLowerCase() == _activeCategoryFilter.toLowerCase()).toList();
    }

    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Mysuru Civic Reports', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
                  const SizedBox(height: 2),
                  Text('User: $userEmail • ${ApiService.localSubmittedComplaints.length} Filed by You', style: const TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                ],
              ),
              NeuBadge(status: '${displayList.length} Items'),
            ],
          ),
          const SizedBox(height: 16),

          // Status Filter Tabs
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: filters.map((f) {
                final isSel = _activeCategoryFilter == f;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: NeuContainer(
                    padding: 8,
                    color: isSel ? NeuColors.primary : NeuColors.background,
                    onTap: () => setState(() => _activeCategoryFilter = f),
                    child: Text(
                      f,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: isSel ? Colors.white : NeuColors.textMain,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),

          Expanded(
            child: displayList.isEmpty
                ? const Center(child: Text('No complaints found matching this filter.', style: TextStyle(color: NeuColors.textMuted)))
                : ListView.separated(
                    itemCount: displayList.length,
                    separatorBuilder: (ctx, idx) => const SizedBox(height: 10),
                    itemBuilder: (ctx, idx) => _buildComplaintCard(displayList[idx]),
                  ),
          ),
        ],
      ),
    );
  }

  // TAB 2: Map & Wards
  Widget _buildMapWardsTab() {
    final wards = [
      {'name': 'Ward 42 — Devaraja / Agrahara', 'zone': 'Zone 4', 'count': '142 complaints'},
      {'name': 'Ward 38 — Vijayanagar 2nd Stage', 'zone': 'Zone 3', 'count': '98 complaints'},
      {'name': 'Ward 41 — Gokulam 3rd Stage', 'zone': 'Zone 5', 'count': '115 complaints'},
      {'name': 'Ward 12 — Kuvempunagar Complex', 'zone': 'Zone 2', 'count': '164 complaints'},
      {'name': 'Ward 15 — Saraswathipuram', 'zone': 'Zone 2', 'count': '87 complaints'},
      {'name': 'Ward 22 — Hebbal Industrial Zone', 'zone': 'Zone 1', 'count': '76 complaints'},
      {'name': 'Ward 30 — Chamundipuram', 'zone': 'Zone 4', 'count': '103 complaints'},
    ];

    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Mysuru Municipal Wards', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
          const SizedBox(height: 4),
          const Text('Jurisdiction boundaries & ward analytics', style: TextStyle(fontSize: 12, color: NeuColors.textMuted)),
          const SizedBox(height: 16),

          NeuContainer(
            padding: 16,
            child: const Row(
              children: [
                Icon(Icons.location_on, color: NeuColors.primary, size: 28),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Active Jurisdiction: Mysuru V3 Boundaries', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                      Text('14 Wards synced with Firebase Firestore', style: TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                    ],
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 16),

          Expanded(
            child: ListView.separated(
              itemCount: wards.length,
              separatorBuilder: (ctx, idx) => const SizedBox(height: 10),
              itemBuilder: (ctx, idx) {
                final w = wards[idx];
                return NeuContainer(
                  padding: 14,
                  child: Row(
                    children: [
                      CircleAvatar(
                        backgroundColor: NeuColors.primary.withValues(alpha: 0.1),
                        child: Text('${idx + 1}', style: const TextStyle(color: NeuColors.primary, fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(w['name']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                            const SizedBox(height: 2),
                            Text('${w['zone']} • ${w['count']}', style: const TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                          ],
                        ),
                      ),
                      const NeuBadge(status: 'Active'),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // TAB 3: Profile & Authentication Screen
  Widget _buildProfileTab(Map<String, dynamic>? user) {
    final isLoggedIn = user != null;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('User Profile & Governance', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
          const SizedBox(height: 4),
          const Text('Manage authentication & jurisdiction profile', style: TextStyle(fontSize: 12, color: NeuColors.textMuted)),
          const SizedBox(height: 20),

          NeuContainer(
            padding: 20,
            child: Row(
              children: [
                NeuContainer(
                  padding: 16,
                  borderRadius: 50,
                  child: const Icon(Icons.person, size: 36, color: NeuColors.primary),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        isLoggedIn ? (user['name'] ?? 'Citizen Mysuru') : 'Guest User',
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: NeuColors.textMain),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        isLoggedIn ? (user['email'] ?? 'citizen@civicroute.org') : 'Not signed in',
                        style: const TextStyle(fontSize: 12, color: NeuColors.textMuted),
                      ),
                      const SizedBox(height: 6),
                      NeuBadge(status: isLoggedIn ? (user['role'] ?? 'citizen').toUpperCase() : 'GUEST MODE'),
                    ],
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 24),

          if (!isLoggedIn) ...[
            const Text('Sign In or Register', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 12),
            NeuContainer(
              padding: 16,
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
              },
              child: const Row(
                children: [
                  Icon(Icons.login, color: NeuColors.primary),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Sign In to Account', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text('Access complaints and officer dispatch', style: TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                      ],
                    ),
                  ),
                  Icon(Icons.arrow_forward_ios, size: 14, color: NeuColors.textMuted),
                ],
              ),
            ),
            const SizedBox(height: 12),
            NeuContainer(
              padding: 16,
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const SignupScreen()));
              },
              child: const Row(
                children: [
                  Icon(Icons.person_add_outlined, color: NeuColors.primary),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Create New Account', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text('Register with your Mysuru ward address', style: TextStyle(fontSize: 11, color: NeuColors.textMuted)),
                      ],
                    ),
                  ),
                  Icon(Icons.arrow_forward_ios, size: 14, color: NeuColors.textMuted),
                ],
              ),
            ),
          ] else ...[
            const Text('Account Information', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
            const SizedBox(height: 12),
            NeuContainer(
              padding: 14,
              child: Column(
                children: [
                  _buildProfileRow('Phone', user['phone'] ?? '+91 98765 43210'),
                  const Divider(),
                  _buildProfileRow('Ward Jurisdiction', user['ward'] ?? 'Ward 42 — Devaraja / Agrahara'),
                  const Divider(),
                  _buildProfileRow('Firebase Status', 'Synced (civicroute-mysuru)'),
                ],
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'Sign Out',
                isPrimary: false,
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginScreen()),
                  );
                },
              ),
            ),
          ]
        ],
      ),
    );
  }

  Widget _buildProfileRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 12, color: NeuColors.textMuted)),
          Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
        ],
      ),
    );
  }

  Widget _buildComplaintCardImage(String path) {
    if (path.isEmpty) {
      return Container(width: 54, height: 54, color: Colors.grey.shade300, child: const Icon(Icons.broken_image, size: 20, color: Colors.grey));
    }
    if (path.startsWith('http')) {
      return Image.network(
        path,
        width: 54,
        height: 54,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) => Container(width: 54, height: 54, color: Colors.grey.shade300, child: const Icon(Icons.broken_image, size: 20, color: Colors.grey)),
      );
    } else if (kIsWeb) {
      return Image.network(path, width: 54, height: 54, fit: BoxFit.cover);
    } else {
      return Image.file(
        File(path),
        width: 54,
        height: 54,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) => Container(width: 54, height: 54, color: Colors.grey.shade300, child: const Icon(Icons.broken_image, size: 20, color: Colors.grey)),
      );
    }
  }

  Widget _buildComplaintCard(Complaint item) {
    String statusMsg = '📩 Report Submitted & Auto-Routed';
    Color statusColor = NeuColors.primary;

    if (item.status == 'In Progress' || item.status == 'Assigned') {
      statusMsg = '✅ Accepted by Officer! Work in progress';
      statusColor = const Color(0xFFD97706);
    } else if (item.status == 'Resolved') {
      statusMsg = '🎉 Work Completed & Verified!';
      statusColor = const Color(0xFF16A34A);
    } else if (item.status == 'Escalated') {
      statusMsg = '⚠️ Escalated to Senior Executive';
      statusColor = const Color(0xFFDC2626);
    }

    return NeuContainer(
      padding: 14,
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ComplaintDetailsScreen(complaint: item)),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: _buildComplaintCardImage(item.beforeImageUrl),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(item.category, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        NeuBadge(status: item.status),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(item.address, style: const TextStyle(fontSize: 11, color: NeuColors.textMuted), maxLines: 1, overflow: TextOverflow.ellipsis),
                    const SizedBox(height: 4),
                    Text('🔑 Session: ${item.sessionToken.isNotEmpty ? item.sessionToken : 'SES-${item.id}'}', style: const TextStyle(fontSize: 10, color: NeuColors.textMuted, fontFamily: 'monospace')),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: statusColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: statusColor.withValues(alpha: 0.3)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    statusMsg,
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: statusColor),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Text(item.slaFormatted, style: TextStyle(fontSize: 10, color: statusColor, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
