import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import '../models/complaint.dart';
import 'reopen_complaint_screen.dart';

class ComplaintDetailsScreen extends StatelessWidget {
  final Complaint complaint;

  const ComplaintDetailsScreen({Key? key, required this.complaint}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String statusMsg = '📩 Your complaint has been submitted and registered. Auto-routed to MCC Ward 42.';
    Color statusBg = NeuColors.background;
    Color statusBorder = NeuColors.primary;

    if (complaint.status == 'In Progress' || complaint.status == 'Assigned') {
      statusMsg = '✅ Report Accepted by Officer! ${complaint.officerName} accepted your report and dispatched field team for resolution.';
      statusBg = const Color(0xFFFEF3C7);
      statusBorder = const Color(0xFFD97706);
    } else if (complaint.status == 'Resolved') {
      statusMsg = '🎉 Work Completed & Verified! Field officer verified completion on site.';
      statusBg = const Color(0xFFDCFCE7);
      statusBorder = const Color(0xFF16A34A);
    } else if (complaint.status == 'Escalated') {
      statusMsg = '⚠️ Escalated to Chief Governance Director due to SLA deadline.';
      statusBg = const Color(0xFFFEE2E2);
      statusBorder = const Color(0xFFDC2626);
    }

    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: Text('${complaint.category} #${complaint.id}', style: const TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Card
              NeuContainer(
                padding: 16,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(complaint.category, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        NeuBadge(status: complaint.status),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text('📍 ${complaint.address}', style: const TextStyle(fontSize: 12, color: NeuColors.textMuted)),
                    const SizedBox(height: 4),
                    Text('🔑 Session Token: ${complaint.sessionToken.isNotEmpty ? complaint.sessionToken : 'SES-${complaint.id}'}', style: const TextStyle(fontSize: 11, color: NeuColors.primary, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Officer Real-Time Acceptance Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: statusBg,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: statusBorder, width: 1.5),
                ),
                child: Row(
                  children: [
                    Icon(
                      complaint.status == 'Resolved' ? Icons.check_circle : Icons.verified_user,
                      color: statusBorder,
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        statusMsg,
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: statusBorder == NeuColors.primary ? NeuColors.textMain : statusBorder),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Accountability Node Chain
              const Text('Responsibility Chain', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              NeuContainer(
                padding: 16,
                child: Column(
                  children: [
                    _buildChainNode('1. Location & Ward', complaint.wardName, Icons.location_on),
                    const Divider(height: 20),
                    _buildChainNode('2. Authority Body', complaint.authorityName, Icons.account_balance),
                    const Divider(height: 20),
                    _buildChainNode('3. Department Execution', complaint.departmentName, Icons.shield),
                    const Divider(height: 20),
                    _buildChainNode('4. Assigned Officer', complaint.officerName, Icons.person),
                    const Divider(height: 20),
                    _buildChainNode('5. Service Contract', 'RM-2042 Ward 42 Maintenance Contract', Icons.description),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Evidence Images (Before & After)
              const Text('Evidence & Proof Photographs', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              
              Text('Citizen Submitted Evidence:', style: TextStyle(fontSize: 11, color: Colors.grey.shade700, fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(complaint.beforeImageUrl, width: double.infinity, height: 180, fit: BoxFit.cover, errorBuilder: (ctx, err, stack) => Container(height: 140, color: Colors.grey.shade300, child: const Center(child: Icon(Icons.broken_image)))),
              ),

              if (complaint.afterImageUrl != null && complaint.afterImageUrl!.isNotEmpty) ...[
                const SizedBox(height: 16),
                const Text('Officer Resolution Proof Photo:', style: TextStyle(fontSize: 11, color: Color(0xFF16A34A), fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(complaint.afterImageUrl!, width: double.infinity, height: 180, fit: BoxFit.cover, errorBuilder: (ctx, err, stack) => Container(height: 140, color: Colors.green.shade100, child: const Center(child: Text('Resolution Verified')))),
                ),
              ],

              const SizedBox(height: 24),

              // Reopen Action Button
              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: 'Issue Still Exists? (Reopen)',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ReopenComplaintScreen(complaintId: complaint.id)),
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

  Widget _buildChainNode(String title, String subtitle, IconData icon) {
    return Row(
      children: [
        Icon(icon, size: 20, color: NeuColors.primary),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 11, color: NeuColors.textMuted, fontWeight: FontWeight.bold)),
            const SizedBox(height: 2),
            Text(subtitle, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
          ],
        )
      ],
    );
  }
}
