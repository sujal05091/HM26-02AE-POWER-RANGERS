import 'package:flutter/material.dart';
import 'neumorphic/neumorphic_ui.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const CivicRouteApp());
}

class CivicRouteApp extends StatelessWidget {
  const CivicRouteApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CivicRoute',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Inter',
        scaffoldBackgroundColor: NeuColors.background,
        colorScheme: ColorScheme.fromSeed(seedColor: NeuColors.primary),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}
