class Complaint {
  final String id;
  final String category;
  final String description;
  final double latitude;
  final double longitude;
  final String address;
  final String wardName;
  final String authorityName;
  final String departmentName;
  final String officerName;
  final String status;
  final String slaFormatted;
  final int aiConfidence;
  final String beforeImageUrl;
  final String? afterImageUrl;
  final String sessionToken;
  final String userName;
  final String userEmail;
  final String userPhone;
  final String createdAt;

  Complaint({
    required this.id,
    required this.category,
    required this.description,
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.wardName,
    required this.authorityName,
    required this.departmentName,
    required this.officerName,
    required this.status,
    required this.slaFormatted,
    required this.aiConfidence,
    required this.beforeImageUrl,
    this.afterImageUrl,
    this.sessionToken = '',
    this.userName = 'Citizen Mysuru',
    this.userEmail = 'citizen@civicroute.org',
    this.userPhone = '+91 98450 12345',
    this.createdAt = '',
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    final slaInfo = json['sla_info'] ?? {};
    return Complaint(
      id: json['id'] ?? 'HM-1000',
      category: json['category'] ?? 'Pothole',
      description: json['description'] ?? '',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 12.3051,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 76.6551,
      address: json['address'] ?? 'Mysuru',
      wardName: json['ward_name'] ?? 'Ward 42 — Agrahara',
      authorityName: json['authority_name'] ?? 'Mysuru City Corporation',
      departmentName: json['department_name'] ?? 'Road Engineering',
      officerName: json['officer_name'] ?? 'Eng. Rajesh Kumar',
      status: json['status'] ?? 'Reported',
      slaFormatted: slaInfo['remaining_formatted'] ?? '18h remaining',
      aiConfidence: json['ai_confidence'] ?? 94,
      beforeImageUrl: json['before_image_url'] ?? 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
      afterImageUrl: json['after_image_url'],
      sessionToken: json['session_token'] ?? 'SES-${json['id'] ?? '1000'}',
      userName: json['user_name'] ?? 'Citizen Mysuru',
      userEmail: json['user_email'] ?? 'citizen@civicroute.org',
      userPhone: json['user_phone'] ?? '+91 98450 12345',
      createdAt: json['created_at'] ?? DateTime.now().toIso8601String(),
    );
  }
}
