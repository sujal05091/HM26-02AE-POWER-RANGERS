import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'create_step3_details.dart';

class CreateStep2CategoryScreen extends StatefulWidget {
  final String imagePath;

  const CreateStep2CategoryScreen({super.key, this.imagePath = ''});

  @override
  State<CreateStep2CategoryScreen> createState() => _CreateStep2CategoryScreenState();
}

class _CreateStep2CategoryScreenState extends State<CreateStep2CategoryScreen> {
  String _selectedCategory = 'Pothole';

  final List<Map<String, dynamic>> _categories = [
    {'title': 'Pothole', 'icon': Icons.warning_amber_outlined},
    {'title': 'Garbage Overflow', 'icon': Icons.delete_outline},
    {'title': 'Drainage Blockage', 'icon': Icons.invert_colors},
    {'title': 'Broken Streetlight', 'icon': Icons.lightbulb_outline},
    {'title': 'Illegal Dumping', 'icon': Icons.delete_sweep},
    {'title': 'Infrastructure Damage', 'icon': Icons.build_outlined},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Step 2 of 4: Select Category', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.2,
                ),
                itemCount: _categories.length,
                itemBuilder: (context, index) {
                  final cat = _categories[index];
                  final isSelected = _selectedCategory == cat['title'];
                  return NeuContainer(
                    isPressed: isSelected,
                    onTap: () => setState(() => _selectedCategory = cat['title']),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(cat['icon'], size: 32, color: isSelected ? NeuColors.primary : NeuColors.textMain),
                        const SizedBox(height: 8),
                        Text(
                          cat['title'],
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            color: isSelected ? NeuColors.primary : NeuColors.textMain,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'Next: Description Details',
                isPrimary: true,
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CreateStep3DetailsScreen(
                        category: _selectedCategory,
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
