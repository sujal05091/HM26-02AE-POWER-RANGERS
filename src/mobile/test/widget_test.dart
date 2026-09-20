import 'package:flutter_test/flutter_test.dart';
import 'package:civicroute_mobile/main.dart';

void main() {
  testWidgets('CivicRoute App Smoke Test', (WidgetTester tester) async {
    await tester.pumpWidget(const CivicRouteApp());
    expect(find.text('CivicRoute'), findsOneWidget);
  });
}
