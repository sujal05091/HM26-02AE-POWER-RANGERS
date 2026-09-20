import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'create_step4_location.dart';

class CreateStep3DetailsScreen extends StatefulWidget {
  final String category;
  final String imagePath;

  const CreateStep3DetailsScreen({super.key, required this.category, this.imagePath = ''});

  @override
  State<CreateStep3DetailsScreen> createState() => _CreateStep3DetailsScreenState();
}

class _CreateStep3DetailsScreenState extends State<CreateStep3DetailsScreen> {
  final TextEditingController _descController = TextEditingController(
    text: 'Large dangerous road pothole causing traffic slowdown near school gate.',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Step 3 of 4: Describe Issue', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Selected Category: ${widget.category}', style: const TextStyle(fontWeight: FontWeight.bold, color: NeuColors.primary)),
            const SizedBox(height: 16),
            const Text('Issue Description & Landmarks', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            NeuContainer(
              padding: 4,
              child: TextField(
                controller: _descController,
                maxLines: 4,
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Enter details about the issue...',
                  contentPadding: EdgeInsets.all(12),
                ),
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'Next: Confirm GPS Location',
                isPrimary: true,
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CreateStep4LocationScreen(
                        category: widget.category,
                        description: _descController.text,
                        imagePath: widget.imagePath,
                      ),
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
