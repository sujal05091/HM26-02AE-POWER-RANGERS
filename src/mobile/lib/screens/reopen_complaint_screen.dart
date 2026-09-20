import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';

class ReopenComplaintScreen extends StatefulWidget {
  final String complaintId;

  const ReopenComplaintScreen({Key? key, required this.complaintId}) : super(key: key);

  @override
  State<ReopenComplaintScreen> createState() => _ReopenComplaintScreenState();
}

class _ReopenComplaintScreenState extends State<ReopenComplaintScreen> {
  final TextEditingController _reasonController = TextEditingController(
    text: 'Repair attempt was incomplete, pothole is still open.',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: Text('Reopen #${widget.complaintId}', style: const TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Why is the issue not fixed?', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            NeuContainer(
              padding: 4,
              child: TextField(
                controller: _reasonController,
                maxLines: 4,
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Explain ground situation...',
                  contentPadding: EdgeInsets.all(12),
                ),
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'Confirm & Reopen Complaint',
                isPrimary: true,
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Complaint reopened. Escalated back to field officer.')),
                  );
                  Navigator.pop(context);
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
