import 'package:flutter/material.dart';
import '../neumorphic/neumorphic_ui.dart';
import '../services/api_service.dart';
import 'signup_screen.dart';
import 'home_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController(text: 'citizen@civicroute.org');
  final TextEditingController _passwordController = TextEditingController(text: 'password123');
  bool _loading = false;

  Future<void> _handleLogin() async {
    setState(() => _loading = true);
    final res = await ApiService.login(
      _emailController.text.trim(),
      _passwordController.text.trim(),
    );
    if (mounted) setState(() => _loading = false);

    if (mounted) {
      if (res['success'] == true) {
        final user = res['user'] ?? {};
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Welcome, ${user['name'] ?? 'Citizen'}!')),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => HomeScreen(userProfile: user),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(res['message'] ?? 'Login failed')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.topRight,
                child: TextButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => const HomeScreen()),
                    );
                  },
                  child: const Text('Continue as Guest →', style: TextStyle(color: NeuColors.primary, fontWeight: FontWeight.bold)),
                ),
              ),

              Center(
                child: NeuContainer(
                  padding: 24,
                  borderRadius: 60,
                  child: const Icon(Icons.person_outline, size: 48, color: NeuColors.primary),
                ),
              ),
              const SizedBox(height: 20),
              const Center(
                child: Text('Citizen Sign In', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: NeuColors.textMain)),
              ),
              const SizedBox(height: 4),
              const Center(
                child: Text('Sign in to report civic issues & track Mysuru ward services', style: TextStyle(fontSize: 12, color: NeuColors.textMuted)),
              ),
              const SizedBox(height: 24),

              const Text('Email Address', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 6),
              NeuContainer(
                padding: 4,
                child: TextField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.email_outlined, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'citizen@civicroute.org',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
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
                    prefixIcon: Icon(Icons.lock_clock_outlined, size: 20, color: NeuColors.primary),
                    border: InputBorder.none,
                    hintText: 'Enter password...',
                    contentPadding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                child: NeuButton(
                  text: _loading ? 'Signing In...' : 'Sign In as Citizen',
                  isPrimary: true,
                  onPressed: _handleLogin,
                ),
              ),
              const SizedBox(height: 20),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("New to CivicRoute? ", style: TextStyle(color: NeuColors.textMuted, fontSize: 13)),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const SignupScreen()),
                      );
                    },
                    child: const Text('Create Account', style: TextStyle(color: NeuColors.primary, fontWeight: FontWeight.bold, fontSize: 14)),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
