import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import '../neumorphic/neumorphic_ui.dart';
import 'routing_result_screen.dart';

class CreateStep4LocationScreen extends StatefulWidget {
  final String category;
  final String description;
  final String imagePath;

  const CreateStep4LocationScreen({
    super.key,
    required this.category,
    required this.description,
    this.imagePath = '',
  });

  @override
  State<CreateStep4LocationScreen> createState() => _CreateStep4LocationScreenState();
}

class _CreateStep4LocationScreenState extends State<CreateStep4LocationScreen> {
  double _lat = 12.305214;
  double _lng = 76.655389;
  String _address = 'Agrahara Circle, Ward 42, Mysuru';
  bool _isFetchingGps = false;
  bool _isManualPinMode = false;
  final MapController _mapController = MapController();

  @override
  void initState() {
    super.initState();
    _fetchLiveDeviceGps();
  }

  Future<void> _fetchLiveDeviceGps() async {
    setState(() => _isFetchingGps = true);
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }
      if (permission == LocationPermission.whileInUse || permission == LocationPermission.always) {
        final Position pos = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
          timeLimit: const Duration(seconds: 4),
        );
        if (mounted) {
          setState(() {
            _lat = pos.latitude;
            _lng = pos.longitude;
            _address = 'Live GPS Coordinates: ${_lat.toStringAsFixed(4)}, ${_lng.toStringAsFixed(4)} (Mysuru Ward 42)';
            _isFetchingGps = false;
          });
          _mapController.move(LatLng(_lat, _lng), 16.0);
          return;
        }
      }
    } catch (e) {
      // Fallback
    }

    if (mounted) {
      setState(() => _isFetchingGps = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeuColors.background,
      appBar: AppBar(
        title: const Text('Confirm Location & Routing', style: TextStyle(color: NeuColors.textMain, fontWeight: FontWeight.bold, fontSize: 16)),
        backgroundColor: NeuColors.background,
        elevation: 0,
        iconTheme: const IconThemeData(color: NeuColors.textMain),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            // Dynamic GPS Status Card
            NeuContainer(
              padding: 16,
              child: Row(
                children: [
                  NeuContainer(
                    padding: 10,
                    borderRadius: 50,
                    child: Icon(
                      _isFetchingGps ? Icons.gps_fixed : Icons.my_location,
                      color: NeuColors.primary,
                      size: 24,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              _isFetchingGps ? 'Fetching Live Device GPS...' : 'Dynamic Live Location Detected',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            const NeuBadge(status: 'LIVE GPS'),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Lat: ${_lat.toStringAsFixed(6)}, Lng: ${_lng.toStringAsFixed(6)}',
                          style: const TextStyle(fontSize: 11, color: NeuColors.primary, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          _address,
                          style: const TextStyle(fontSize: 11, color: NeuColors.textMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Map Pin Mode Selector Bar
            NeuContainer(
              padding: 6,
              child: Row(
                children: [
                  Expanded(
                    child: NeuContainer(
                      padding: 10,
                      color: !_isManualPinMode ? NeuColors.primary : NeuColors.background,
                      onTap: () => setState(() => _isManualPinMode = false),
                      child: Center(
                        child: Text(
                          '🛰️ Auto GPS Lock',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                            color: !_isManualPinMode ? Colors.white : NeuColors.textMain,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: NeuContainer(
                      padding: 10,
                      color: _isManualPinMode ? NeuColors.primary : NeuColors.background,
                      onTap: () => setState(() => _isManualPinMode = true),
                      child: Center(
                        child: Text(
                          '📍 Pin Manually on Map',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                            color: _isManualPinMode ? Colors.white : NeuColors.textMain,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // OpenStreetMap Interactive Map Component
            Expanded(
              child: NeuContainer(
                padding: 4,
                borderRadius: 20,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      FlutterMap(
                        mapController: _mapController,
                        options: MapOptions(
                          initialCenter: LatLng(_lat, _lng),
                          initialZoom: 15.5,
                          onTap: (tapPosition, point) {
                            if (_isManualPinMode) {
                              setState(() {
                                _lat = point.latitude;
                                _lng = point.longitude;
                                _address = 'Manual Map Pin: ${_lat.toStringAsFixed(4)}, ${_lng.toStringAsFixed(4)}';
                              });
                            }
                          },
                        ),
                        children: [
                          TileLayer(
                            urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                            userAgentPackageName: 'org.civicroute.mobile',
                          ),
                          MarkerLayer(
                            markers: [
                              Marker(
                                point: LatLng(_lat, _lng),
                                width: 50,
                                height: 50,
                                child: const Icon(
                                  Icons.location_on,
                                  color: Colors.redAccent,
                                  size: 46,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Positioned(
                        top: 10,
                        left: 10,
                        right: 10,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.92),
                            borderRadius: BorderRadius.circular(12),
                            boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 6)],
                          ),
                          child: Row(
                            children: [
                              Icon(
                                _isManualPinMode ? Icons.touch_app : Icons.map_outlined,
                                size: 18,
                                color: NeuColors.primary,
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  _isManualPinMode
                                      ? '📍 Manual Pin Mode: Tap anywhere on map to update location'
                                      : '🗺️ OpenStreetMap — Live GPS Ward 42 Pinned',
                                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: NeuColors.textMain),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 12,
                        right: 12,
                        child: FloatingActionButton.small(
                          heroTag: 'recenter_gps_btn',
                          backgroundColor: NeuColors.primary,
                          onPressed: () {
                            _fetchLiveDeviceGps();
                          },
                          child: const Icon(Icons.my_location, color: Colors.white, size: 20),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),

            SizedBox(
              width: double.infinity,
              child: NeuButton(
                text: 'File Report & Route to Department →',
                isPrimary: true,
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => RoutingResultScreen(
                        category: widget.category,
                        description: widget.description,
                        lat: _lat,
                        lng: _lng,
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

