import 'package:flutter/material.dart';

class NeuColors {
  static const Color background = Color(0xFFE6ECF5);
  static const Color textMain = Color(0xFF1E293B);
  static const Color textMuted = Color(0xFF64748B);
  static const Color primary = Color(0xFF2563EB);
  static const Color success = Color(0xFF16A34A);
  static const Color warning = Color(0xFFD97706);
  static const Color danger = Color(0xFFDC2626);
  static const Color lightShadow = Colors.white;
  static const Color darkShadow = Color(0xFFC3CEE0);
}

class NeuContainer extends StatelessWidget {
  final Widget child;
  final double padding;
  final double borderRadius;
  final bool isPressed;
  final VoidCallback? onTap;
  final Color? color;

  const NeuContainer({
    Key? key,
    required this.child,
    this.padding = 16.0,
    this.borderRadius = 16.0,
    this.isPressed = false,
    this.onTap,
    this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: EdgeInsets.all(padding),
        decoration: BoxDecoration(
          color: color ?? NeuColors.background,
          borderRadius: BorderRadius.circular(borderRadius),
          boxShadow: isPressed
              ? [
                  const BoxShadow(
                    color: NeuColors.darkShadow,
                    offset: Offset(3, 3),
                    blurRadius: 6,
                  ),
                  const BoxShadow(
                    color: NeuColors.lightShadow,
                    offset: Offset(-3, -3),
                    blurRadius: 6,
                  ),
                ]
              : [
                  const BoxShadow(
                    color: NeuColors.darkShadow,
                    offset: Offset(6, 6),
                    blurRadius: 14,
                  ),
                  const BoxShadow(
                    color: NeuColors.lightShadow,
                    offset: Offset(-6, -6),
                    blurRadius: 14,
                  ),
                ],
        ),
        child: child,
      ),
    );
  }
}

class NeuButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isPrimary;
  final IconData? icon;

  const NeuButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isPrimary = false,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        decoration: BoxDecoration(
          color: isPrimary ? NeuColors.primary : NeuColors.background,
          borderRadius: BorderRadius.circular(12),
          boxShadow: isPrimary
              ? [
                  BoxShadow(
                    color: NeuColors.primary.withAlpha(102),
                    offset: const Offset(4, 4),
                    blurRadius: 10,
                  ),
                ]
              : [
                  const BoxShadow(
                    color: NeuColors.darkShadow,
                    offset: Offset(4, 4),
                    blurRadius: 10,
                  ),
                  const BoxShadow(
                    color: NeuColors.lightShadow,
                    offset: Offset(-4, -4),
                    blurRadius: 10,
                  ),
                ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 18, color: isPrimary ? Colors.white : NeuColors.primary),
              const SizedBox(width: 8),
            ],
            Text(
              text,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 14,
                color: isPrimary ? Colors.white : NeuColors.textMain,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class NeuBadge extends StatelessWidget {
  final String status;

  const NeuBadge({Key? key, required this.status}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Color statusColor = NeuColors.primary;
    if (['Resolved', 'On Track'].contains(status)) statusColor = NeuColors.success;
    if (['In Progress', 'Assigned', 'Warning'].contains(status)) statusColor = NeuColors.warning;
    if (['Escalated', 'Overdue'].contains(status)) statusColor = NeuColors.danger;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: NeuColors.background,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(color: NeuColors.darkShadow, offset: Offset(2, 2), blurRadius: 4),
          BoxShadow(color: NeuColors.lightShadow, offset: Offset(-2, -2), blurRadius: 4),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: BoxDecoration(color: statusColor, shape: BoxShape.circle),
          ),
          const SizedBox(width: 6),
          Text(
            status,
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: statusColor),
          ),
        ],
      ),
    );
  }
}
