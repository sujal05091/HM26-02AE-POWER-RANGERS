import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import '../services/api_service.dart';
import 'home_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController _nameController = TextEditingController(text: 'Mysuru Resident');
  final TextEditingController _emailController = TextEditingController(text: 'citizen.new@civicroute.org');
  final TextEditingController _passwordController = TextEditingController(text: 'password123');
  final TextEditingController _phoneController = TextEditingController(text: '+91 98765 00000');
  String _selectedWard = 'Ward 42 — Devaraja / Agrahara';
  bool _loading = false;

  final List<String> _wards = [
    'Ward 42 — Devaraja / Agrahara',
    'Ward 38 — Vijayanagar 2nd Stage',
    'Ward 41 — Gokulam 3rd Stage',
    'Ward 12 — Kuvempunagar Complex',
    'Ward 15 — Saraswathipuram',
    'Ward 22 — Hebbal Industrial Zone',
    'Ward 30 — Chamundipuram',
    'Ward 05 — Metagalli'
  ];

  Future<void> _handleSignup() async {
    if (_nameController.text.isEmpty || _emailController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please fill required fields')));
      return;
    }
    setState(() => _loading = true);
    final res = await ApiService.register(
      _nameController.text.trim(),
      _emailController.text.trim(),
      _passwordController.text.trim(),
      _phoneController.text.trim(),
    );
    if (mounted) setState(() => _loading = false);

    if (mounted) {
      final user = res['user'] ?? {
        'name': _nameController.text.trim(),
        'email': _emailController.text.trim(),
        'role': 'citizen',
        'ward': _selectedWard
      };
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Account successfully created on Firebase!')),
      );
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen(userProfile: user)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Create Account', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Full Name', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 4,
                child: TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.person_outline, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'Enter full name...',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              const Text('Email Address', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 4,
                child: TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.email_outlined, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'Enter email address...',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              const Text('Phone Number', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 4,
                child: TextField(
                  controller: _phoneController,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.phone_outlined, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'Enter phone number...',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 16),

              const Text('Mysuru Ward Jurisdiction', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 12,
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedWard,
                    isExpanded: true,
                    icon: const Icon(Icons.arrow_drop_down, color: NeuColors.primary),
                    items: _wards.map((w) => DropdownMenuItem(value: w, child: Text(w, style: const TextStyle(fontSize: 13)))).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedWard = val);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 16),

              const Text('Password', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 4,
                child: TextField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.lock_outline, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'Choose a password...',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 28),

              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: _loading ? 'Creating Firebase Account...' : 'Complete Sign Up',
                  isPrimary: true,
                  onPressed: _handleSignup,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
